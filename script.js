/*==================================================
SCRIPT 1
PREMIUM ENGINE
==================================================*/

"use strict";

const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

const intro=$("#intro-screen");
const envelope=$("#envelope");
const envelopeSection=$("#envelope-section");
const wrapper=$("#envelope-wrapper");
const flap=$(".envelope-flap");
const letter=$(".envelope-letter");
const seal=$(".wax-seal");
const glow=$("#glow");
const card=$("#birthday-card");
const glass=$(".glass-card");

let opened=false;

/*============================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

intro.style.opacity="0";

setTimeout(()=>{

intro.remove();

},1200);

},2200);

});

/*============================*/

function lerp(a,b,t){

return a+(b-a)*t;

}

/*============================*/

let mx=0;
let my=0;

window.addEventListener("mousemove",(e)=>{

mx=e.clientX;
my=e.clientY;

});

/*============================*/

let currentX=0;
let currentY=0;

function spotlight(){

currentX=lerp(currentX,mx,.08);
currentY=lerp(currentY,my,.08);

glow.style.left=currentX-210+"px";
glow.style.top=currentY-210+"px";

requestAnimationFrame(spotlight);

}

spotlight();

/*============================*/

envelope.addEventListener("mousemove",(e)=>{

if(opened)return;

const r=envelope.getBoundingClientRect();

const x=e.clientX-r.left;
const y=e.clientY-r.top;

const rx=((y/r.height)-.5)*-16;
const ry=((x/r.width)-.5)*18;

envelope.style.transform=

`rotateX(${rx}deg)
 rotateY(${ry}deg)
 scale(1.04)`;

});

/*============================*/

envelope.addEventListener("mouseleave",()=>{

if(opened)return;

envelope.style.transform="";

});

/*============================*/

const particles=[];

class GoldParticle{

constructor(){

this.reset();

}

reset(){

this.x=Math.random()*innerWidth;

this.y=Math.random()*innerHeight;

this.r=Math.random()*2+1;

this.s=Math.random()*1.2+.2;

this.a=Math.random();

}

draw(){

ctx.beginPath();

ctx.arc(this.x,this.y,this.r,0,Math.PI*2);

ctx.fillStyle=

"rgba(255,220,120,"+this.a+")";

ctx.fill();

}

update(){

this.y-=this.s;

if(this.y<-10){

this.y=innerHeight+20;

this.x=Math.random()*innerWidth;

}

}

}

const canvas=$("#particles");

const ctx=canvas.getContext("2d");

function resize(){

canvas.width=innerWidth;

canvas.height=innerHeight;

}

resize();

window.addEventListener("resize",resize);

for(let i=0;i<180;i++){

particles.push(new GoldParticle());

}

/*============================*/

function particleLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.update();

p.draw();

});

requestAnimationFrame(particleLoop);

}

particleLoop();

/*============================*/

function pulseGlow(){

glow.animate([

{

transform:"scale(1)",

opacity:.4

},

{

transform:"scale(1.35)",

opacity:1

},

{

transform:"scale(1)",

opacity:.4

}

],{

duration:2600,

iterations:Infinity

});

}

pulseGlow();

/*============================*/

glass.style.transition="1s";

card.style.opacity="0";

card.style.transform="scale(.8)";
/*==================================================
SCRIPT 2
LUXURY ENVELOPE OPENING
==================================================*/

envelope.addEventListener("click",openGift);

function openGift(){

if(opened)return;

opened=true;

envelope.style.pointerEvents="none";

wrapper.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.08)"

},

{

transform:"scale(1)"

}

],{

duration:1200,

easing:"ease-out"

});

/*========================*/

seal.animate([

{

transform:"translateX(-50%) scale(1)"

},

{

transform:"translateX(-50%) scale(1.5)"

},

{

transform:"translateX(-50%) scale(.1)",

opacity:0

}

],{

duration:800,

fill:"forwards"

});

/*========================*/

setTimeout(()=>{

flap.style.transform="rotateX(-185deg)";

},450);

