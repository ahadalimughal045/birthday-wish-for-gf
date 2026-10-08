// ==========================================================
// ROMANTIC INTERACTIVE BIRTHDAY EXPERIENCE — SCRIPT
// Featuring Bubu & Dudu, Real Memories, Urdu Poetry & 12:00 AM Celebration
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initCanvasParticles();
    initAudioController();
    initCakeInteraction();
    initBubuDuduInteractions();
    initNicknameCloud();
    initWaxLoveLetter();
    initMemories();
    initLightbox();
    initNavigation();
    initWishButton();
    initCursorGlow();
});

// ----------------------------------------------------------
// 1. LOADING SCREEN
// ----------------------------------------------------------
function initLoader() {
    const loader = document.getElementById("loading-screen");
    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 1200);
}

// ----------------------------------------------------------
// 2. AUDIO CONTROLLER & WEB AUDIO SYNTHESIZER
// ----------------------------------------------------------
let audioCtx = null;
let isAudioPlaying = false;
let audioSynthInterval = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
}

// Magical Sparkle Chime Synth
function playSparkleSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

            gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
            gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.06 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.5);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + idx * 0.06);
            osc.stop(ctx.currentTime + idx * 0.06 + 0.55);
        });
    } catch (e) {}
}

// Sweet Harp Note for Nickname Clicks
function playHarpNote(pitchIndex = 0) {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const scale = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51];
        const freq = scale[pitchIndex % scale.length];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.75);
    } catch (e) {}
}

// Cake Slice Melody Chime
function playSliceSound(index = 0) {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const chordFrequencies = [
            [523.25, 659.25, 783.99], // C Major
            [587.33, 739.99, 880.00], // D Major
            [659.25, 830.61, 987.77], // E Major
            [698.46, 880.00, 1046.50] // F Major
        ];

        const chord = chordFrequencies[index % chordFrequencies.length];
        chord.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);

            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.05);
            gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + i * 0.05 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.6);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + i * 0.05);
            osc.stop(ctx.currentTime + i * 0.05 + 0.65);
        });
    } catch (e) {}
}

// Crisp Cake Slicing Knife Whoosh Synth
function playKnifeCutSound(isSecond = false) {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        const startFreq = isSecond ? 1174.66 : 1318.51; // D6 or E6
        const endFreq = isSecond ? 392.00 : 440.00;    // G4 or A4

        osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.18);

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.24);
    } catch (e) {}
}

// Romantic Background Music Box Synthesizer
function startRomanticSynthMelody() {
    if (audioSynthInterval) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const melody = [
        { f: 392.00, d: 0.5 }, { f: 392.00, d: 0.5 }, { f: 440.00, d: 1.0 }, { f: 392.00, d: 1.0 },
        { f: 523.25, d: 1.0 }, { f: 493.88, d: 2.0 }, { f: 392.00, d: 0.5 }, { f: 392.00, d: 0.5 },
        { f: 440.00, d: 1.0 }, { f: 392.00, d: 1.0 }, { f: 587.33, d: 1.0 }, { f: 523.25, d: 2.0 },
        { f: 392.00, d: 0.5 }, { f: 392.00, d: 0.5 }, { f: 783.99, d: 1.0 }, { f: 659.25, d: 1.0 },
        { f: 523.25, d: 1.0 }, { f: 493.88, d: 1.0 }, { f: 440.00, d: 1.5 }, { f: 698.46, d: 0.5 },
        { f: 698.46, d: 0.5 }, { f: 659.25, d: 1.0 }, { f: 523.25, d: 1.0 }, { f: 587.33, d: 1.0 },
        { f: 523.25, d: 2.5 }
    ];

    let noteIndex = 0;
    const playNextNote = () => {
        if (!isAudioPlaying) return;
        const note = melody[noteIndex];
        noteIndex = (noteIndex + 1) % melody.length;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(note.f, ctx.currentTime);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.d * 0.75);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + note.d * 0.8);
        } catch (e) {}

        audioSynthInterval = setTimeout(playNextNote, note.d * 750);
    };

    playNextNote();
}

function stopRomanticSynthMelody() {
    if (audioSynthInterval) {
        clearTimeout(audioSynthInterval);
        audioSynthInterval = null;
    }
}

