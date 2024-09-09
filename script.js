// Este es un ejemplo de cómo podrías estructurar tus datos de películas
const peliculas = [
    { titulo: "Película 1", imagen: "ruta/a/imagen1.jpg" },
    { titulo: "Película 2", imagen: "ruta/a/imagen2.jpg" },
    { titulo: "Película 3", imagen: "ruta/a/imagen3.jpg" },
    // Añade más películas aquí
];

function cargarPeliculas() {
    const seccionPeliculas = document.getElementById('peliculas');
    
    peliculas.forEach(pelicula => {
        const peliculaElement = document.createElement('div');
        peliculaElement.className = 'pelicula';
        
        peliculaElement.innerHTML = `
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
            <h2>${pelicula.titulo}</h2>
        `;
        
        seccionPeliculas.appendChild(peliculaElement);
    });
}

document.addEventListener('DOMContentLoaded', cargarPeliculas);