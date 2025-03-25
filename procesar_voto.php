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
                body { font-family: Arial, sans-serif; text-align: center; }
                .comprobante { border: 1px solid black; padding: 20px; display: inline-block; margin-top: 50px; }
                .download-button { margin-top: 20px; padding: 10px; background: green; color: white; border: none; cursor: pointer; }
                .timer { font-weight: bold; color: red; }
            </style>
            <script>
                setTimeout(function() {
                    document.getElementById('downloadButton').style.display = 'none';
                    document.getElementById('message').innerText = 'El tiempo para descargar ha expirado.';
                }, 300000); // 5 minutos
            </script>
        </head>
        <body>
            <div class='comprobante'>
                <h2>Comprobante de Votación</h2>
                <p>Has votado por: <strong>$candidato</strong></p>
                <p>Fecha: " . date("d/m/Y H:i:s") . "</p>
                <p class='timer'>Tienes 5 minutos para descargar tu comprobante.</p>
                <a id='downloadButton' class='download-button' href='comprobantes/$comprobante' download>Descargar Comprobante</a>
                <p id='message'></p>
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
