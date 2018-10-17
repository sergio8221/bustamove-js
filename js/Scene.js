//Scene
function Scene() {
    this.width = 66; //scene size in vh
    this.height = 95;
    this.element = document.getElementById("scene");
    this.arrow = new Arrow();
    this.pointer = new Pointer();
    this.balls = []; //Launched balls
    this.nextBalls = []; //Prepared balls
    this.stackedBalls = []; //Stacked balls [row][col]

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
        //Set scene dimensions
        this.element.style.width = this.width + "vh";
        this.element.style.height = this.height + "vh";
        //Set prepared balls array
        for (let i = 0; i < 5; i++) {
            this.prepareBall()
        }
        //Set stacked balls array
        for(let i=0; i<rows; i++){
            this.stackedBalls.push(new Array(cols));
        }
    };

    this.reposition = function () {
        this.nextBalls.forEach((ball, i) => {
            ball.x = scene.width / 2 + (i * 6);
        })
    }
}