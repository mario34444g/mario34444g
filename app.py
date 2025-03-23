from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
import telegram
import asyncio
import translators as ts  # Para traducción de texto
from telegram.request import HTTPXRequest  # Para manejo avanzado de conexiones

app = Flask(__name__)
CORS(app)

# Configuración de API y tokens
API_KEY_OMDB = "4d43d122"  # API Key de OMDB
BOT_TOKEN = "7600046039:AAGIWIlILfBdKl0qt4gLE8UTN0L_qGJIbB4"  # Token del bot de Telegram
GROUP_ID = "-10014699218205"  # ID del grupo de Telegram

# Configuración avanzada del pool de conexiones
request_config = HTTPXRequest(
    connection_pool_size=20,  # Aumentar el tamaño del pool
    read_timeout=30,  # Timeout para lectura
    write_timeout=30,  # Timeout para escritura
    connect_timeout=30  # Timeout para conexión
)

# Inicializar el bot con la configuración personalizada
bot = telegram.Bot(token=BOT_TOKEN, request=request_config)

async def obtener_enlace_telegram(titulo):
    """
    Busca en los mensajes del grupo un video que coincida con el título.
    Devuelve el enlace directo al mensaje en Telegram.
    """
    try:
        # Obtener los últimos updates (mensajes) del grupo
        updates = await bot.get_updates(limit=100, timeout=10)  # Limitar a 100 mensajes
        
        for update in reversed(updates):  # Buscar desde el mensaje más reciente
            message = update.message
            if message and (message.video or message.document):  # Verificar si es un video o documento
                caption = message.caption or ""  # Obtener el caption del mensaje
                if titulo.lower() in caption.lower():  # Buscar el título en el caption
                    # Generar el enlace al mensaje
                    chat_id_clean = str(abs(int(GROUP_ID)))  # Limpiar el ID del grupo
                    return f"https://t.me/c/{chat_id_clean}/{message.message_id}"
        return None  # Si no se encuentra el mensaje
    except Exception as e:
        print(f"Error al buscar en Telegram: {e}")
        return None

def traducir_sinopsis(texto):
    """
    Traduce la sinopsis al español usando la librería translators.
    Si falla, devuelve el texto original.
    """
    try:
        return ts.translate(texto, to_language='es')  # Traducir al español
    except Exception as e:
        print(f"Error en traducción: {e}")
        return texto  # Devolver el texto original si falla

@app.route("/buscar", methods=["GET"])
def buscar_pelicula():
    """
    Busca una película por título y devuelve sus detalles, incluyendo
    el enlace al video en Telegram.
    """
    titulo = request.args.get("titulo", "").strip().lower()  # Obtener el título de la solicitud
    
    if not titulo:
        return jsonify({"error": "Título requerido"}), 400  # Validar que el título no esté vacío

    # Buscar la película en OMDB
    omdb_response = requests.get(
        f"http://www.omdbapi.com/?t={titulo}&apikey={API_KEY_OMDB}"
    ).json()

    if omdb_response.get("Response") == "False":
        return jsonify({"error": "Película no encontrada"}), 404  # Si no se encuentra la película

    # Traducir la sinopsis
    sinopsis_original = omdb_response.get("Plot", "")
    sinopsis_traducida = traducir_sinopsis(sinopsis_original) if sinopsis_original else "Sin sinopsis"

    # Obtener el enlace al video en Telegram
    enlace_telegram = asyncio.run(obtener_enlace_telegram(titulo))

    # Construir la respuesta JSON
    return jsonify({
        "titulo": omdb_response.get("Title", "Sin título"),
        "año": omdb_response.get("Year", "N/A"),
        "calificacion_imdb": omdb_response.get("imdbRating", "N/A"),
        "genero": omdb_response.get("Genre", "N/A"),
        "duracion": omdb_response.get("Runtime", "N/A"),
        "director": omdb_response.get("Director", "N/A"),
        "actores": omdb_response.get("Actors", "N/A"),
        "portada": omdb_response.get("Poster", ""),
        "sinopsis": sinopsis_traducida,
        "enlace": enlace_telegram if enlace_telegram else "No disponible"
    })

if __name__ == "__main__":
    app.run(debug=True)  # Ejecutar la aplicación en modo debug