/*========================*/

setTimeout(()=>{

letter.style.transform=

"translateY(-250px) scale(1.08)";

letter.style.boxShadow=

"0 40px 80px rgba(0,0,0,.35)";

},900);

/*========================*/

setTimeout(()=>{

envelope.style.transition="1s";

envelope.style.transform=

"translateY(120px) scale(.82)";

envelope.style.opacity=".15";

},1800);

/*========================*/

setTimeout(()=>{

envelopeSection.animate([

{

opacity:1

},

{

opacity:0

}

],{

duration:1000,

fill:"forwards"

});

},2500);

/*========================*/

setTimeout(()=>{

envelopeSection.style.display="none";

showCard();

},3300);

}

/*==================================================
CARD
==================================================*/

function showCard(){

card.style.display="flex";

requestAnimationFrame(()=>{

card.classList.add("show");

card.style.opacity="1";

card.style.transform="scale(1)";

});

animatePhoto();

launchCelebration();

}

/*==================================================
PHOTO
==================================================*/

function animatePhoto(){

const photo=$(".photo-frame");

const title=$(".title-area");

const msg=$(".message");

const sign=$(".signature");

photo.animate([

{

opacity:0,

transform:"translateY(80px) scale(.6)"

},

{

opacity:1,

transform:"translateY(0) scale(1)"

}

],{

duration:1200,

fill:"forwards",

easing:"ease-out"

});

title.animate([

{

opacity:0,

transform:"translateY(50px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

delay:500,

duration:900,

fill:"forwards"

});

msg.animate([

{

opacity:0,

transform:"translateY(50px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

delay:1000,

duration:900,

fill:"forwards"

});

sign.animate([

{

opacity:0,

transform:"translateY(50px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

delay:1500,

duration:900,

fill:"forwards"

});

}
/*==================================================
SCRIPT 3
FIREWORKS + CONFETTI + CELEBRATION
==================================================*/

const fireCanvas=$("#fireworks");
const fireCtx=fireCanvas.getContext("2d");

fireCanvas.width=innerWidth;
fireCanvas.height=innerHeight;

window.addEventListener("resize",()=>{

fireCanvas.width=innerWidth;
fireCanvas.height=innerHeight;

});

const fireworks=[];

class Spark{

constructor(x,y){

this.x=x;
this.y=y;

this.vx=(Math.random()-.5)*12;
this.vy=(Math.random()-.5)*12;

this.life=100;

this.size=Math.random()*3+2;

this.color=[

"#FFD700",
"#FFFFFF",
"#FF4D4D",
"#FFC400"

][Math.floor(Math.random()*4)];

}

update(){

this.life--;

this.vy+=0.08;

this.x+=this.vx;

this.y+=this.vy;

}

draw(){

fireCtx.save();

fireCtx.globalAlpha=this.life/100;

fireCtx.beginPath();

fireCtx.arc(this.x,this.y,this.size,0,Math.PI*2);

fireCtx.fillStyle=this.color;

fireCtx.shadowBlur=18;

fireCtx.shadowColor=this.color;

fireCtx.fill();

fireCtx.restore();

}

}

/*======================================*/

function explode(x,y){

for(let i=0;i<180;i++){

fireworks.push(new Spark(x,y));

}

}

/*======================================*/

function fireLoop(){

fireCtx.clearRect(0,0,fireCanvas.width,fireCanvas.height);

for(let i=fireworks.length-1;i>=0;i--){

fireworks[i].update();

fireworks[i].draw();

if(fireworks[i].life<=0){

fireworks.splice(i,1);

}

}

requestAnimationFrame(fireLoop);

}

fireLoop();

/*======================================*/

function randomFirework(){

explode(

Math.random()*innerWidth,

80+Math.random()*innerHeight*.45

);

}

let fireInterval;

/*======================================*/

function launchCelebration(){

if(typeof confetti==="function"){

confetti({

particleCount:250,

spread:120,

origin:{y:.6}

});

}

explode(innerWidth/2,200);

setTimeout(randomFirework,700);

setTimeout(randomFirework,1500);

setTimeout(randomFirework,2400);

setTimeout(randomFirework,3300);

fireInterval=setInterval(randomFirework,2200);

}

/*======================================*/

window.addEventListener("click",(e)=>{

if(!opened)return;

explode(e.clientX,e.clientY);

if(typeof confetti==="function"){

confetti({

particleCount:70,

spread:90,

origin:{

x:e.clientX/innerWidth,

y:e.clientY/innerHeight

}

});

}

});

/*======================================*/

setInterval(()=>{

if(!opened)return;

if(Math.random()>.65){

explode(

Math.random()*innerWidth,

Math.random()*300+80

);

}

},1800);
/*==================================================
SCRIPT 4
BALLOONS + FLOATING LIGHTS + FINAL POLISH
==================================================*/

const balloonLayer=$("#balloon-layer");
const sparkleLayer=$("#sparkle-layer");

/*========================
BALLOONS
========================*/

const balloonColors=[
"#D40000",
"#FFD54A",
"#FFFFFF",
"#FF8A8A"
];

function createBalloon(){

const b=document.createElement("div");

b.className="balloon";

b.style.left=Math.random()*100+"vw";

b.style.background=

balloonColors[
Math.floor(Math.random()*balloonColors.length)
];

b.style.animationDuration=

(10+Math.random()*8)+"s";

b.style.transform=

`scale(${0.7+Math.random()*.8})`;

balloonLayer.appendChild(b);

setTimeout(()=>{

b.remove();

},22000);

}

for(let i=0;i<12;i++){

setTimeout(createBalloon,i*500);

}

setInterval(createBalloon,1200);

/*========================
SPARKLES
========================*/

function sparkle(){

const s=document.createElement("div");

s.className="spark";

s.style.left=Math.random()*100+"vw";

s.style.top=Math.random()*100+"vh";

s.style.opacity=Math.random();

s.style.transform=

`scale(${Math.random()*1.8+.3})`;

sparkleLayer.appendChild(s);

s.animate([

{

opacity:0,

transform:"scale(.2)"

},

{

opacity:1,

transform:"scale(1.4)"

},

{

opacity:0,

transform:"scale(.1)"

}

],{

duration:2000+Math.random()*3000

});

setTimeout(()=>{

s.remove();

},5000);

}

for(let i=0;i<60;i++){

setTimeout(sparkle,i*80);

}

setInterval(sparkle,250);

/*========================
PHOTO GLOW
========================*/

const photo=$(".photo-frame");

setInterval(()=>{

if(!opened)return;

photo.animate([

{

boxShadow:

"0 0 25px gold"

},

{

boxShadow:

"0 0 90px rgba(255,215,0,.9)"

},

{

boxShadow:

"0 0 25px gold"

}

],{

duration:2200

});

},2600);

/*========================
TITLE SHINE
========================*/

const title=$(".title-area h1");

setInterval(()=>{

if(!opened)return;

title.animate([

{

letterSpacing:"2px",

opacity:1

},

{

letterSpacing:"8px",

opacity:.85

},

{

letterSpacing:"2px",

opacity:1

}

],{

duration:1400

});

},3500);

/*========================
CARD FLOAT
========================*/

let t=0;

function floatingCard(){

if(opened){

t+=0.02;

glass.style.transform=

`translateY(${Math.sin(t)*8}px)`;

}

requestAnimationFrame(floatingCard);

}

floatingCard();

/*========================
MOUSE PARALLAX
========================*/

document.addEventListener("mousemove",(e)=>{

if(!opened)return;

const x=(e.clientX/window.innerWidth-.5)*12;

const y=(e.clientY/window.innerHeight-.5)*12;

glass.style.transform=

`rotateY(${x}deg)
 rotateX(${-y}deg)
 translateY(${Math.sin(t)*8}px)`;

});

/*========================
AUTO CAMERA EFFECT
========================*/

setInterval(()=>{

if(!opened)return;

card.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.03)"

},

{

transform:"scale(1)"

}

],{

duration:2500,

easing:"ease-in-out"

});

},5000);

