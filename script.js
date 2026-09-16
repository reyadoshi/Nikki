/**
 * Nikhitha's Birthday Scrapbook (Chellama 🎀)
 * Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initAkkaChaos();
  initGiftBox();
  initStickyNotes();
  initFinaleModal();
  initSprinkleHearts();
  initAutoImageDetect();
});

/* ==========================================================================
   1. SCREEN 0: PLAYFUL SCRAPBOOK LOADER
   ========================================================================== */
function initLoader() {
  const loaderScreen = document.getElementById('screen-loader');
  const loaderStatus = document.getElementById('loader-status');
  const loaderProgress = document.getElementById('loader-progress');
  const detectionBadge = document.getElementById('detection-badge');
  const mainContent = document.getElementById('main-content');

  const steps = [
    { text: 'loading...', progress: 15, delay: 900 },
    { text: 'finding Nikhitha...', progress: 35, delay: 1000 },
    { text: 'finding birthday nonsense...', progress: 55, delay: 1000 },
    { text: 'checking friendship history...', progress: 75, delay: 1100 },
    { text: 'starting from 23rd July...', progress: 90, delay: 1100 },
    { text: 'okay found her.', progress: 100, delay: 900 }
  ];

  let currentStep = 0;

  function runNextStep() {
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      loaderStatus.textContent = step.text;
      loaderProgress.style.width = `${step.progress}%`;

      if (currentStep === steps.length - 1) {
        // Show "Chellama detected 🎀"
        setTimeout(() => {
          detectionBadge.classList.remove('hidden');
          // Confetti burst for loader completion
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 25,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#FFCAD4', '#FFE5D9', '#D88392']
            });
          }
        }, 300);

        // Transition out
        setTimeout(() => {
          loaderScreen.classList.add('fade-out');
          mainContent.classList.remove('hidden');
          setTimeout(() => {
            loaderScreen.remove();
          }, 800);
        }, 2100);
      } else {
        currentStep++;
        setTimeout(runNextStep, step.delay);
      }
    }
  }

  runNextStep();
}

/* ==========================================================================
   2. SCREEN 5: THE AKKA INCIDENT & CHAOS BUTTON
   ========================================================================== */
function initAkkaChaos() {
  const akkaBtn = document.getElementById('akka-chaos-btn');
  const akkaWord = document.getElementById('the-akka-word');
  const akkaCounter = document.getElementById('akka-counter');
  const akkaPlayground = document.getElementById('akka-playground');

  if (!akkaBtn || !akkaWord) return;

  let clickCount = 0;
  const akkaVariations = [
    'AKKA',
    'AKKAAA!',
    'AKKAAAAA 😭',
    'WHY ARE YOU LIKE THIS',
    'STOP CALLING ME AKKA 💀',
    'OKAY FINE 😭❤️'
  ];

  akkaBtn.addEventListener('click', (e) => {
    clickCount++;
    akkaCounter.textContent = `clicks: ${clickCount}`;

    // Shake screen slightly
    document.body.classList.remove('screen-shake');
    void document.body.offsetWidth; // trigger reflow
    document.body.classList.add('screen-shake');

    // Update main AKKA word
    const textIndex = Math.min(clickCount - 1, akkaVariations.length - 1);
    akkaWord.textContent = akkaVariations[textIndex];

    // Scale up the word
    const currentScale = 1 + Math.min(clickCount * 0.08, 0.6);
    const randomRotate = (Math.random() * 12 - 6).toFixed(1);
    akkaWord.style.transform = `scale(${currentScale}) rotate(${randomRotate}deg)`;

    // Spawn floating AKKA sticker stamps
    spawnAkkaStamp(akkaPlayground, e.clientX, e.clientY);

    // Mini confetti on big milestone
    if (clickCount % 4 === 0 && typeof confetti === 'function') {
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#C0392B', '#FFCAD4', '#FFE5D9']
      });
    }
  });
}

function spawnAkkaStamp(container, mouseX, mouseY) {
  const stamp = document.createElement('div');
  stamp.className = 'floating-akka-stamp';
  const stampsList = ['AKKA!', 'AKKAAA 🎀', 'CHELLAMA 😭', 'WHY', 'ONLY JUNIOR', 'AKKAAAA'];
  stamp.textContent = stampsList[Math.floor(Math.random() * stampsList.length)];

  // Random position within playground
  const rect = container.getBoundingClientRect();
  const left = Math.floor(Math.random() * (rect.width - 120)) + 20;
  const top = Math.floor(Math.random() * (rect.height - 80)) + 40;

  const rot = `${(Math.random() * 40 - 20).toFixed(1)}deg`;
  stamp.style.setProperty('--rot', rot);
  stamp.style.left = `${left}px`;
  stamp.style.top = `${top}px`;

  container.appendChild(stamp);

  setTimeout(() => {
    stamp.remove();
  }, 2600);
}

/* ==========================================================================
   3. SCREEN 7: RANDOM GIFTS INTERACTION
   ========================================================================== */
function initGiftBox() {
  const gift = document.getElementById('interactive-gift');
  const revealCard = document.getElementById('gift-reveal-card');

  if (!gift || !revealCard) return;

  function triggerOpen() {
    if (!gift.classList.contains('opened')) {
      gift.classList.add('opened');
      revealCard.classList.remove('hidden');

      if (typeof confetti === 'function') {
        const rect = gift.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 40,
          spread: 80,
          origin: { x, y },
          colors: ['#FFCAD4', '#FFE5D9', '#D88392', '#E8E0F0']
        });
      }
    } else {
      // Toggle back to closed for fun replayability
      gift.classList.remove('opened');
      revealCard.classList.add('hidden');
    }
  }

  gift.addEventListener('click', triggerOpen);
  gift.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerOpen();
    }
  });
}

