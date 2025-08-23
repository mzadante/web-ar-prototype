document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-ar-button');
    const startScreen = document.getElementById('start-screen');
    const arScene = document.getElementById('ar-scene');
    const overlay = document.getElementById('ui-overlay');
    const statusMessage = document.getElementById('status-message');

    // Referencias a los marcadores y entidades
    const videoMarker = document.getElementById('video-marker');
    const modelMarker = document.getElementById('model-marker');
    const videoEntity = document.getElementById('video-entidad');
    const modelEntity = document.getElementById('modelo-entidad');

    // Oculta las entidades al inicio
    videoEntity.setAttribute('visible', 'false');
    modelEntity.setAttribute('visible', 'false');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';

    // Maneja el clic en el botón de "Iniciar"
    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        arScene.style.display = 'block';
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';

        if (arScene.is('paused')) {
            arScene.play();
        }
    });

    // Escucha el evento de inicio de la cámara de AR.js
    arScene.addEventListener('camera-init', () => {
        statusMessage.textContent = 'Cámara lista, apunte a un marcador...';
    });

    // Lógica para el marcador del VIDEO
    videoMarker.addEventListener('markerFound', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        videoEntity.setAttribute('visible', 'true');
        modelEntity.setAttribute('visible', 'false');
        // Aseguramos que el video se reproduzca
        const video = document.querySelector('#video-comida');
        video.play();
    });
    
    videoMarker.addEventListener('markerLost', () => {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        videoEntity.setAttribute('visible', 'false');
        // Pausamos el video para que no siga sonando
        const video = document.querySelector('#video-comida');
        video.pause();
    });

    // Lógica para el marcador del MODELO 3D
    modelMarker.addEventListener('markerFound', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        videoEntity.setAttribute('visible', 'false');
        modelEntity.setAttribute('visible', 'true');
    });

    modelMarker.addEventListener('markerLost', () => {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        modelEntity.setAttribute('visible', 'false');
    });
});