/*========================
END
========================*/

console.log(
"Birthday Premium Experience Loaded ❤️"
);
/*==================================================
SCRIPT 5
GRAND FINALE
==================================================*/

const body=document.body;

/*========================
TYPEWRITER
========================*/

const messageText =
"🎉 Happy Birthday Ashvin Sir! Wishing you endless success, happiness, good health and many more achievements. Have a wonderful year ahead! 🎂🥳";

function typeWriter(){

const p=document.querySelector(".message p");

if(!p)return;

p.innerHTML="";

let i=0;

const timer=setInterval(()=>{

p.innerHTML+=messageText.charAt(i);

i++;

if(i>=messageText.length){

clearInterval(timer);

}

},35);

}

/*========================
ROSE PETALS
========================*/

function rose(){

const petal=document.createElement("div");

petal.innerHTML="🌹";

petal.style.position="fixed";

petal.style.left=Math.random()*100+"vw";

petal.style.top="-40px";

petal.style.fontSize=

(18+Math.random()*18)+"px";

petal.style.zIndex="999";

petal.style.pointerEvents="none";

petal.style.transition=

"transform 8s linear, top 8s linear, opacity 8s";

body.appendChild(petal);

requestAnimationFrame(()=>{

petal.style.top="110vh";

petal.style.transform=

`translateX(${(Math.random()-.5)*300}px)
 rotate(${720+Math.random()*360}deg)`;

petal.style.opacity="0";

});

setTimeout(()=>{

petal.remove();

},8000);

}

