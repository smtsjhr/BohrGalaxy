window.addEventListener('beforeunload', (e) => {
    window.scrollTo(2500,0);
  });

let scroll_rate;

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
    x_scroll = window.scrollX/(10000 - W) - 0.5 ;
    scroll_rate = -.01*x_scroll**3 - t_rate;
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
 
function resize() {
    scale = Math.min(max_scale, window.innerWidth/1920);
    W = canvas.width = window.innerWidth;
    H = canvas.style.height = canvas.height = window.innerHeight;
}

window.onresize = function(e) {
    resize();
 }

resize();

animate(fps);