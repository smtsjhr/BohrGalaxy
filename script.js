window.addEventListener('beforeunload', (e) => {
    window.scrollTo(0,0);
  });

var scroll_rate = 0;
var scale = 1;
var max_scale = .5;
var W;
var H;

const enable_interaction = true;
var scrolling = false;

const t_rate = .0001;
var t = 0;

const fps = 50;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
    var c = canvas;
    var x = ctx;
}

function DwitterCode(t) {
    for(i=200;x.beginPath(),i--;x.fill())
        x.arc(W/2+scale*120*C(a=(t%(2*Math.PI))*i)*(k=1.01**i),H/2+scale*50*S(a)*k,scale*4*k*(1+S(i/10-200*(1-scroll_rate/.002)*t)),0,7);
}


startAnimating(fps);


function draw() {

    scale = Math.min(max_scale, window.innerWidth/1920);
    
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255,255,255,1)'
    DwitterCode(t);

    t += t_rate + scroll_rate;
    
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
    
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();      
     }

    window.onresize = function(e) {
        scale = Math.min(max_scale, window.innerWidth/1920);
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
     }

    if(enable_interaction) {
        window.addEventListener('scroll', function(e) {
            scroll_pos = window.scrollY;
          
            if (!scrolling) {
              window.requestAnimationFrame(function() {
                scroll_action(scroll_pos);
                scrolling = false;
              });
          
              scrolling = true;
            }
          });
     }    
 } 

function scroll_action(scroll_pos) {
    y_scroll = scroll_pos/(10000 - H);
    scroll_rate = .002*y_scroll**2;
}