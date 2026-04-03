/* ─── Particle Canvas Background ─── */
(function(){
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const PARTICLE_COUNT = 80;
  
    function resize(){
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
  
    function makeParticle(){
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1
      };
    }
  
    function init(){
      resize();
      particles = Array.from({length: PARTICLE_COUNT}, makeParticle);
    }
  
    function draw(){
      ctx.clearRect(0,0,W,H);
  
      // Gradient bg orbs
      const g1 = ctx.createRadialGradient(W*0.15, H*0.2, 0, W*0.15, H*0.2, W*0.35);
      g1.addColorStop(0,'rgba(0,100,200,0.06)');
      g1.addColorStop(1,'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0,0,W,H);
  
      const g2 = ctx.createRadialGradient(W*0.85, H*0.7, 0, W*0.85, H*0.7, W*0.3);
      g2.addColorStop(0,'rgba(100,50,180,0.05)');
      g2.addColorStop(1,'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0,0,W,H);
  
      // Particles
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if(p.x < 0) p.x = W; if(p.x > W) p.x = 0;
        if(p.y < 0) p.y = H; if(p.y > H) p.y = 0;
  
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(0,194,255,${p.opacity})`;
        ctx.fill();
      });
  
      // Connecting lines
      particles.forEach((a,i) => {
        particles.slice(i+1).forEach(b => {
          const dist = Math.hypot(a.x-b.x, a.y-b.y);
          if(dist < 120){
            ctx.beginPath();
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.strokeStyle = `rgba(0,194,255,${0.06*(1-dist/120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
  
      requestAnimationFrame(draw);
    }
  
    init();
    draw();
    window.addEventListener('resize', () => { resize(); });
  })();
  
  /* ─── Typing Effect ─── */
  (function(){
    const phrases = [
      'Building cool things with code.',
      'CSE Student · Problem Solver.',
      'Hackathon enthusiast & builder.',
      'Learning. Creating. Growing.',
      'Future Software Engineer. 🚀',
    ];
    let pi = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-text');
    const speed = { type: 65, delete: 35, pause: 2200 };
  
    function tick(){
      const phrase = phrases[pi];
      if(!deleting){
        el.textContent = phrase.slice(0, ci+1);
        ci++;
        if(ci === phrase.length){
          deleting = true;
          setTimeout(tick, speed.pause);
          return;
        }
        setTimeout(tick, speed.type);
      } else {
        el.textContent = phrase.slice(0, ci-1);
        ci--;
        if(ci === 0){
          deleting = false;
          pi = (pi+1) % phrases.length;
        }
        setTimeout(tick, speed.delete);
      }
    }
    tick();
  })();
  
  /* ─── Navbar Scroll ─── */
  (function(){
    const nav = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
  
    window.addEventListener('scroll', () => {
      if(window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
  
      let current = '';
      sections.forEach(s => {
        if(window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      links.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#'+current);
      });
    }, {passive:true});
  })();
  
  /* ─── Scroll Reveal ─── */
  (function(){
    const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if(e.isIntersecting){
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  })();
  
  /* ─── Skill Progress Bars ─── */
  (function(){
    const bars = document.querySelectorAll('.bar-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          const w = e.target.getAttribute('data-width');
          setTimeout(() => { e.target.style.width = w + '%'; }, 200);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(b => observer.observe(b));
  })();
  
  /* ─── Mobile Menu ─── */
  function openMobileMenu(){ document.getElementById('mobileMenu').classList.add('open'); }
  function closeMobileMenu(){ document.getElementById('mobileMenu').classList.remove('open'); }
  
  /* ─── Stagger reveals with delays ─── */
  document.querySelectorAll('.reveal').forEach((el, i) => {
    const delay = Math.min(i * 0.04, 0.5);
    el.style.transitionDelay = delay + 's';
  });
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Load saved theme
  if(localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    toggleBtn.textContent = '☀️';
  }
  
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
  
    if(document.body.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '🌙';
    }
  });