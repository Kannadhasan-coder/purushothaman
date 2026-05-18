  // ---- AUTO-FORMAT PASSWORD INPUT ----
  const pwdInput = document.getElementById('pwd-input');
  pwdInput.addEventListener('input', function(e) {
    let v = e.target.value.replace(/[^0-9]/g, '');
    if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
    if (v.length > 5) v = v.slice(0,5) + '/' + v.slice(5);
    e.target.value = v.slice(0,10);
  });
  pwdInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkPwd();
  });

  // ---- LOCK PETALS ----
  const pc = document.getElementById('petals-container');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = 6 + Math.random() * 10;
    p.style.cssText = `
      width:${size}px;height:${size*0.6}px;
      background:rgba(${192+Math.random()*30},${50+Math.random()*40},${40+Math.random()*30},${0.4+Math.random()*0.3});
      left:${Math.random()*100}%;
      animation-duration:${6+Math.random()*8}s;
      animation-delay:${Math.random()*10}s;
    `;
    pc.appendChild(p);
  }

  // ---- CHECK PASSWORD ----
  function checkPwd() {
    const val = pwdInput.value.trim();
    const errEl = document.getElementById('lock-err');
    if (val === '18/05/2025') {
      document.getElementById('lock-screen').style.transition = 'opacity 1.2s';
      document.getElementById('lock-screen').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('main-site').style.display = 'block';
        startConfetti();
        initTimeline();
      }, 1200);
    } else {
      errEl.textContent = '✦ Incorrect date — try again ✦';
      pwdInput.style.borderColor = '#e74c3c';
      setTimeout(() => {
        errEl.textContent = '';
        pwdInput.style.borderColor = 'var(--gold)';
      }, 2500);
      pwdInput.value = '';
      pwdInput.focus();
    }
  }

  // ---- CONFETTI / PETALS ----
  function startConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#c9a84c','#e74c3c','#f0d078','#ff6b6b','#ffd700'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        const size = 5 + Math.random() * 12;
        p.style.cssText = `
          position:absolute;
          width:${size}px;height:${size*0.55}px;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          border-radius:50% 0 50% 0;
          left:${Math.random()*100}%;top:-20px;
          opacity:0;
          animation:petal-fall ${7+Math.random()*9}s ${Math.random()*5}s linear infinite;
        `;
        container.appendChild(p);
      }, i * 120);
    }
  }

  // ---- TIMELINE SCROLL ----
  function initTimeline() {
    const items = document.querySelectorAll('.t-item');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.3 });
    items.forEach(it => obs.observe(it));
  }

  // ---- LIGHTBOX ----
  function openLightbox(card) {
    const img = card.querySelector('img');
    document.getElementById('lb-img').src = img.src;
    document.getElementById('lightbox').classList.add('open');
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });