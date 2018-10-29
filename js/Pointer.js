//Pointer
function Pointer() {
    this.element = document.getElementById('pointer');
    this.element2 = document.getElementById('pointer2');
    this.angle = 0; // Ángulo de la flecha
    this.angle2 = 0; // Ángulo de la flecha
    this.length = 95; // Pointer length
    this.length2 = 50; // Pointer length
    this.y = 0; // Y coordinate of line collision
    this.rebX = 0; //Rebound position
    this.rebY = 0;
    this.showReb = false; //Show rebound line?
    this.moveDirection = 0; // Dirección de rotación -> 0:left, 1:right
    this.moveSpeed = arrowSpeed; // Velocidad de rotación
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