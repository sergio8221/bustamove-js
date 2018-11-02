//Ball
function Ball(id) {
    this.id = 'ball' + id;
    this.element;
    this.color = generateColor();
    this.x = 0; // From left
    this.y = 1; //From bottom
    this.yStack = 0; //Stacked vertical position (from top)
    this.speed = 0.1; // Ball's Speed
    this.direction = 0; //Ball's direction in degrees
    this.moveNext = false; //Move on next frame?
    this.stacked = false; //Is ball placed on the grid?
    this.row = 0; //row and col of stacked balls
    this.col = 0;

    this.add = function (id) { //Add ball to html
        scene.element.insertAdjacentHTML("beforeend", `
        <div id="${this.id}" class="ball"></div>
      `);
        this.element = document.getElementById(this.id);
        this.element.style.backgroundColor = this.color;
    };

    this.placeBall = function () {
        //Calculamos la celda en la que encajará la bola
        //Calculamos la fila
        this.row = Math.round((scene.height - this.y - ballSize) / 5);
        this.yStack = (this.row * 5);
        this.y = scene.height - this.yStack;
        if (this.row % 2 === 0) {
            this.col = Math.round(this.x / 6)-1;
            this.x = (this.col * 6) + 3;
            this.stacked = true;
            scene.stackedBalls[this.row][this.col] = this;
        } else {
            this.col = Math.round(this.x / 6)-1;
            this.x = (this.col * 6)+6;
            this.stacked = true;
            scene.stackedBalls[this.row][this.col] = this;
        }
        console.log(`Row: ${this.row} Col: ${this.col}`);
        //Remove ball from balls array
        scene.balls.splice(scene.balls.findIndex(ball => ball.id === this.id), 1);
        //draw
        this.drawStacked();
    };

    this.checkCollisions = function () {
        let collide = false;
        scene.stackedBalls.forEach((row) => {
            row.forEach(ball => {
                let dist = Math.sqrt(Math.pow(Math.abs(this.x - ball.x), 2) + Math.pow(Math.abs(this.y - ball.y), 2));
                console.log(ball.id + " : " + dist);
                (dist <= 10)? collide=true : collide=false
            });
        });
        return collide;
    };

    this.update = function () {
        if (this.moveNext) {
            //update position
            this.x += Math.sin(Math.radians(this.direction)) * this.speed * delta;
            this.y += Math.cos(Math.radians(this.direction)) * this.speed * delta;

            //bounce on sides
            if (this.x >= scene.width - 3 || this.x <= 3) {
                this.direction = -this.direction;
            }
            if (this.x > scene.width - 3) {//if touches right side
                this.x = scene.width - 3
            }
            if (this.x < 3) { //if touches left side
                this.x = 3
            }

            //if touches top side
            if (this.y >= scene.height - 6) {
                this.y = scene.height - 6;
                this.moveNext = false;
                this.placeBall();
            } else if (this.checkCollisions()) { //Check collisions
                this.placeBall();
                console.log("Colisión!");
            }
        }
    };

    this.draw = function () {
        this.element.style.left = this.x + 'vh';
        this.element.style.bottom = this.y + 'vh';
    };

    this.drawStacked = function () {
        this.element.style.left = this.x + 'vh';
        this.element.style.bottom = 'auto';
        this.element.style.top = this.yStack + 'vh';
    };
}