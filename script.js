/* Query Selector */
const screen = document.querySelector('.screen');
const square = document.querySelector('#squares');
const base = document.querySelector('#base');
const bnw = document.querySelector('#bnw');
const rainbow = document.querySelector('#rainbow');
const shader = document.querySelector('#shader');
const eraser = document.querySelector('#eraser');
const gridLines = document.querySelector('#grid-lines');
const reset = document.querySelector('#reset');

/* Default values */
const DEFAULT_SQUARES = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_BACKGROUND = '#F9FAF8';

/* Local variables */
let squares = 16;
let color = '#000000';
let drawType = `D`;
let add = ``;
let isDraw = false;
let hue =0;

/* Update grid */
function updatePage(){
    squares= square.value;
    let add = ``;
    for(let i=squares;i>0;i--)
    {   add+=`<div class=row>`;
        for(let j=squares;j>0;j--)
            add+=`<div class=column data-shade=100></div>`;
        add+=`</div>`;
    }
    screen.innerHTML = add;
    grid = document.querySelectorAll('.column')
    grid.forEach(inputs => inputs.addEventListener('mousemove', draw));
    grid.forEach(inputs => inputs.addEventListener('mousedown', ()=>isDraw= true));
    grid.forEach(inputs => inputs.addEventListener('mouseup', ()=>isDraw= false));
}

/* Color individual divs */
function draw(){
    if(isDraw){
        if(drawType === `S`){
            if(this.dataset.shade > 0){
                let shader =255 * (this.dataset.shade/100);
                this.style.background = `rgb(${shader},${shader},${shader})`
                this.dataset.shade = this.dataset.shade-5;
            }
        }
        else if(drawType === `E`){
            this.dataset.shade = 100;
            this.style.background = DEFAULT_BACKGROUND;
        }
       else if(drawType === `R`){
            this.style.background = color;
            hue++;
            if(hue>500)
                hue =0;
            color = `hsl(${hue}, 80%, 50%)`;
        }
        else{
            this.style.background = color;
        }
    }
}

/* Update pen color */
function updateColor(){
    color = this.value;
    drawType = `D`;
}

/* Glow button on click */
function glowButton(e){
    if(e.target.classList.contains('click')){
        e.target.classList.remove('click')
        return
    }
    e.target.classList.add('click')
}


/* Event Listeners */
window.onload = updatePage();

/* Grid */
square.addEventListener('click', updatePage);
square.addEventListener('input', updatePage); 

/* Color */
base.addEventListener('input', updateColor);
base.addEventListener('input', ()=>{
        bnw.classList.remove('click');
        rainbow.classList.remove('click'); shader.classList.remove('click'); eraser.classList.remove('click');
});

/* Black n White button */
bnw.addEventListener('click', (e)=>{
    glowButton(e);
    rainbow.classList.remove('click'); shader.classList.remove('click'); eraser.classList.remove('click');
    color = DEFAULT_COLOR;
    drawType = `D`;
});

/* Rainbow button */
rainbow.addEventListener('click', (e)=>{
    glowButton(e);
    bnw.classList.remove('click'); shader.classList.remove('click'); eraser.classList.remove('click');
    color = `hsl(${hue}, 100%, 50%)`;
    drawType = `R`;
});

/* Shader button */
shader.addEventListener('click', (e)=>{
    glowButton(e);
    bnw.classList.remove('click'); rainbow.classList.remove('click'); eraser.classList.remove('click');
    drawType = `S`;
});

/* Eraser button */
eraser.addEventListener('click', (e)=>{
    glowButton(e);
    bnw.classList.remove('click'); rainbow.classList.remove('click'); shader.classList.remove('click');
    color = `#F9FAF8`;
    drawType = `E`;
});

/* Reset button */
reset.addEventListener('click', ()=>{
    bnw.classList.remove('click'); rainbow.classList.remove('click'); shader.classList.remove('click'); eraser.classList.remove('click');
    square.value = DEFAULT_SQUARES;
    color = DEFAULT_COLOR;
    base.value = DEFAULT_COLOR;
    isDraw= false;
    drawType = `D`;
    updatePage();
})

/* GridLines button */
gridLines.addEventListener('click',(e)=>{
    glowButton(e);
    grid.forEach((e)=>{
        if(e.style.borderStyle =="hidden")
            e.style.borderStyle = "solid";
        else
            e.style.borderStyle = "hidden";
    });
})









