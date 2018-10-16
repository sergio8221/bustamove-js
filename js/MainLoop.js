let delta = 0; //Time since last frame
let lastFrameTimeMs = 0; // Last frame time since whenever
let ballID = 0;
let maxAngle = 60; //max angle of shooting arrow

//Scene
function Scene() {
    this.width = 66; //scene size in vh
    this.height = 95;
    this.element = document.getElementById("scene");
    this.arrow = new Arrow();
    this.pointer = new Pointer();
    this.balls = []; //Lauched balls
    this.nextBalls = []; //Prepared balls
    this.prepareBall = function () {
        ballID++;
        //Add ball to array and html
        let newBall = new Ball(ballID);
        newBall.x = scene.width / 2 + (this.nextBalls.length * 6);
        newBall.add();
        this.nextBalls.push(newBall);
    };
    this.shootBall = function (direction) {
        //Move from nextBalls to balls
        let shotBall = this.nextBalls.shift();
        shotBall.direction = direction;
        console.log(direction);
        shotBall.moveNext = true;
        this.balls.push(shotBall);

        //Add new ball to nextBalls
        this.prepareBall();
        this.reposition();
    };
    this.init = function () {
        this.element.style.width = this.width + "vh";
        this.element.style.height = this.height + "vh";
        for (let i = 0; i < 5; i++) {
            this.prepareBall()
        }
    };
    this.reposition = function () {
        this.nextBalls.forEach((ball, i) => {
            ball.x = scene.width / 2 + (i * 6);
        })
    }
}

//Arrow
function Arrow() {
    this.element = document.getElementById('arrow');
    this.angle = 0; // Ángulo de la flecha
    this.moveDirection = 0; // Dirección de rotación -> 0:left, 1:right
    this.moveSpeed = 0.1; // Velocidad de rotación
    this.moveNext = false; // Rotar en el siguiente frame
    this.update = function () {
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

        if (this.angle >= maxAngle) {
            this.angle = maxAngle;
        } else if (this.angle <= -maxAngle) {
            this.angle = -maxAngle;
        }
    };
    this.draw = function () {
        this.element.style.transform = "translateX(-50%) rotateZ(" + this.angle + "deg)";
    };
}

//Pointer
function Pointer() {
    this.element = document.getElementById('pointer');
    this.element2 = document.getElementById('pointer2');
    this.angle = 0; // Ángulo de la flecha
    this.angle2 = 0; // Ángulo de la flecha
    this.length = 95; // Pointer length
    this.length2 = 50; // Pointer length
    this.y; // Y coordinate of line collision
    this.rebX = 0; //Rebound position
    this.rebY = 0;
    this.showReb = false; //Show rebound line?
    this.moveDirection = 0; // Dirección de rotación -> 0:left, 1:right
    this.moveSpeed = 0.1; // Velocidad de rotación
    this.moveNext = false; // Rotar en el siguiente frame
    this.update = function () {
        if (this.moveNext) {
            switch (this.moveDirection) {
                case 0:
                    this.angle -= this.moveSpeed * delta;
                    break;
                case 1:
                    this.angle += this.moveSpeed * delta;
                    break;
            }
            if (this.angle > 18 || this.angle < -18) {
                this.updateLength();
                this.updateRebound();
                this.showReb = true;
            }else{
                this.showReb = false;
            }
        }

        if (this.angle >= maxAngle) {
            this.angle = maxAngle;
        } else if (this.angle <= -maxAngle) {
            this.angle = -maxAngle;
        }
    };
    this.updateLength = function () {
        //tangent is the ratio between opposite and adjacent sides of triangle
        let ang = 90 - this.angle;
        let ratio = Math.tan(Math.radians(ang));
        this.y = scene.width / 2 * ratio;
        this.length = Math.sqrt(Math.pow(scene.width / 2, 2) + Math.pow(this.y, 2));
    };
    this.updateRebound = function () {
        this.angle2 = -this.angle;
        if(this.angle2<0){
            this.rebX = scene.width;
            this.rebY = this.y+3;
        }else{
            this.rebX = 0;
            this.rebY = -this.y+3;
        }

    };
    this.draw = function () {
        this.element.style.transform = "translateX(-50%) rotateZ(" + this.angle + "deg)";
        this.element.style.height = this.length + "vh";
        this.drawRebound();
    };
    this.drawRebound = function () {
        if (this.showReb) {
            this.element2.style.display = "block";
            this.element2.style.transform = "rotateZ(" + this.angle2 + "deg)";
            this.element2.style.height = this.length2 + "vh";
            this.element2.style.left = this.rebX + "vh";
            this.element2.style.bottom = this.rebY + "vh";
        }else{
            this.element2.style.display = "none";
        }
    };
}

//Ball
function Ball(id) {
    this.id = 'ball' + id;
    this.element;
    this.color = generateColor();
    this.x; // From left
    this.y = 1; //From bottom
    this.speed = 0.1; // Ball's Speed
    this.direction = 0; //Ball's direction in degrees
    this.moveNext = false; //Move on next frame?
    this.add = function (id) { //Add ball to html
        scene.element.insertAdjacentHTML("beforeend", `
        <div id="${this.id}" class="ball"></div>
      `);
        this.element = document.getElementById(this.id);
        this.element.style.backgroundColor = this.color;
    };
    this.update = function () {
        if (this.moveNext) {
            this.x += Math.sin(Math.radians(this.direction)) * this.speed * delta;
            this.y += Math.cos(Math.radians(this.direction)) * this.speed * delta;
            if (this.x >= scene.width - 3 || this.x <= 3) { //bounce on sides
                this.direction = -this.direction;
            }
            if (this.x > scene.width - 3) {//if touches right side
                this.x = scene.width - 3
            }
            if (this.x < 3) { //if touches left side
                this.x = 3
            }
            if (this.y >= scene.height - 6) { //if touches top side
                this.y = scene.height - 6;
                this.moveNext = false;
            }
        }
    };
    this.draw = function () {
        this.element.style.left = this.x + 'vh';
        this.element.style.bottom = this.y + 'vh';
    };
}

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

//Other functions
Math.radians = function (degrees) { //Convert degrees to radians
    return degrees * Math.PI / 180;
};

function generateColor() {
    //colors = [red, green, blue, yellow]
    let colors = ["#f00", "#0f0", "#00f", "#ff0"];
    return colors[Math.floor(Math.random() * 3)];
}