/* ==========================================================================
   4. SCREEN 13: STICKY CORKBOARD NOTES
   ========================================================================== */
function initStickyNotes() {
  const notes = document.querySelectorAll('.scrapbook-sticky');

  notes.forEach((note) => {
    function toggleNote() {
      note.classList.toggle('revealed');
      // Gentle bounce
      note.style.transform = note.classList.contains('revealed') 
        ? 'scale(1.06) rotate(0deg)' 
        : '';
    }

    note.addEventListener('click', toggleNote);
    note.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNote();
      }
    });
  });
}

/* ==========================================================================
   5. FINAL SCREEN & CELEBRATION MODAL OVERLAY
   ========================================================================== */
function initFinaleModal() {
  const byeBtn = document.getElementById('final-bye-btn');
  const modalOverlay = document.getElementById('final-modal-overlay');
  const step1 = document.getElementById('modal-step-1');
  const step2 = document.getElementById('modal-step-2');
  const step3 = document.getElementById('modal-step-3');
  const step4 = document.getElementById('modal-step-4');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!byeBtn || !modalOverlay) return;

  byeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');

    // Massive colorful confetti blast!
    launchConfettiCannons();

    // Reset step visibility
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');
    step4.classList.add('hidden');

    // Paced dramatic punchline progression
    setTimeout(() => {
      // Step 2: "AKKA LOVES YOUUU 😭🫶"
      step1.classList.add('hidden');
      step2.classList.remove('hidden');

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#D88392', '#FFCAD4', '#FFFDF9']
        });
      }
    }, 1800);

    setTimeout(() => {
      // Step 3: "ew no delete that."
      step2.classList.add('hidden');
      step3.classList.remove('hidden');
    }, 3800);

    setTimeout(() => {
      // Step 4: "Happy Birthday Chellama 🎀"
      step3.classList.add('hidden');
      step4.classList.remove('hidden');
      launchConfettiCannons();
    }, 5500);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.add('hidden');
    });
  }

  // Click outside modal card to dismiss
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay && !step4.classList.contains('hidden')) {
      modalOverlay.classList.add('hidden');
    }
  });
}

function launchConfettiCannons() {
  if (typeof confetti !== 'function') return;

  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001 };

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    // confetti from left and right edges
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/* ==========================================================================
   6. SPRINKLE HEARTS & FLOATING PARTICLES
   ========================================================================== */
function initSprinkleHearts() {
  const sprinkleBtn = document.getElementById('floating-hearts-btn');
  const container = document.getElementById('ambient-decorations');

  const icons = ['🎀', '🌸', '✨', '🤍', '🧸', '🍰', '💌'];

  function createHeart(x, y) {
    const el = document.createElement('div');
    el.className = 'floating-heart-particle';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    container.appendChild(el);

    setTimeout(() => el.remove(), 2800);
  }

  if (sprinkleBtn) {
    sprinkleBtn.addEventListener('click', (e) => {
      const rect = sprinkleBtn.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const offsetX = (Math.random() * 100 - 50);
          const offsetY = (Math.random() * 40 - 20);
          createHeart(rect.left + offsetX, rect.top + offsetY);
        }, i * 70);
      }
    });
  }

  // Click anywhere on sheets can occasionally spawn a soft sparkle
  document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.scrapbook-sticky')) return;
    if (Math.random() < 0.2) {
      createHeart(e.clientX - 12, e.clientY - 12);
    }
  });
}

/* ==========================================================================
   7. AUTO IMAGE DETECT & FALLBACK
   ========================================================================== */
function initAutoImageDetect() {
  const imageMap = [
    { 
      selector: '.chat-screenshots-grid .chat-frame:nth-child(1) img', 
      candidates: ['assets/images/chat1.jpeg', 'assets/images/chat1.jpg', 'assets/images/chat1.png', 'chat1.jpeg'] 
    },
    { 
      selector: '.chat-screenshots-grid .chat-frame:nth-child(2) img', 
      candidates: ['assets/images/chat2.jpeg', 'assets/images/chat2.jpg', 'assets/images/chat2.png', 'chat2.jpeg'] 
    },
    { 
      selector: '.chat-screenshots-grid .chat-frame:nth-child(3) img', 
      candidates: ['assets/images/chat3.jpeg', 'assets/images/chat3.jpg', 'assets/images/chat3.png', 'chat3.jpeg'] 
    },
    { 
      selector: '#screen-9 .polaroid-img', 
      candidates: ['assets/images/photo1.jpeg', 'assets/images/photo1.jpg', 'assets/images/photo1.png', '1.jpeg'] 
    },
    { 
      selector: '#screen-10 .polaroid-img', 
      candidates: ['assets/images/photo2.jpeg', 'assets/images/photo2.jpg', 'assets/images/photo2.png', '2.jpeg'] 
    }
  ];

  imageMap.forEach(item => {
    const imgEl = document.querySelector(item.selector);
    if (!imgEl) return;

    item.candidates.forEach(src => {
      const testImg = new Image();
      testImg.onload = () => {
        imgEl.src = src;
      };
      testImg.src = src;
    });
  });
}
