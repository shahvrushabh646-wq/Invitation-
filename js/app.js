/**
 * Nemin & Heta — Luxury Wedding Invitation
 * Interactive scripts: doors, scratch, countdown, RSVP, music, scroll reveals
 */

(function () {
  'use strict';

  // ---------- Config helpers ----------
  const cfg = typeof WEDDING_CONFIG !== 'undefined' ? WEDDING_CONFIG : {};
  const coupleNames = `${cfg.groom?.name || 'Nemin'} & ${cfg.bride?.name || 'Heta'}`;

  // ---------- DOM Ready ----------
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    populateContent();
    setupDoors();
    setupScratch();
    setupCountdown();
    setupScrollReveals();
    setupRSVP();
    setupMusic();
    setupBackToTop();
    setupSmoothScroll();
  }

  // ---------- Populate dynamic content from config ----------
  function populateContent() {
    // Names
    document.querySelectorAll('[data-groom]').forEach(el => el.textContent = cfg.groom?.name || 'Nemin');
    document.querySelectorAll('[data-bride]').forEach(el => el.textContent = cfg.bride?.name || 'Heta');
    document.querySelectorAll('[data-gujarati-groom]').forEach(el => el.textContent = cfg.groom?.gujarati || 'નિમિન');
    document.querySelectorAll('[data-gujarati-bride]').forEach(el => el.textContent = cfg.bride?.gujarati || 'હેતા');
    document.querySelectorAll('[data-couple]').forEach(el => el.textContent = coupleNames);

    // Welcome message
    const welcomeEl = document.querySelector('[data-welcome]');
    if (welcomeEl && cfg.welcomeMessage) welcomeEl.textContent = cfg.welcomeMessage;

    // Story
    const storyEl = document.querySelector('[data-story]');
    if (storyEl && cfg.story?.text) storyEl.textContent = cfg.story.text;

    // Events
    const eventsContainer = document.querySelector('[data-events]');
    if (eventsContainer && Array.isArray(cfg.events)) {
      eventsContainer.innerHTML = cfg.events.map(ev => `
        <article class="event-card reveal-on-scroll">
          <h3 class="event-title">${escapeHtml(ev.title)}</h3>
          <p class="event-gujarati">${escapeHtml(ev.gujarati || '')}</p>
          <p class="event-meta"><strong>Date:</strong> ${escapeHtml(ev.date)}</p>
          <p class="event-meta"><strong>Time:</strong> ${escapeHtml(ev.time)}</p>
          <p class="event-meta"><strong>Venue:</strong> ${escapeHtml(ev.venue)}</p>
          ${ev.description ? `<p class="event-desc">${escapeHtml(ev.description)}</p>` : ''}
        </article>
      `).join('');
    }

    // Destinations
    const destContainer = document.querySelector('[data-destinations]');
    if (destContainer && Array.isArray(cfg.destinations)) {
      destContainer.innerHTML = cfg.destinations.map(d => `
        <article class="dest-card reveal-on-scroll">
          <h3 class="dest-name">${escapeHtml(d.name)}</h3>
          <p class="dest-state">${escapeHtml(d.state)}</p>
          <p class="dest-desc">${escapeHtml(d.description || '')}</p>
        </article>
      `).join('');
    }

    // Venue
    if (cfg.venue) {
      const vName = document.querySelector('[data-venue-name]');
      const vLoc = document.querySelector('[data-venue-location]');
      const vAddr = document.querySelector('[data-venue-address]');
      const vBtn = document.querySelector('[data-venue-directions]');
      if (vName) vName.textContent = cfg.venue.name;
      if (vLoc) vLoc.textContent = `${cfg.venue.city || ''}${cfg.venue.state ? ', ' + cfg.venue.state : ''}`;
      if (vAddr) vAddr.textContent = cfg.venue.address || '';
      if (vBtn) {
        if (cfg.venue.mapLink) {
          vBtn.href = cfg.venue.mapLink;
          vBtn.classList.remove('disabled');
          vBtn.target = '_blank';
          vBtn.rel = 'noopener noreferrer';
        } else {
          vBtn.classList.add('disabled');
          vBtn.removeAttribute('href');
        }
      }
    }

    // Family
    if (cfg.family) {
      const gTitle = document.querySelector('[data-groom-family-title]');
      const gParents = document.querySelector('[data-groom-parents]');
      const bTitle = document.querySelector('[data-bride-family-title]');
      const bParents = document.querySelector('[data-bride-parents]');
      const blessing = document.querySelector('[data-blessing]');
      if (gTitle) gTitle.textContent = cfg.family.groomSide?.title || "Groom's Family";
      if (gParents) gParents.textContent = cfg.family.groomSide?.parents || '';
      if (bTitle) bTitle.textContent = cfg.family.brideSide?.title || "Bride's Family";
      if (bParents) bParents.textContent = cfg.family.brideSide?.parents || '';
      if (blessing) blessing.textContent = cfg.family.blessingMessage || '';
    }

    // Thank you
    const tyMsg = document.querySelector('[data-thankyou]');
    if (tyMsg && cfg.thankYouMessage) tyMsg.textContent = cfg.thankYouMessage;

    // Document title
    if (cfg.siteTitle) document.title = cfg.siteTitle;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- Palace Doors ----------
  function setupDoors() {
    const entrance = document.getElementById('entrance');
    const seal = document.getElementById('invitationSeal');
    const doorLeft = document.querySelector('.door.left');
    const doorRight = document.querySelector('.door.right');
    const sealWrapper = document.querySelector('.seal-wrapper');
    const mainContent = document.getElementById('main-content');

    if (!seal || !entrance) return;

    function openDoors() {
      if (entrance.classList.contains('opened')) return;

      // Seal animation
      seal.style.transition = 'transform 0.6s ease, opacity 0.6s';
      seal.style.transform = 'scale(1.2)';
      setTimeout(() => {
        seal.style.transform = 'scale(0)';
        seal.style.opacity = '0';
      }, 200);

      if (sealWrapper) sealWrapper.classList.add('hidden');

      // Open doors
      setTimeout(() => {
        doorLeft?.classList.add('open');
        doorRight?.classList.add('open');
      }, 400);

      // Reveal main content & hide entrance
      setTimeout(() => {
        entrance.classList.add('opened');
        document.body.classList.remove('doors-closed');
        mainContent?.classList.add('visible');
        // Start soft scroll reveal for first sections
        setTimeout(() => {
          document.querySelectorAll('#welcome .reveal-on-scroll').forEach(el => el.classList.add('visible'));
        }, 300);
      }, 2800);
    }

    seal.addEventListener('click', openDoors);
    seal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDoors();
      }
    });
  }

  // ---------- Scratch to Reveal ----------
  function setupScratch() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const card = canvas.parentElement;
    let isDrawing = false;
    let lastX = 0, lastY = 0;
    let scratchedPercent = 0;
    const brushSize = 28;

    function resizeCanvas() {
      const rect = card.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
      drawCover();
    }

    function drawCover() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      // Soft gold-pink gradient cover
      const grad = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, w/2);
      grad.addColorStop(0, '#e8c4a8');
      grad.addColorStop(0.5, '#d4a574');
      grad.addColorStop(1, '#c9a227');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle pattern
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }

      // Heart outline hint (optional)
      ctx.strokeStyle = 'rgba(107,45,60,0.25)';
      ctx.lineWidth = 2;
      drawHeartPath(ctx, w/2, h/2, 55);
      ctx.stroke();

      // Instruction text on cover
      ctx.fillStyle = 'rgba(107,45,60,0.55)';
      ctx.font = '600 11px "Cormorant Garamond", serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH HERE', w/2, h/2 + 70);
    }

    function drawHeartPath(ctx, cx, cy, size) {
      ctx.beginPath();
      ctx.moveTo(cx, cy + size * 0.3);
      ctx.bezierCurveTo(cx, cy, cx - size, cy, cx - size, cy + size * 0.3);
      ctx.bezierCurveTo(cx - size, cy + size * 0.7, cx, cy + size * 1.1, cx, cy + size * 1.1);
      ctx.bezierCurveTo(cx, cy + size * 1.1, cx + size, cy + size * 0.7, cx + size, cy + size * 0.3);
      ctx.bezierCurveTo(cx + size, cy, cx, cy, cx, cy + size * 0.3);
      ctx.closePath();
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      // Line from last point for continuous feel
      if (lastX && lastY) {
        ctx.lineWidth = brushSize * 1.6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      lastX = x;
      lastY = y;

      // Check progress occasionally
      if (Math.random() < 0.08) checkScratchProgress();
    }

    function checkScratchProgress() {
      try {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparent = 0;
        // Sample every 16th pixel for performance
        for (let i = 3; i < pixels.length; i += 64) {
          if (pixels[i] < 128) transparent++;
        }
        const totalSampled = pixels.length / 64;
        scratchedPercent = (transparent / totalSampled) * 100;
        if (scratchedPercent > 45) {
          // Reveal fully
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.style.pointerEvents = 'none';
          canvas.style.opacity = '0';
          canvas.style.transition = 'opacity 0.8s ease';
        }
      } catch (err) {
        // Cross-origin or other; ignore
      }
    }

    function start(e) {
      e.preventDefault();
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      scratch(pos.x, pos.y);
    }

    function move(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    }

    function end() {
      isDrawing = false;
      lastX = 0;
      lastY = 0;
      checkScratchProgress();
    }

    // Events
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);

    // Init size
    resizeCanvas();
    window.addEventListener('resize', () => {
      // Only redraw cover if not fully scratched
      if (canvas.style.opacity !== '0') {
        resizeCanvas();
      }
    });

    // Populate date under scratch
    const dateEl = document.querySelector('[data-wedding-date]');
    const yearEl = document.querySelector('[data-wedding-year]');
    if (cfg.weddingDate) {
      try {
        const d = new Date(cfg.weddingDate);
        if (!isNaN(d.getTime())) {
          const options = { day: 'numeric', month: 'long' };
          if (dateEl) dateEl.textContent = d.toLocaleDateString('en-IN', options);
          if (yearEl) yearEl.textContent = d.getFullYear();
        } else {
          if (dateEl) dateEl.textContent = 'Date TBA';
        }
      } catch {
        if (dateEl) dateEl.textContent = 'Date TBA';
      }
    } else {
      if (dateEl) dateEl.textContent = 'Date TBA';
    }
  }

  // ---------- Live Countdown ----------
  function setupCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    const placeholder = document.querySelector('.countdown-placeholder');

    if (!cfg.weddingDate) {
      if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.textContent = 'Wedding date will be announced soon. Countdown will activate once the date is set.';
      }
      return;
    }

    const target = new Date(cfg.weddingDate).getTime();
    if (isNaN(target)) {
      if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.textContent = 'Please set a valid wedding date in the configuration.';
      }
      return;
    }

    if (placeholder) placeholder.style.display = 'none';

    function update() {
      const now = Date.now();
      let diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * 1000 * 60 * 60;
      const mins = Math.floor(diff / (1000 * 60));
      diff -= mins * 1000 * 60;
      const secs = Math.floor(diff / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // ---------- Scroll Reveals ----------
  function setupScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  }

  // ---------- RSVP Form ----------
  function setupRSVP() {
    const form = document.getElementById('rsvpForm');
    const success = document.getElementById('rsvpSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value?.trim();
      const phone = form.querySelector('[name="phone"]')?.value?.trim();
      const guests = form.querySelector('[name="guests"]')?.value;
      const attendance = form.querySelector('[name="attendance"]:checked')?.value;

      if (!name || !phone || !attendance) {
        alert('Please fill in your name, mobile number, and attendance selection.');
        return;
      }

      // Basic phone validation
      const phoneClean = phone.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        alert('Please enter a valid mobile number.');
        return;
      }

      const whatsappNumber = cfg.rsvp?.whatsappNumber;
      const message = encodeURIComponent(
        `Wedding RSVP — ${coupleNames}\n\n` +
        `Name: ${name}\n` +
        `Mobile: ${phone}\n` +
        `Guests: ${guests || 1}\n` +
        `Attendance: ${attendance}\n\n` +
        `Sent from the digital invitation.`
      );

      if (whatsappNumber) {
        // Open WhatsApp with pre-filled message
        const waUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }

      // Show success regardless (honest about what happened)
      form.style.display = 'none';
      if (success) {
        success.classList.add('visible');
        const successDetail = success.querySelector('[data-rsvp-detail]');
        if (successDetail) {
          if (whatsappNumber) {
            successDetail.textContent = 'Your response has been prepared. Please complete sending it via WhatsApp.';
          } else {
            successDetail.textContent = 'Thank you! Please also inform the hosts directly as WhatsApp number is not yet configured.';
          }
        }
      }
    });
  }

  // ---------- Music ----------
  function setupMusic() {
    const btn = document.getElementById('musicToggle');
    const audio = document.getElementById('bgMusic');
    if (!btn || !audio) return;

    if (!cfg.music?.enabled || !cfg.music?.src) {
      btn.style.display = 'none';
      return;
    }

    audio.src = cfg.music.src;
    audio.loop = true;
    audio.volume = 0.35;

    let playing = false;

    btn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        btn.classList.remove('playing');
        btn.setAttribute('aria-label', 'Play music');
        btn.innerHTML = '♪';
      } else {
        audio.play().catch(() => {
          // Autoplay blocked; user interaction already happened so should work
        });
        btn.classList.add('playing');
        btn.setAttribute('aria-label', 'Pause music');
        btn.innerHTML = '❚❚';
      }
      playing = !playing;
    });
  }

  // ---------- Back to Top ----------
  function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Smooth section links ----------
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
})();
