//Constants
const maxAngle = 60; //max angle of shooting arrow
const rows = 16; //Max rows of stacked balls
const cols = 11; //Max cols of stacked balls

//Variables
let delta = 0; //Time since last frame
let lastFrameTimeMs = 0; // Last frame time since whenever
let ballID = 0;

// Start things off
let scene = new Scene();
scene.init();
requestAnimationFrame(mainLoop);

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            scene.arrow.moveDirection = 0;
            scene.arrow.moveNext = true;
            scene.pointer.moveDirection = 0;
            scene.pointer.moveNext = true;
            break;
        case "ArrowRight":
            scene.arrow.moveDirection = 1;
            scene.arrow.moveNext = true;
            scene.pointer.moveDirection = 1;
            scene.pointer.moveNext = true;
            break;
        case "ArrowUp":
            scene.shootBall(scene.arrow.angle);
            break;
    }
});

window.addEventListener('keyup', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            scene.arrow.moveNext = false;
            scene.pointer.moveNext = false;
            break;
        case "ArrowRight":
            scene.arrow.moveNext = false;
            scene.pointer.moveNext = false;
            break;
    }
});

//Main Loop
function draw() {
    scene.balls.forEach((ball) => {
        ball.draw();
    });
    scene.nextBalls.forEach((ball) => {
        ball.draw();
    });
    scene.arrow.draw();
    scene.pointer.draw();
}

function update(delta) {
    scene.balls.forEach((ball) => {
        ball.update();
    });
    scene.arrow.update();
    scene.pointer.update();
}

function mainLoop(timestamp) { //timestamp se lo pasa requestAnimationFrame
    delta = timestamp - lastFrameTimeMs; // get the delta time since last frame
    lastFrameTimeMs = timestamp;

    update(delta);
    draw();
    requestAnimationFrame(mainLoop);
}