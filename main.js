const save = document.getElementById("save");
const fileInput = document.getElementById("file");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const destory = document.getElementById("destory");
const erase = document.getElementById("erase");
const drawModeBtn = document.getElementById("draw-mode");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;


function onMouseMove(event){
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startDrawing() {
    isPainting = true;
}

function cancleDrawing() {
    isPainting = false;
    ctx.beginPath();
}

function onColorChange(event) {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
    color.value = event.target.value;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onDrawModeBtnClick() {
    if(isFilling) {
        isFilling = false;
        drawModeBtn.innerText = "🖌Draw Mode";
    } else {
        isFilling = true;
        drawModeBtn.innerText = "🩸Fill Mode";
    }
}

function onFillCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, 500, 500);
    }
}

function onEraseClick() {
    isFilling = false;
    ctx.strokeStyle = 'white';
    drawModeBtn.innerText = "Draw Mode";
}

function onDestroyClick() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);
}

function onColorClick(event) {
    ctx.fillStyle = event.target.dataset.color;
    ctx.strokeStyle = event.target.dataset.color;
    color.value = event.target.dataset.color;
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image(); // It's same as <img src=""></img> in HTML
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, 500, 500);
        fileInput.value = null;
    }
}

function onSaveImage(){
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
}

// canvas.onmousemove = function(){}
// The reason addEventListener is better :
// add or remove many eventlisteners in the same event

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", cancleDrawing);
canvas.addEventListener("mouseleave", cancleDrawing);
canvas.addEventListener("click", onFillCanvasClick);

color.addEventListener("change", onColorChange);

lineWidth.addEventListener("change", onLineWidthChange);

drawModeBtn.addEventListener("click", onDrawModeBtnClick);

erase.addEventListener("click", onEraseClick);

destory.addEventListener("click", onDestroyClick);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

fileInput.addEventListener("change", onFileChange);

save.addEventListener("click", onSaveImage);