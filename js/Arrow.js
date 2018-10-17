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