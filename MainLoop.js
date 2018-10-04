
var delta = 0; //Time since last frame
var lastFrameTimeMs = 0; // Last frame time since whenever

var shootBall = false; //Shoot ball on next frame?

//Flecha
var flecha = document.getElementById('arrow');
var rotFlecha = 0; // Ángulo de la flecha
var dirFlecha = 0; // Dirección de rotación
var velFlecha = 0.5; // Velocidad de rotación
var rotaFlecha = false; // Rotar en el siguiente frame

//Bola
var ball = document.getElementById('ball');
var ballX = 50; // Ball's position
var ballY = 50;
var ballSpeed = 0.5; // Ball's Speed
var ballDirection = 0; //Ball's direction
var moveBall = false; //Move on next frame?

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            dirFlecha = 0;
            rotaFlecha = true;
            break;
        case "ArrowRight":
            dirFlecha = 1;
            rotaFlecha = true;
            break;
        case "Space":
            shootBall = true;
            break;

    }
})

// Start things off
requestAnimationFrame(mainLoop);

function draw() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    arrow.style.transform = "translateX(-50%) rotateZ(" + rotFlecha + "deg)";
}

function update(delta) {
    if (rotaFlecha) {
        switch (dirFlecha) {
            case 0:
                rotFlecha -= velFlecha * delta;
                break;
            case 1:
                rotFlecha += velFlecha * delta;
                break;
        }
    }

    if (rotFlecha >= 45) {
        rotFlecha = 45;
    } else if (rotFlecha <= -45) {
        rotFlecha = -45;
    }

    rotaFlecha = false;
}

function mainLoop(timestamp) { //timestamp se lo pasa requestAnimationFrame
    delta = timestamp - lastFrameTimeMs; // get the delta time since last frame
    lastFrameTimeMs = timestamp;

    update(delta);
    draw();
    requestAnimationFrame(mainLoop);
}
