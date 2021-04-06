let scroll_width = 10000;
let x_scroll = 0;
let scroll_start = 2500;
let scroll_rate = 0;

let W;
let H;
let scale = 1;
let max_scale = .5;

let t0 = 2;
let t = t0;
const t_rate = .0001;

let fps = 60;
let dt, startTime, now, then, elapsed;

let c = document.getElementById('canvas');
let x = canvas.getContext('2d');

let dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
}

function DwitterDraw(t) {
    for(i=200;x.beginPath(),i--;x.fill())
        x.arc(W/2+scale*120*C(a=(t%(2*Math.PI))*i)*(k=1.01**i),H/2+scale*50*S(a)*k,scale*4*k*(1+S(i/10-200*(1-scroll_rate/.002)*t)),0,7);
}

function draw() {
    
    x.fillStyle = 'rgba(0,0,0,1)';
    x.fillRect(0, 0, W, H);
    x.fillStyle = 'rgba(255,255,255,1)'
    DwitterDraw(t);
    t += t_rate + scroll_rate;
}

function animate(fps) {
    dt = 1000/fps;
    then = window.performance.now();
    startTime = then;
    throttle();
}
 
function throttle(newtime) {
    requestAnimationFrame(throttle);
    now = newtime;
    elapsed = now - then;
    if (elapsed > dt) {
        then = now - (elapsed % dt);
        draw();      
    }
}

let scroll_div= document.getElementById("scroll_div");
scroll_div.scrollLeft = scroll_start;
scroll_div.onscroll = function(e) {
    x_scroll = 2*scroll_div.scrollLeft/(10000 - W) - 1 ;
    scroll_rate = 0.0009*Math.sign(x_scroll)*(x_scroll)**2 - t_rate;
}
 
function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    scale = Math.min(max_scale, W/1920);
}

window.onresize = function(e) {
    resize();
}

resize();

animate(fps);