setInterval(()=>{

if(opened){

rose();

}

},500);

/*========================
GOLD LIGHT FLASH
========================*/

function flash(){

const d=document.createElement("div");

d.style.position="fixed";

d.style.left="0";

d.style.top="0";

d.style.width="100%";

d.style.height="100%";

d.style.pointerEvents="none";

d.style.background=

"radial-gradient(circle,rgba(255,230,120,.35),transparent 70%)";

d.style.opacity="0";

d.style.zIndex="999";

body.appendChild(d);

d.animate([

{

opacity:0

},

{

opacity:1

},

{

opacity:0

}

],{

duration:1500

});

setTimeout(()=>{

d.remove();

},1600);

}

/*========================
CAKE
========================*/

function cake(){

const c=document.createElement("div");

c.innerHTML="🎂";

c.style.position="fixed";

c.style.left="50%";

c.style.bottom="25px";

c.style.transform="translateX(-50%)";

c.style.fontSize="70px";

c.style.zIndex="999";

body.appendChild(c);

c.animate([

{

transform:"translateX(-50%) scale(.2)",

opacity:0

},

{

transform:"translateX(-50%) scale(1.2)",

opacity:1

},

{

transform:"translateX(-50%) scale(1)",

opacity:1

}

],{

duration:1200,

fill:"forwards"

});

}

/*========================
FINAL CELEBRATION
========================*/

function grandFinale(){

typeWriter();

cake();

flash();

if(typeof confetti==="function"){

const duration=8000;

const end=Date.now()+duration;

(function frame(){

confetti({

particleCount:8,

angle:60,

spread:70,

origin:{x:0}

});

confetti({

particleCount:8,

angle:120,

spread:70,

origin:{x:1}

});

if(Date.now()<end){

requestAnimationFrame(frame);

}

})();

}

}

/*========================
RUN
========================*/

const oldLaunch=launchCelebration;

launchCelebration=function(){

oldLaunch();

setTimeout(grandFinale,2500);

};

/*========================
THE END
========================*/

console.clear();

console.log("%c🎉 HAPPY BIRTHDAY 🎉","font-size:32px;color:gold;font-weight:bold;");
console.log("%cPremium Birthday Experience Loaded.","font-size:18px;color:#ff4444;");
