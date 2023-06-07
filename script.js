const screen = document.querySelector('.screen');
const square = document.querySelector('#squares');
const base = document.querySelector('#base');
const bnw = document.querySelector('#bnw');
const rainbow = document.querySelector('#rainbow');
const reset = document.querySelector('#reset');


const DEFAULT_SQUARES = 16;
const DEFAULT_COLOR = '#000000';
let squares = 16;
let color = '#000000';
let isRainbow = false;
let add = ``;
let isDraw = false;

window.onload =()=>{
for(let i=squares;i>0;i--)
{   add+=`<div class=row>`;
    for(let j=squares;j>0;j--)
        {
        add+=`<div class=column></div>`;
        }
    add+=`</div>`;
}
screen.innerHTML = add;
let grid = document.querySelectorAll('.column')
grid.forEach(inputs => inputs.addEventListener('mouseover', draw));
grid.forEach(inputs => inputs.addEventListener('mousedown', ()=>isDraw= true));
grid.forEach(inputs => inputs.addEventListener('mouseup', ()=>isDraw= false));
}




function updatePage(){
    squares= this.value;
    let add = ``;

    for(let i=squares;i>0;i--)
    {   add+=`<div class=row>`;
        for(let j=squares;j>0;j--)
            {
            add+=`<div class=column></div>`;
            }
        add+=`</div>`;
    }
    screen.innerHTML = add;
    grid = document.querySelectorAll('.column')
    grid.forEach(inputs => inputs.addEventListener('mouseover', draw));
    grid.forEach(inputs => inputs.addEventListener('mousedown', ()=>isDraw= true));
    grid.forEach(inputs => inputs.addEventListener('mouseup', ()=>isDraw= false));

}

function draw(e){
    if(isDraw){
        this.style.background = color;
    }
}

function updateColor(){
    color = this.value;
    isRainbow = false;
}

square.addEventListener('click', updatePage);
square.addEventListener('input', updatePage);  
base.addEventListener('input', updateColor);
bnw.addEventListener('click', ()=>{
    if(isRainbow ==true){
        isRainbow =false;
    }
});

rainbow.addEventListener('click', ()=>{
    console.log('Hi')
    if(isRainbow ==false){
        isRainbow =true;
    }
});