function initAudioController() {
    const audioEl = document.getElementById("birthday-audio");
    const toggleBtn = document.getElementById("music-toggle-btn");
    const musicIcon = document.getElementById("music-icon");

    if (audioEl) {
        audioEl.src = "assets/birthday-music.mp3";
        audioEl.volume = 0.35;
    }

    const startAudio = () => {
        isAudioPlaying = true;
        toggleBtn.classList.add("playing");
        musicIcon.textContent = "💖";

        if (audioEl && audioEl.src) {
            audioEl.play().catch(() => {
                startRomanticSynthMelody();
            });
        } else {
            startRomanticSynthMelody();
        }
    };

    const pauseAudio = () => {
        isAudioPlaying = false;
        toggleBtn.classList.remove("playing");
        musicIcon.textContent = "🎵";

        if (audioEl) audioEl.pause();
        stopRomanticSynthMelody();
    };

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            getAudioContext();
            if (isAudioPlaying) {
                pauseAudio();
            } else {
                startAudio();
            }
        });
    }

    // Export trigger for cake click
    window.triggerBirthdayAudio = () => {
        if (!isAudioPlaying) {
            startAudio();
        }
    };
}

// ----------------------------------------------------------
// 3. PARTICLES & CONFETTI ENGINE (CANVAS)
// ----------------------------------------------------------
let canvas, ctx;
let particles = [];
let confettiParticles = [];
let canvasWidth, canvasHeight;
let isMobileDevice = false;

function initCanvasParticles() {
    canvas = document.getElementById("magic-canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");

    isMobileDevice = window.innerWidth <= 768;

    const resizeCanvas = () => {
        canvasWidth = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;
        isMobileDevice = window.innerWidth <= 768;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Populate ambient particles
    const particleCount = isMobileDevice ? 25 : 60;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(createAmbientParticle(true));
    }

    requestAnimationFrame(renderParticlesLoop);
}

function createAmbientParticle(randomY = false) {
    const types = ["heart", "star", "circle"];
    const colors = [
        "rgba(255, 117, 140, ", // Rose Pink
        "rgba(255, 182, 193, ", // Light Pink
        "rgba(255, 209, 220, ", // Pastel Pink
        "rgba(255, 230, 160, ", // Soft Gold
        "rgba(220, 180, 240, "  // Lavender
    ];

    return {
        x: Math.random() * (canvasWidth || window.innerWidth),
        y: randomY ? Math.random() * (canvasHeight || window.innerHeight) : (canvasHeight || window.innerHeight) + 20,
        size: Math.random() * 8 + 4,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.5,
        type: types[Math.floor(Math.random() * types.length)],
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01
    };
}

// Burst confetti and hearts
function spawnConfettiBurst(originX, originY, count = 75) {
    const colors = ["#ff758c", "#ff7eb3", "#ffd166", "#ffffff", "#ff8da1", "#d94b68", "#c8b6ff", "#ffd700"];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 4;
        confettiParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 4,
            size: Math.random() * 9 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            gravity: 0.18,
            friction: 0.96,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.25,
            isHeart: Math.random() > 0.4
        });
    }
}

function drawHeart(c, x, y, size, fill) {
    c.save();
    c.translate(x, y);
    c.beginPath();
    const topCurveHeight = size * 0.3;
    c.moveTo(0, topCurveHeight);
    c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
    c.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    c.fillStyle = fill;
    c.fill();
    c.restore();
}

function drawStar(c, x, y, r, fill) {
    c.save();
    c.translate(x, y);
    c.beginPath();
    for (let i = 0; i < 4; i++) {
        const angle = i * Math.PI / 2;
        c.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        c.lineTo(Math.cos(angle + Math.PI / 4) * (r * 0.3), Math.sin(angle + Math.PI / 4) * (r * 0.3));
    }
    c.closePath();
    c.fillStyle = fill;
    c.fill();
    c.restore();
}

function renderParticlesLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 1. Ambient Background Particles
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.4;
        p.rotation += p.rotSpeed;

        if (p.y < -30 || p.x < -30 || p.x > canvasWidth + 30) {
            particles[i] = createAmbientParticle(false);
            continue;
        }

        const color = `${p.colorBase}${p.alpha})`;
        if (p.type === "heart") {
            drawHeart(ctx, p.x, p.y, p.size, color);
        } else if (p.type === "star") {
            drawStar(ctx, p.x, p.y, p.size * 0.7, color);
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    // 2. Interactive Confetti Burst Particles
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
        const cp = confettiParticles[i];
        cp.x += cp.vx;
        cp.y += cp.vy;
        cp.vy += cp.gravity;
        cp.vx *= cp.friction;
        cp.vy *= cp.friction;
        cp.rotation += cp.rotSpeed;
        cp.alpha -= 0.012;

        if (cp.alpha <= 0 || cp.y > canvasHeight + 50) {
            confettiParticles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, cp.alpha);
        if (cp.isHeart) {
            drawHeart(ctx, cp.x, cp.y, cp.size, cp.color);
        } else {
            ctx.translate(cp.x, cp.y);
            ctx.rotate(cp.rotation);
            ctx.fillStyle = cp.color;
            ctx.fillRect(-cp.size / 2, -cp.size / 2, cp.size, cp.size * 0.6);
        }
        ctx.restore();
    }

    requestAnimationFrame(renderParticlesLoop);
}

// ----------------------------------------------------------
// 4. CAKE INTERACTION & BUBU CUTTING ANIMATION FLOW
// ----------------------------------------------------------
let isCakeCelebrated = false;

