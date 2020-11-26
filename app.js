const canvas = document.getElementById('js-canvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('js-range')
const type = document.getElementById('js-paintType')
const save = document.getElementById('js-save')

const INITIAL_COLOR = "#2c2c2c"

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.0;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting (){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(e) {
    const changedColor = e.target.style.backgroundColor;
    ctx.strokeStyle = changedColor
    ctx.fillStyle = changedColor
}

function handleRangeClick(e){
    const weight = e.target.value;
    ctx.lineWidth = weight;
}

function handleTypeClick(e) {
    if(filling === true){
        console.log(filling)
        filling = false;
        type.innerText = 'FILL'
    }else {
        console.log(filling)

        filling = true
        type.innerText = "PAINT"
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, 700, 700);
    }
}

function handleCM(e){
    e.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a')
    link.href =image;
    link.download ='paintJS';
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown',startPainting)
    canvas.addEventListener('mouseup',stopPainting)
    canvas.addEventListener('mouseleave',stopPainting)
    canvas.addEventListener('click',handleCanvasClick)
    canvas.addEventListener('contextmenu',handleCM)
    save.addEventListener('click',handleSaveClick)
}

 Array.from(colors).forEach(color =>{
     color.addEventListener('click',handleColorClick)
 })

 if(range){
    range.addEventListener('input',handleRangeClick)
 }

 type.addEventListener('click',handleTypeClick)