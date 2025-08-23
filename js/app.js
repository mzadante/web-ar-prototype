document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-ar-button');
    const startScreen = document.getElementById('start-screen');
    const arContainer = document.getElementById('ar-container');
    const arScene = document.getElementById('ar-scene');
    const overlay = document.getElementById('ui-overlay');
    const statusMessage = document.getElementById('status-message');

    // Ocultar el contenedor de AR al principio
    arContainer.style.display = 'none';

    // Manejar el clic del botón de inicio
    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        arContainer.style.display = 'block';
        
        // El `arScene.play()` es crucial para que AR.js se inicie correctamente.
        if (arScene.is('paused')) {
            arScene.play();
        }
    });
    
    // Escuchar eventos de AR.js para mostrar/ocultar el overlay
    arScene.addEventListener('camera-init', () => {
        statusMessage.textContent = 'Cámara lista, apunte al marcador...';
    });

    arScene.addEventListener('markerFound', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none'; // Deshabilita los clics
    });
    
    arScene.addEventListener('markerLost', () => {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto'; // Habilita los clics
    });
});