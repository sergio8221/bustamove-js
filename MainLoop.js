var box = document.getElementById('box'), // the box
    boxX = 50, // the box's position
    boxY = 50,
    boxVelocity = 0.5, // the box's velocity
    delta = 0,
    lastFrameTimeMs = 0,
    direction = 0, //dirección en la que moverse en el siguiente frame
    move = false, //moverse en el siguiente frame
    limit = 1000; // how far the box can go before it switches direction

//Flecha
var flecha = document.getElementById('arrow');
var rotFlecha = 0;
var dirFlecha = 0;
var velFlecha = 0.5;
var rotaFlecha = false;

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
    }
})

function draw() {
    box.style.left = boxX + 'px';
    box.style.top = boxY + 'px';
    arrow.style.transform = "rotateZ(" + rotFlecha + "deg)";
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

// Start things off
requestAnimationFrame(mainLoop);