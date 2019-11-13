const WIDTH = 800; // canvas elementets bredd
const HEIGHT = 600; // canvas elementets höjd

let canvas = document.createElement('canvas'); // skapa canvaselementet
let ctx = canvas.getContext('2d'); // spara canvaselementets context, vi behöver det för att kunna rita
canvas.setAttribute("class", "border"); // ge canvas klassen border så vi markerar ut det
canvas.width = WIDTH; // sätt elementets bredd
canvas.height = HEIGHT; // ... & höjd



ctx.fillStyle = "red";
ctx.fillRect(100, 100, 100, 100);

ctx.fillStyle = "blue";
ctx.fillRect(200, 220, 150, 200);
ctx.lineWidth = 2;
ctx.strokeRect(200, 220, 150, 200);

ctx.fillStyle = "yellow";
ctx.fillRect(250, 270, 50, 100);

ctx.font = "20px Arial";
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.textAlign = "center";
ctx.fillText("haha XD", canvas.width / 2, 100);

document.getElementById("text").style.textAlign = "left";


ctx.font = "20px Times New Roman";
ctx.fillStyle = 'rgb(0, 0, 200)';
ctx.textAlign = "right";
ctx.fillText("haha XD", canvas.width / 2, 50);


    ctx.beginPath();
    ctx.moveTo(400, 400); // linjens startpunkt, X Y
    ctx.lineTo(600, 550); // linjens slutpunkt, X Y
    ctx.strokeStyle = getRandomColor(0.8); // slumpa en färg
    ctx.lineWidth = "4"; // linjens bredd
    ctx.stroke();


function getRandomColor(alpha) {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + "," + (alpha ? alpha : 1) + ")";
}

let main = document.getElementsByTagName('main')[0]; // hämta main elementet från vårt HTML dokument
main.appendChild(canvas); // lägg till canvaselementet i main i HTML dokumentet

