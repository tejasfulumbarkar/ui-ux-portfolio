// Highlight nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Custom animated cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.classList.add('active');
});
document.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
});

// Enlarge cursor on link hover
const links = document.querySelectorAll('a, button, input, textarea, label');
links.forEach(link => {
  link.addEventListener('mouseenter', () => cursor.classList.add('active'));
  link.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// --- Minimal Colorful Pencil Trail Effect (Smooth & Larger) ---
const canvas = document.getElementById('cursor-trail-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

let trailPoints = [];
let trailLength = 32; // increased for longer trail
let hue = 0;

document.addEventListener('mousemove', (e) => {
  trailPoints.push({
    x: e.clientX,
    y: e.clientY,
    hue: hue
  });
  hue = (hue + 10) % 360;
  if (trailPoints.length > trailLength) trailPoints.shift();
});

function drawSmoothTrail() {
  ctx.clearRect(0, 0, width, height);
  if (trailPoints.length > 1) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
    for (let i = 1; i < trailPoints.length - 1; i++) {
      const curr = trailPoints[i];
      const next = trailPoints[i + 1];
      const xc = (curr.x + next.x) / 2;
      const yc = (curr.y + next.y) / 2;
      const alpha = (i + 1) / trailPoints.length * 0.7;
      ctx.strokeStyle = `hsla(${curr.hue}, 80%, 60%, ${alpha})`;
      ctx.lineWidth = 8; // increased for bolder trail
      ctx.quadraticCurveTo(curr.x, curr.y, xc, yc);
    }
    ctx.stroke();
  }
  window.trailAnimationId = requestAnimationFrame(drawSmoothTrail);
}
drawSmoothTrail();



function sendEmail(){
  let params ={
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
  }
  emailjs.send('service_uknvxda', 'template_iut2icd', params)
  .then(function(res){
      alert('Message Sent Successfully');
  })
  .catch(function(error){})
}

