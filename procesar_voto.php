<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $candidato = $_POST['candidato'] ?? '';
    
    if ($candidato) {
        // Guardar voto en un archivo
        $archivo = 'registros_votos.txt';
        $registro = date("d/m/Y H:i:s") . " - Voto por: $candidato\n";
        file_put_contents($archivo, $registro, FILE_APPEND);

        // Generar comprobante con opción de descarga
        $comprobante = "comprobante_" . time() . ".txt";
        $contenidoComprobante = "Comprobante de Votación\n\n" .
                                "Has votado por: $candidato\n" .
                                "Fecha: " . date("d/m/Y H:i:s") . "\n";
        file_put_contents("comprobantes/$comprobante", $contenidoComprobante);

        echo "<html>
        <head>
            <title>Comprobante de Votación</title>
            <style>
                body { font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; text-align: center; padding: 20px; }
                .container { max-width: 600px; margin: auto; background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2); }
                .comprobante { padding: 20px; border: 2px solid white; border-radius: 5px; margin-top: 20px; }
                .download-button { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #ffcc00; color: black; font-weight: bold; border: none; cursor: pointer; border-radius: 5px; text-decoration: none; transition: 0.3s; }
                .download-button:hover { background: #e6b800; }
                .timer { font-weight: bold; color: #ffcc00; }
            </style>
            <script>
                setTimeout(function() {
                    document.getElementById('downloadButton').style.display = 'none';
                    document.getElementById('message').innerText = 'El tiempo para descargar ha expirado.';
                }, 300000); // 5 minutos
            </script>
        </head>
        <body>
            <div class='container'>
                <h1>Tribunal Supremo Electoral de Auradon</h1>
                <h2>Comprobante de Votación</h2>
                <div class='comprobante'>
                    <p>Has votado por: <strong>$candidato</strong></p>
                    <p>Fecha: " . date("d/m/Y H:i:s") . "</p>
                    <p class='timer'>Tienes 5 minutos para descargar tu comprobante.</p>
                    <a id='downloadButton' class='download-button' href='comprobantes/$comprobante' download>Descargar Comprobante</a>
                    <p id='message'></p>
                </div>
            </div>
        </body>
        </html>";
    } else {
        echo "<p>No se ha seleccionado un candidato. Regresa y vota nuevamente.</p>";
    }
} else {
    echo "<p>Acceso no autorizado.</p>";
}
?>
