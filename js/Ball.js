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