function initCakeInteraction() {
    const cakeBtn = document.getElementById("cake-main-btn");
    const cakeHint = document.getElementById("cake-hint");
    const banner = document.getElementById("birthday-banner");
    const bubuChar = document.getElementById("bubu-character");
    const duduChar = document.getElementById("dudu-character");
    const bubuBubble = document.getElementById("bubu-bubble");
    const duduBubble = document.getElementById("dudu-bubble");
    const candle = document.getElementById("cake-candle");
    const splitGrid = document.getElementById("split-cake-grid");
    const bubuDuduHug = document.getElementById("bubu-dudu-hug");
    const scrollPrompt = document.getElementById("scroll-prompt");
    const cutSlashV = document.getElementById("cut-slash-v");
    const cutSlashH = document.getElementById("cut-slash-h");

    if (!cakeBtn) return;

    const triggerCakeCelebration = () => {
        if (isCakeCelebrated) return;
        isCakeCelebrated = true;

        // Sound & hint update
        playSparkleSound();
        if (cakeHint) cakeHint.classList.add("hidden");

        const rect = cakeBtn.getBoundingClientRect();
        const cakeCenterX = rect.left + rect.width / 2;
        const cakeCenterY = rect.top + rect.height / 2;

        // 1. BUBU pulls out knife and starts moving towards the cake!
        if (bubuChar) {
            bubuChar.classList.add("cutting-active");
            bubuChar.classList.add("bubu-approach-cake");
        }
        if (bubuBubble) {
            bubuBubble.textContent = "Wait Jaan! Bubu is cutting the cake for you! 🎂🔪💖";
        }
        if (duduChar) {
            duduChar.classList.add("cheering");
        }
        if (duduBubble) {
            duduBubble.textContent = "Go Bubu! Happy Birthday Jaan! 🥳✨";
        }

        // 2. STEP 1: First Vertical Slice Cut (at 900ms)
        setTimeout(() => {
            playKnifeCutSound(false);
            if (cutSlashV) cutSlashV.classList.add("active");
            spawnConfettiBurst(cakeCenterX, cakeCenterY - 20, 20);
            if (bubuBubble) bubuBubble.textContent = "Slice 1 & 2 for my Shehzadi... 💖";
        }, 900);

        // 3. STEP 2: Second Horizontal Cross Cut (at 1500ms)
        setTimeout(() => {
            playKnifeCutSound(true);
            if (cutSlashH) cutSlashH.classList.add("active");
            spawnConfettiBurst(cakeCenterX, cakeCenterY + 15, 25);
            if (bubuBubble) bubuBubble.textContent = "Slice 3 & 4 with all my love! 🤤💘";
        }, 1500);

        // 4. STEP 3: Extinguish Birthday Candle (at 1900ms)
        setTimeout(() => {
            if (candle) candle.classList.add("candle-blown");
            playSparkleSound();
            spawnConfettiBurst(cakeCenterX, cakeCenterY - 40, 15);
        }, 1900);

        // 5. STEP 4: Grand Reveal, Split into 4 Slices & Celebration (at 2400ms)
        setTimeout(() => {
            // Background music & celebration sound
            if (window.triggerBirthdayAudio) {
                window.triggerBirthdayAudio();
            }
            playSliceSound(0);

            // Bubu & Dudu joy celebration
            if (bubuChar) {
                bubuChar.classList.remove("bubu-approach-cake");
                bubuChar.classList.remove("cutting-active");
                bubuChar.classList.add("celebrating");
            }
            if (bubuBubble) {
                bubuBubble.textContent = "Ta-daaa! 4 sweet slices for my Jaan! 🤤💘✨";
            }
            if (duduChar) {
                duduChar.classList.remove("cheering");
                duduChar.classList.add("celebrating");
            }
            if (duduBubble) {
                duduBubble.textContent = "Yaaay! Happy Birthday! 🎉💖";
            }

            // Reveal banner
            if (banner) banner.classList.remove("hidden");

            // Hide intact cake and reveal 4 slices
            cakeBtn.style.opacity = "0";
            cakeBtn.style.pointerEvents = "none";
            cakeBtn.style.display = "none";

            if (splitGrid) {
                splitGrid.classList.remove("hidden");
            }
            if (bubuDuduHug) {
                bubuDuduHug.classList.remove("hidden");
            }
            if (scrollPrompt) {
                scrollPrompt.classList.remove("hidden");
            }

            // Big Celebration Confetti Explosion!
            spawnConfettiBurst(cakeCenterX, cakeCenterY, isMobileDevice ? 70 : 120);
            setTimeout(() => {
                spawnConfettiBurst(cakeCenterX, cakeCenterY, 40);
            }, 350);
        }, 2400);
    };

    cakeBtn.addEventListener("click", triggerCakeCelebration);
    if (cakeHint) {
        cakeHint.addEventListener("click", triggerCakeCelebration);
    }

    // Make Cake Slices Clickable to Scroll into Memory Sections
    const pieceCards = document.querySelectorAll(".realistic-cake-slice, .cake-piece-card");
    pieceCards.forEach((card, idx) => {
        card.addEventListener("click", () => {
            playSliceSound(idx);
            const rect = card.getBoundingClientRect();
            spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
            const targetId = card.getAttribute("data-chapter");
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

// ----------------------------------------------------------
// 5. INTERACTIVE BUBU & DUDU CHARACTER CLICKS
// ----------------------------------------------------------
function initBubuDuduInteractions() {
    const bubu = document.getElementById("bubu-character");
    const dudu = document.getElementById("dudu-character");
    const bubuBubble = document.getElementById("bubu-bubble");
    const duduBubble = document.getElementById("dudu-bubble");

    const bubuPhrases = [
        "Love you so much baby! 💖",
        "You're my entire universe! 👑",
        "12:00 AM celebration time! 🥳",
        "Forever & always yours! 💍"
    ];

    const duduPhrases = [
        "Happy Birthday Jaan! 🎂✨",
        "You are Bubu's favourite! 💖",
        "Sending million hugs! 🫂🌸",
        "My sweetest strawberry! 🍓"
    ];

    let bIdx = 0;
    let dIdx = 0;

    if (bubu) {
        bubu.addEventListener("click", () => {
            playSparkleSound();
            const rect = bubu.getBoundingClientRect();
            spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
            bIdx = (bIdx + 1) % bubuPhrases.length;
            if (bubuBubble) bubuBubble.textContent = bubuPhrases[bIdx];
            bubu.classList.add("celebrating");
        });
    }

    if (dudu) {
        dudu.addEventListener("click", () => {
            playSparkleSound();
            const rect = dudu.getBoundingClientRect();
            spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
            dIdx = (dIdx + 1) % duduPhrases.length;
            if (duduBubble) duduBubble.textContent = duduPhrases[dIdx];
            dudu.classList.add("celebrating");
        });
    }
}

// ----------------------------------------------------------
// 6. NICKNAMES CLOUD (25 ROMANTIC TITLES) INTERACTION
// ----------------------------------------------------------
function initNicknameCloud() {
    const pills = document.querySelectorAll(".nickname-pill");
    pills.forEach((pill, idx) => {
        pill.addEventListener("click", () => {
            playHarpNote(idx);
            const rect = pill.getBoundingClientRect();
            spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
            pill.style.transform = "scale(1.15) translateY(-5px)";
            setTimeout(() => {
                pill.style.transform = "";
            }, 300);
        });
    });
}

// ----------------------------------------------------------
// 7. 3D WAX-SEALED LOVE LETTER ENVELOPE
// ----------------------------------------------------------
function initWaxLoveLetter() {
    const envCard = document.getElementById("envelope-card");
    const letterSheet = document.getElementById("letter-sheet");

    if (!envCard || !letterSheet) return;

    envCard.addEventListener("click", () => {
        playSparkleSound();
        const rect = envCard.getBoundingClientRect();
        spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);

        envCard.classList.add("opened");
        setTimeout(() => {
            letterSheet.classList.remove("hidden");
            letterSheet.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 500);
    });
}

// ----------------------------------------------------------
// 8. MEMORY SECTIONS & SCROLL OBSERVER
// ----------------------------------------------------------
function initMemories() {
    const memorySections = document.querySelectorAll(".memory-section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    });

    memorySections.forEach(section => observer.observe(section));

    // Memory Reaction Heart Buttons
    const heartBtns = document.querySelectorAll(".memory-heart-btn");
    heartBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            playSparkleSound();
            const counter = btn.querySelector(".btn-heart-counter");
            if (counter) {
                const count = parseInt(counter.textContent || "1", 10) + 1;
                counter.textContent = count;
            }

            const rect = btn.getBoundingClientRect();
            spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
        });
    });
}

// ----------------------------------------------------------
// 9. PHOTO LIGHTBOX MODAL
// ----------------------------------------------------------
function initLightbox() {
    const modal = document.getElementById("photo-lightbox");
    const modalImg = document.getElementById("lightbox-img");
    const modalCaption = document.getElementById("lightbox-caption");
    const backdrop = document.getElementById("lightbox-backdrop");
    const closeBtn = document.getElementById("lightbox-close");

    if (!modal) return;

    const triggers = document.querySelectorAll(".photo-trigger");
    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const photoSrc = trigger.getAttribute("data-photo");
            const captionText = trigger.getAttribute("data-caption");

            if (modalImg) modalImg.src = photoSrc;
            if (modalCaption) modalCaption.textContent = captionText || "";

            modal.classList.remove("hidden");
            playSparkleSound();
        });
    });

    const closeModal = () => {
        modal.classList.add("hidden");
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}

