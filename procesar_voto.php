<?php
// Improved procesar_voto.php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Ensure proper method handling
header('Content-Type: text/html; charset=utf-8');

// Check request method explicitly
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    die("Método de solicitud no permitido.");
}

// Enhanced input validation and sanitization
$candidato = filter_input(INPUT_POST, 'candidato', FILTER_SANITIZE_STRING);

if (empty($candidato)) {
    http_response_code(400); // Bad Request
    die("No se ha seleccionado un candidato válido.");
}

try {
    // Ensure comprobantes directory exists
    $comprobantesDir = __DIR__ . '/comprobantes';
    if (!file_exists($comprobantesDir)) {
        mkdir($comprobantesDir, 0755, true);
    }

    // Secure file paths
    $archivoVotos = __DIR__ . '/registros_votos.txt';
    
    // Logging vote with additional security
    $registro = date("d/m/Y H:i:s") . " - Voto por: " . htmlspecialchars($candidato, ENT_QUOTES, 'UTF-8') . "\n";
    file_put_contents($archivoVotos, $registro, FILE_APPEND | LOCK_EX);

    // Generate unique, secure filename for receipt
    $comprobante = $comprobantesDir . '/comprobante_' . uniqid() . '.txt';
    
    // Create receipt content
    $contenidoComprobante = "Comprobante de Votación\n\n" .
                            "Has votado por: " . htmlspecialchars($candidato, ENT_QUOTES, 'UTF-8') . "\n" .
                            "Fecha: " . date("d/m/Y H:i:s") . "\n" .
                            "Código de verificación: " . bin2hex(random_bytes(8)) . "\n";
    
    // Write receipt with exclusive file lock
    file_put_contents($comprobante, $contenidoComprobante, LOCK_EX);

    // Generate HTML response
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Comprobante de Votación</title>
        <style>
            body { 
                font-family: 'Arial', sans-serif; 
                background: linear-gradient(135deg, #1e3c72, #2a5298); 
                color: white; 
                text-align: center; 
                padding: 20px; 
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .container { 
                max-width: 500px; 
                background: rgba(0, 0, 0, 0.7); 
                padding: 30px; 
                border-radius: 15px; 
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            .comprobante { 
                border: 2px solid #ffcc00; 
                border-radius: 10px; 
                padding: 20px; 
                margin-top: 20px;
            }
            .download-button { 
                display: inline-block; 
                margin-top: 20px; 
                padding: 12px 25px; 
                background: #ffcc00; 
                color: black; 
                font-weight: bold; 
                border: none; 
                cursor: pointer; 
                border-radius: 8px; 
                text-decoration: none; 
                transition: all 0.3s ease;
            }
            .download-button:hover { 
                background: #e6b800; 
                transform: scale(1.05);
            }
            .timer { 
                color: #ffcc00; 
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Tribunal Supremo Electoral de Auradon</h1>
            <h2>Comprobante de Votación</h2>
            <div class="comprobante">
                <p>Has votado por: <strong><?= htmlspecialchars($candidato) ?></strong></p>
                <p>Fecha: <?= date("d/m/Y H:i:s") ?></p>
                <p class="timer">Tienes 5 minutos para descargar tu comprobante</p>
                <a href="comprobantes/<?= basename($comprobante) ?>" download class="download-button">
                    Descargar Comprobante
                </a>
            </div>
        </div>
        <script>
            // Auto-hide download button after 5 minutes
            setTimeout(() => {
                document.querySelector('.download-button').style.display = 'none';
                document.querySelector('.timer').textContent = 'Tiempo de descarga expirado';
            }, 300000);
        </script>
    </body>
    </html>
    <?php

} catch (Exception $e) {
    // Log error and show generic error message
    error_log($e->getMessage());
    http_response_code(500);
    echo "Ha ocurrido un error al procesar su voto. Intente nuevamente.";
}
?>