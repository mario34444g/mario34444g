async function buscarPelicula() {
    const input = document.getElementById("buscador").value.trim();
    if (!input) {
        alert("Escribe el título de una película");
        return;
    }

    try {
        const respuesta = await fetch(`http://127.0.0.1:5000/buscar?titulo=${encodeURIComponent(input)}`);
        const datos = await respuesta.json();

        if (datos.error) {
            alert("Película no encontrada");
            return;
        }

        mostrarPelicula(datos);
    } catch (error) {
        console.error("Error al buscar película:", error);
    }
}

function mostrarPelicula(datos) {
    const contenedor = document.getElementById("contenedor-peliculas");
    contenedor.innerHTML = ""; // Limpiar resultados previos

    const div = document.createElement("div");
    div.classList.add("pelicula");

    const img = document.createElement("img");
    img.src = datos.portada;
    img.alt = datos.titulo;
    img.style.cursor = "pointer";
    img.addEventListener("click", () => verPelicula(datos.titulo));

    const titulo = document.createElement("h3");
    titulo.textContent = `${datos.titulo} (${datos.año})`;

    div.appendChild(img);
    div.appendChild(titulo);
    contenedor.appendChild(div);
}

function verPelicula(titulo) {
    window.location.href = `pelicula.html?titulo=${encodeURIComponent(titulo)}`;
}

// Búsqueda de ejemplo automática al cargar la página
buscarPelicula("Inception");
