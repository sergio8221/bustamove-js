//Other functions
Math.radians = function (degrees) { //Convert degrees to radians
    return degrees * Math.PI / 180;
};

function generateColor() {
    //colors = [red, green, blue, yellow]
    let colors = ["#f00", "#0f0", "#00f", "#ff0"];
    return colors[Math.floor(Math.random() * 3)];
}

function getDistance(x1, x2, y1, y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}