// ----------------------------------------------------------
// 10. DESKTOP SIDE NAVIGATION & SCROLL TRACKING
// ----------------------------------------------------------
function initNavigation() {
    const navDots = document.querySelectorAll(".nav-dot");
    const sections = document.querySelectorAll(".scene-section");

    navDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const targetId = dot.getAttribute("data-target");
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navDots.forEach(dot => {
                    if (dot.getAttribute("data-target") === id) {
                        dot.classList.add("active");
                    } else {
                        dot.classList.remove("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.35
    });

    sections.forEach(sec => navObserver.observe(sec));
}

// ----------------------------------------------------------
// 11. FINAL SCENE WISH & REPLAY BUTTONS
// ----------------------------------------------------------
function initWishButton() {
    const wishBtn = document.getElementById("make-wish-btn");
    const wishToast = document.getElementById("wish-toast");
    const backTopBtn = document.getElementById("back-to-top-btn");

    if (wishBtn) {
        wishBtn.addEventListener("click", () => {
            playSparkleSound();
            const rect = wishBtn.getBoundingClientRect();
            spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 80);

            if (wishToast) {
                wishToast.classList.remove("hidden");
            }
        });
    }

    if (backTopBtn) {
        backTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

// ----------------------------------------------------------
// 12. CUSTOM DESKTOP CURSOR GLOW
// ----------------------------------------------------------
function initCursorGlow() {
    const cursor = document.getElementById("cursor-glow");
    if (!cursor || window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = "1";
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
}
