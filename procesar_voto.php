<?php
// Verificar que sea una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el candidato seleccionado
    $candidato = $_POST['candidato'] ?? '';
    
    if ($candidato) {
        // Guardar voto en un archivo de texto
        $archivo = 'registros_votos.txt';
        $registro = date("d/m/Y H:i:s") . " - Voto por: $candidato\n";
        file_put_contents($archivo, $registro, FILE_APPEND);

        // Generar comprobante
        ?>
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Comprobante de Votación</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    background-color: #f0f0f0; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100vh; 
                    margin: 0; 
                }
                .comprobante { 
                    background-color: white; 
                    border: 2px solid #007bff; 
                    padding: 30px; 
                    border-radius: 10px; 
                    text-align: center; 
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
                }
            </style>
        </head>
        <body>
            <div class="comprobante">
                <h2>Comprobante de Votación</h2>
                <p>Has votado por: <strong><?php echo $candidato; ?></strong></p>
                <p>Fecha: <?php echo date("d/m/Y H:i:s"); ?></p>
            </div>
        </body>
        </html>
        <?php
    } else {
        echo "No se seleccionó un candidato.";
    }
} else {
    echo "Acceso no autorizado.";
}
?>