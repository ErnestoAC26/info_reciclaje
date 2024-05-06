document.addEventListener("DOMContentLoaded", function() {
    const qrReader = new Html5Qrcode("qr-reader");
    const scanButton = document.getElementById("scan-btn");
    const infoDisplay = document.getElementById("info");

    // Función que se llama cuando se decodifica un código QR con éxito
    function qrCodeSuccessCallback(decodedText) {
        mostrarInformacion(decodedText);
    }

    // Función para manejar errores durante el escaneo
    function qrCodeErrorCallback(err) {
        console.error("Error durante el escaneo:", err);
        infoDisplay.textContent = "Error durante el escaneo. Por favor, verifica los permisos de la cámara.";
    }

    // Función para manejar el inicio del escaneo
    scanButton.addEventListener("click", () => {
        // Configura las opciones de la cámara
        const config = {
            fps: 10, // Cuadros por segundo para el escaneo
            qrbox: 250 // Tamaño de la caja de escaneo (ajustable)
        };

        // Intenta iniciar el escaneo con la cámara trasera ("environment")
        qrReader.start("environment", config, qrCodeSuccessCallback, qrCodeErrorCallback)
            .then(() => {
                console.log("Escaneo iniciado con éxito.");
            })
            .catch((err) => {
                // Si ocurre un error, intenta usar la cámara frontal ("user")
                console.error("Error al iniciar el escaneo:", err);
                // Intenta con la cámara frontal
                qrReader.start("user", config, qrCodeSuccessCallback, qrCodeErrorCallback)
                    .then(() => {
                        console.log("Escaneo iniciado con éxito.");
                    })
                    .catch((err) => {
                        console.error("Error al iniciar el escaneo con la cámara frontal:", err);
                        infoDisplay.textContent = "No se pudo iniciar el escaneo. Verifica los permisos de la cámara.";
                    });
            });
    });

    // Función para mostrar información según el código QR decodificado
    function mostrarInformacion(decodedText) {
        if (decodedText === "rojo") {
            infoDisplay.textContent = "Desechar residuos peligrosos.";
        } else if (decodedText === "blanco") {
            infoDisplay.textContent = "Desechar plásticos.";
        } else {
            infoDisplay.textContent = "Código QR no reconocido.";
        }
    }
});
