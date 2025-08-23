document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-ar-button');
    const startScreen = document.getElementById('start-screen');
    const arScene = document.getElementById('ar-scene');
    const overlay = document.getElementById('ui-overlay');
    const statusMessage = document.getElementById('status-message');

    // Oculta el overlay de la interfaz de usuario al inicio
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';

    // Maneja el clic en el botón de "Iniciar"
    startButton.addEventListener('click', () => {
        // Oculta la pantalla de inicio
        startScreen.style.display = 'none';
        
        // Muestra la escena de AR.js
        arScene.style.display = 'block';

        // Muestra el overlay de la interfaz de usuario con las instrucciones
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';

        // Inicia la escena de AR.js si no estaba en ejecución
        if (arScene.is('paused')) {
            arScene.play();
        }
    });

    // Escucha el evento de inicio de la cámara de AR.js
    arScene.addEventListener('camera-init', () => {
        statusMessage.textContent = 'Cámara lista, apunte al marcador...';
    });

    // Escucha cuando se encuentra el marcador
    arScene.addEventListener('markerFound', () => {
        // Oculta el overlay de instrucciones una vez que el marcador ha sido encontrado
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    });
    
    // Escucha cuando se pierde el marcador
    arScene.addEventListener('markerLost', () => {
        // Muestra el overlay de instrucciones nuevamente
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
    });
});