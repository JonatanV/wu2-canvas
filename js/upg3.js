const WIDTH = 800; // canvas elementets bredd
const HEIGHT = 600; // canvas elementets höjd

let canvas = document.createElement('canvas'); // skapa canvaselementet
let ctx = canvas.getContext('2d'); // spara canvaselementets context, vi behöver det för att kunna rita
canvas.setAttribute("class", "border"); // ge canvas klassen border så vi markerar ut det
canvas.width  = WIDTH; // sätt elementets bredd
canvas.height = HEIGHT; // ... & höjd

// Vi skapar en Box som vi kan kalla på för att skapa nya boxar.
const Box = function(x, y) {
    let box = {};
    box.x = x;
    box.y = y;
    box.speed = 2;
    box.width = 40;
    box.height = 40;
    box.color = getRandomColor();
    box.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    return box; // vi returnerar box objektet
}
const Circle = function(x, y, radius) {
    let circle = {};
    circle.x = x;
    circle.y = y;
    circle.radius = radius;
    circle.speed = 4;
    circle.color = getRandomColor();
    circle.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    return circle;
}

let box = Box(WIDTH / 2, HEIGHT / 2); // skapa en ny Box och spara den i variabeln box
let circle = Circle(200, 175, 50);

// spelets huvudloop som kallas på genom requestAnimationFrame
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let canvasLoop = window.requestAnimationFrame(step);
// animering
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations

var keys = [];

let start, timestamp;
function step(timestamp) {
    // timestamp för hur länge animationen kört
    if (!start) start = timestamp;
    let progress = timestamp - start;

    ctx.clearRect(0, 0, WIDTH, HEIGHT); // rensar hela canvas, så att vi kan rita om det, prova att kommentera ut

    if(move.right) {
        box.x = box.x + box.speed;
    }
    if(move.left) {
        box.x = box.x - box.speed;
    }
    if(move.up) {
        box.y = box.y - box.speed;
    }
    if(move.down) {
        box.y = box.y + box.speed;
    }

    if (keys[32]){
        box.color = getRandomColor();
        console.log("color changed")
    }
    if(move.right) {
        circle.x = circle.x + circle.speed;
    }
    if(move.left) {
        circle.x = circle.x - circle.speed;
    }
    if(move.up) {
        circle.y = circle.y - circle.speed;
    }
    if(move.down) {
        circle.y = circle.y + circle.speed;
    }

    if (keys[32]){
        circle.color = getRandomColor();
        console.log("color changed")
    }

    if (circle.x > WIDTH - circle.radius){
        circle.x = WIDTH - circle.radius;
    } else if (circle.x < 0 + circle.radius) {
        circle.x = 0 + circle.radius;
    }

    if (circle.y > HEIGHT - circle.radius){
        circle.y = HEIGHT - circle.radius;
    } else if (circle.y < 0 + circle.radius) {
        circle.y = 0 + circle.radius;
    }

    if (box.x > WIDTH - box.width) {
        box.x = WIDTH - box.width;
    }else if (box.x < 0) {
        box.x = 0;
    }

    if (box.y > HEIGHT - box.height) {
        box.y = HEIGHT - box.height;
    }else if (box.y < 0) {
        box.y = 0;
    }

    box.draw(); // kalla på boxens rit funktion
    circle.draw();

    // callback på sig själv genom requestAnimationFrame
    canvasLoop = window.requestAnimationFrame(step);
}

// för att stoppa loopen, window.cancelAnimationFrame(canvasLoop);

let main = document.getElementsByTagName('main')[0]; // hämta main elementet från vårt HTML dokument
main.appendChild(canvas); // lägg till canvaselementet i main i HTML dokumentet

// färgslumpare
function getRandomColor(alpha) {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + "," +  (alpha ? alpha : 1) + ")";
}

// move objekt för att hålla reda på hur spelaren flyttar på sig
let move = { right: false, left: false, up: false, down: false }

// Keydown på movement
document.addEventListener("keydown", function(e) {
	switch(e.key) {
		case "ArrowRight":
            move.right = true;
            break;
		case "ArrowLeft":
            move.left = true;
            break;
        case "ArrowUp":
            move.up = true;
            break;
		case "ArrowDown":
            move.down = true;
            break;
        }
    keys[e.keyCode] = true;
});

// keyup på movement
document.addEventListener("keyup", function(e) {
	switch(e.key) {
		case "ArrowRight":
            move.right = false;
            break;
		case "ArrowLeft":
            move.left = false;
            break;
        case "ArrowUp":
            move.up = false;
            break;
		case "ArrowDown":
            move.down = false;
            break;
        }
    keys[e.keyCode] = false;
});

document.body.addEventListener("keydown", function (e){
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e){
    keys[e.keyCode] = false;
});
