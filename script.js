/* ===== PARALLAX TRACKER ===== */

let parallaxX = 0;
let parallaxY = 0;

function updateParallax(x, y) {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  parallaxX = (x - cx) * 0.02;
  parallaxY = (y - cy) * 0.02;
}
/* mouse move */
window.addEventListener("mousemove", (e) => {
  updateParallax(e.clientX, e.clientY);
});

/* mobile tilt */
window.addEventListener("deviceorientation", (e) => {
  if (e.gamma && e.beta) {
    parallaxX = e.gamma * 0.6;
    parallaxY = e.beta * 0.6;
  }
});
/* ===== PERSISTENT MUSIC SYSTEM ===== */

function setupMusic() {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  const MUSIC_SRC = "music.mp3";

  // restore time if exists
  const savedTime = sessionStorage.getItem("musicTime");
  const wasPlaying = sessionStorage.getItem("musicPlaying");

  if (!music.src) {
    music.src = MUSIC_SRC;
  }

  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }

  // try resume if user already unlocked once
  if (wasPlaying === "true") {
    music.volume = 0.4;
    music.play().catch(() => {});
  }

  // save progress continuously
  music.addEventListener("timeupdate", () => {
    sessionStorage.setItem("musicTime", music.currentTime);
  });

  music.addEventListener("play", () => {
    sessionStorage.setItem("musicPlaying", "true");
  });
}

document.addEventListener("DOMContentLoaded", setupMusic);
/* ===== STARFIELD ===== */
const canvas=document.getElementById("stars");
if(canvas){
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

let stars=[];
for(let i=0;i<140;i++){
  stars.push({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5,
  depth: Math.random() * 0.6 + 0.2
});
}

function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="white";
  stars.forEach(s => {
  const offsetX = (parallaxX * s.depth);
  const offsetY = (parallaxY * s.depth);

  ctx.beginPath();
  ctx.arc(s.x + offsetX, s.y + offsetY, s.r, 0, Math.PI * 2);
  ctx.fill();
});
  requestAnimationFrame(drawStars);
}
drawStars();
}

/* ===== AGE COUNTER ===== */
function startAgeCounter(birthDate){
  const el=document.getElementById("ageCounter");
  if(!el) return;

  setInterval(()=>{
    const now=new Date();
    const diff=now-birthDate;

    const seconds=Math.floor(diff/1000);
    const minutes=Math.floor(seconds/60);
    const hours=Math.floor(minutes/60);

    el.innerHTML=
      `${hours.toLocaleString()} hours • ${minutes.toLocaleString()} minutes • ${seconds.toLocaleString()} seconds`;
  },1000);
}

/* ===== MUSIC GATE ===== */
function unlock(){
  const music=document.getElementById("bgMusic");
  const gate=document.getElementById("gate");

  if(music){
    music.src="music.mp3";
    music.volume=.4;
    music.play().catch(()=>{});
    sessionStorage.setItem("musicPlaying","true");
  }

  if(gate){
    gate.style.opacity="0";
    setTimeout(()=>gate.remove(),500);
  }
}

/* ===== REASONS MODAL ===== */
function showReason(text){
  const modal=document.getElementById("modal");
  const content=document.getElementById("modalText");
  content.innerText=text;
  modal.style.display="flex";
}
function closeModal(){
  document.getElementById("modal").style.display="none";
}

/* ===== CONFETTI BURST ===== */

function launchConfetti() {
  const colors = ["#f6c177","#ff8fa3","#ffffff","#ffd166","#9ad0ff"];

  for (let i = 0; i < 120; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti-piece";

    conf.style.left = Math.random() * 100 + "vw";
    conf.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    conf.style.animationDuration = (3 + Math.random() * 2) + "s";
    conf.style.transform = `rotate(${Math.random()*360}deg)`;

    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 5200);
  }
}

/* ===== RISING BALLOONS ===== */

function createBalloons(){
  const field=document.getElementById("balloonField");
  if(!field) return;

  const colors=[
    "#ff8fa3",
    "#f6c177",
    "#9ad0ff",
    "#ffffff",
    "#ffd166"
  ];

  function spawn(){
    const b=document.createElement("div");
    b.className="balloon";

    const size=50+Math.random()*40;
    b.style.width=size+"px";
    b.style.height=size*1.3+"px";

    b.style.left=Math.random()*100+"vw";
    b.style.background=
      colors[Math.floor(Math.random()*colors.length)];

    const duration=12+Math.random()*10;
    b.style.animationDuration=duration+"s";

    field.appendChild(b);

    setTimeout(()=>b.remove(),duration*1000);
  }

  // spawn loop (gentle, not crowded)
 const spawnRate = window.innerWidth < 600 ? 2600 : 1800;
setInterval(spawn, spawnRate);
}

document.addEventListener("DOMContentLoaded", createBalloons);

/* ===== GLASS PARALLAX LINK ===== */

function updateGlassParallax() {
  document.body.style.setProperty("--px", parallaxX + "px");
  document.body.style.setProperty("--py", parallaxY + "px");
  document.body.classList.add("parallax-active");
  requestAnimationFrame(updateGlassParallax);
}
updateGlassParallax();