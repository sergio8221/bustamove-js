var delta = 0; //Time since last frame
var lastFrameTimeMs = 0; // Last frame time since whenever

var shootBall = false; //Shoot ball on next frame?

//Flecha
var arrow = {
    element: document.getElementById('arrow'),
    angle: 0, // Ángulo de la flecha
    moveDirection: 0, // Dirección de rotación -> 0:left, 1:right
    moveSpeed: 0.5, // Velocidad de rotación
    moveNext: false, // Rotar en el siguiente frame
    update: function () {
        if (this.moveNext) {
            switch (this.moveDirection) {
                case 0:
                    this.angle -= this.moveSpeed * delta;
                    break;
                case 1:
                    this.angle += this.moveSpeed * delta;
                    break;
            }
        }

        if (this.angle >= 45) {
            this.angle = 45;
        } else if (this.angle <= -45) {
            this.angle = -45;
        }

        this.moveNext = false;
    },
    draw: function () {
        this.element.style.transform = "translateX(-50%) rotateZ(" + arrow.angle + "deg)";
    }
};


//Bola
var ball = {
    element: document.getElementById('ball'),
    x: 50, // Ball's position
    y: 50,
    speed: 0.5, // Ball's Speed
    direction: 0, //Ball's direction
    moveNext: false, //Move on next frame?
    update: function () {

    },
    draw: function () {
        this.element.style.left = ball.x + 'px';
        this.element.style.top = ball.y + 'px';
    }
};


window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            arrow.moveDirection = 0;
            arrow.moveNext = true;
            break;
        case "ArrowRight":
            arrow.moveDirection = 1;
            arrow.moveNext = true;
            break;
        case "Space":
            shootBall = true;
            break;
    }
});

// Start things off
requestAnimationFrame(mainLoop);

function draw() {
    ball.draw();
    arrow.draw();
}

function update(delta) {
    arrow.update();
}

function mainLoop(timestamp) { //timestamp se lo pasa requestAnimationFrame
    delta = timestamp - lastFrameTimeMs; // get the delta time since last frame
    lastFrameTimeMs = timestamp;

    update(delta);
    draw();
    requestAnimationFrame(mainLoop);
}
