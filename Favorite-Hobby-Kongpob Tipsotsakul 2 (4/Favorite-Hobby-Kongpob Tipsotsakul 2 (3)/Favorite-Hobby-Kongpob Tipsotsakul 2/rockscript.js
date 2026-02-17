/* =============================================
   ROCK PAGE - Enhanced Interactive JavaScript
   with Easter Eggs & UX Improvements
   ============================================= */

   document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. LOADING SCREEN
    // =========================================
    const loadingScreen = document.querySelector('.rock-loading-screen');
    const loadingBar = document.querySelector('.rock-loading-bar');
    const loadingPercent = document.querySelector('.rock-loading-percent');

    if (loadingScreen) {
        let progress = 0;
        document.body.style.overflow = 'hidden';

        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingScreen.classList.add('loaded');
                    document.body.style.overflow = '';
                }, 400);
            }
            if (loadingBar) loadingBar.style.width = progress + '%';
            if (loadingPercent) loadingPercent.textContent = Math.floor(progress) + '%';
        }, 150);
    }

    // =========================================
    // 2. SCROLL PROGRESS BAR
    // =========================================
    const scrollProgress = document.querySelector('.rock-scroll-progress');

    function updateScrollProgress() {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // =========================================
    // 3. CURSOR GLOW (Desktop only)
    // =========================================
    const cursorGlow = document.querySelector('.rock-cursor-glow');

    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }

    // =========================================
    // 4. SCROLL REVEAL ANIMATIONS
    // =========================================
    const revealElements = document.querySelectorAll('.rock-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('rock-revealed');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // =========================================
    // 5. THEME SWITCHER
    // =========================================
    const themeSelector = document.getElementById('theme-selector');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('rock-theme') || 'ultra-dark';

    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
    } else if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
    } else {
        htmlElement.removeAttribute('data-theme');
    }
    if (themeSelector) themeSelector.value = savedTheme;

    if (themeSelector) {
        themeSelector.addEventListener('change', (e) => {
            const theme = e.target.value;
            if (theme === 'dark') {
                htmlElement.setAttribute('data-theme', 'dark');
            } else if (theme === 'light') {
                htmlElement.setAttribute('data-theme', 'light');
            } else {
                htmlElement.removeAttribute('data-theme');
            }
            localStorage.setItem('rock-theme', theme);

            document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
            setTimeout(() => { document.body.style.transition = ''; }, 500);
        });
    }

    // =========================================
    // 6. CAROUSEL (Enhanced)
    // =========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let carouselTimer = null;

    function showSlide(n) {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function startCarousel() {
        carouselTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    function resetCarousel() {
        clearInterval(carouselTimer);
        startCarousel();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetCarousel();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetCarousel();
        });
    }

    if (slides.length > 0) startCarousel();

    // =========================================
    // 7. BACK TO TOP BUTTON
    // =========================================
    const backToTop = document.getElementById('back-to-top');

    function updateBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
            backToTop.removeAttribute('hidden');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================
    // 8. SMOOTH SCROLL FOR NAV
    // =========================================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                const offset = 20;
                const pos = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: pos - offset, behavior: 'smooth' });
            }
        });
    });

    // =========================================
    // 9. PARALLAX HEADER
    // =========================================
    const header = document.querySelector('header');

    function updateParallax() {
        if (!header) return;
        const scrolled = window.scrollY;
        if (scrolled < header.offsetHeight) {
            header.style.backgroundPositionY = scrolled * 0.3 + 'px';
        }
    }

    // =========================================
    // 10. HOVER SOUND ON NAV
    // =========================================
    let audioCtx = null;

    function playHoverSound(freq) {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) { return; }
        }
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = freq || 600;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.12);
        } catch (e) {}
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('mouseenter', () => playHoverSound(600));
    });

    document.querySelectorAll('.band-card').forEach(card => {
        card.addEventListener('mouseenter', () => playHoverSound(800));
    });

    // =========================================
    // 11. CONSOLIDATED SCROLL HANDLER
    // =========================================
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateBackToTop();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();
    updateBackToTop();

    // =========================================
    // 12. EASTER EGG COUNTER SYSTEM
    // =========================================
    const eggCounter = document.querySelector('.rock-egg-counter');
    const eggCounterText = document.querySelector('.rock-egg-counter-text');
    const totalEggs = 5;
    let foundEggs = new Set(JSON.parse(localStorage.getItem('rock-found-eggs') || '[]'));

    function updateEggCounter(eggName) {
        foundEggs.add(eggName);
        localStorage.setItem('rock-found-eggs', JSON.stringify([...foundEggs]));
        if (eggCounter && eggCounterText) {
            eggCounterText.textContent = foundEggs.size + '/' + totalEggs;
            eggCounter.classList.add('visible');
            eggCounter.classList.remove('pulse');
            void eggCounter.offsetWidth;
            eggCounter.classList.add('pulse');

            if (foundEggs.size === totalEggs) {
                eggCounterText.textContent = '5/5 ★';
                eggCounterText.style.color = '#FFB703';
            }
        }
    }

    if (foundEggs.size > 0 && eggCounter && eggCounterText) {
        eggCounterText.textContent = foundEggs.size + '/' + totalEggs;
        eggCounter.classList.add('visible');
        if (foundEggs.size === totalEggs) {
            eggCounterText.textContent = '5/5 ★';
            eggCounterText.style.color = '#FFB703';
        }
    }

    // Helper: check if input is focused
    function isTypingInInput() {
        const a = document.activeElement;
        return a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.tagName === 'SELECT');
    }

    // =========================================
    // 13. RIFF EASTER EGG — Type "riff"
    // =========================================
    const riffCode = ['r', 'i', 'f', 'f'];
    let riffIndex = 0;
    let riffActive = false;

    function playRiffSound() {
        let ctx;
        try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
        catch (e) { return; }
        const now = ctx.currentTime;

        // Power chord riff — E5, A5, D5
        const chords = [
            { freq: 82.41, start: 0 },
            { freq: 110, start: 0.25 },
            { freq: 146.83, start: 0.5 },
            { freq: 110, start: 0.75 },
            { freq: 82.41, start: 1.0 }
        ];

        chords.forEach(chord => {
            // Root
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const dist = ctx.createWaveShaper();
            const curve = new Float32Array(44100);
            for (let i = 0; i < 44100; i++) {
                const x = (i * 2) / 44100 - 1;
                curve[i] = (Math.PI + 100) * x / (Math.PI + 100 * Math.abs(x));
            }
            dist.curve = curve;
            osc.connect(dist);
            dist.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.value = chord.freq;
            const t = now + chord.start;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.08, t + 0.03);
            gain.gain.setValueAtTime(0.08, t + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            osc.start(t);
            osc.stop(t + 0.4);

            // Fifth
            const osc5 = ctx.createOscillator();
            const gain5 = ctx.createGain();
            osc5.connect(dist);
            osc5.type = 'sawtooth';
            osc5.frequency.value = chord.freq * 1.5;
            gain5.gain.setValueAtTime(0.04, t);
            gain5.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
            osc5.start(t);
            osc5.stop(t + 0.35);
        });
    }

    const riffMessages = [
        { icon: '🎸', title: 'POWER RIFF', subtitle: 'UNLEASHED', desc: 'The almighty power chord. Three notes that changed the world. E5-A5-D5. Feel the distortion in your bones.' },
        { icon: '🔥', title: 'FACE MELTER', subtitle: 'ACTIVATED', desc: 'That riff so heavy it registered on the Richter scale. Jimmy Page would be proud. Maybe.' },
        { icon: '⚡', title: 'THUNDERSTRUCK', subtitle: 'RIFF MODE ON', desc: 'You just summoned the spirit of every power chord ever played. The amp goes to 11.' }
    ];

    function activateRiffEasterEgg() {
        if (riffActive) return;
        riffActive = true;
        updateEggCounter('Riff');

        const msg = riffMessages[Math.floor(Math.random() * riffMessages.length)];
        playRiffSound();

        const overlay = document.createElement('div');
        overlay.className = 'riff-overlay';

        let barsHTML = '';
        for (let i = 0; i < 20; i++) {
            const delay = (Math.random() * 0.5).toFixed(2);
            const dur = (0.4 + Math.random() * 0.6).toFixed(2);
            barsHTML += `<div class="riff-bar" style="animation-delay:${delay}s; animation-duration:${dur}s;"></div>`;
        }

        overlay.innerHTML = `
            <div class="riff-card">
                <div class="riff-icon">${msg.icon}</div>
                <div class="riff-title">${msg.title}</div>
                <div class="riff-subtitle">${msg.subtitle}</div>
                <div class="riff-desc">${msg.desc}</div>
                <div class="riff-bars">${barsHTML}</div>
                <div class="riff-close"><span>CLICK</span> or <span>ESC</span> to close</div>
            </div>
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            setTimeout(() => overlay.querySelector('.riff-card').classList.add('revealed'), 100);
        });

        let autoTimer = setTimeout(() => closeRiff(), 10000);

        function closeRiff() {
            clearTimeout(autoTimer);
            const card = overlay.querySelector('.riff-card');
            if (card) card.classList.add('dismissed');
            overlay.classList.remove('active');
            setTimeout(() => { overlay.remove(); riffActive = false; }, 400);
        }

        overlay.addEventListener('click', closeRiff);

        function handleKey(e) {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                closeRiff();
                document.removeEventListener('keydown', handleKey);
            }
        }
        document.addEventListener('keydown', handleKey);
    }

    document.addEventListener('keydown', (e) => {
        if (riffActive || isTypingInInput()) return;
        if (e.key.toLowerCase() === riffCode[riffIndex]) {
            riffIndex++;
            if (riffIndex === riffCode.length) { riffIndex = 0; activateRiffEasterEgg(); }
        } else {
            riffIndex = 0;
            if (e.key.toLowerCase() === riffCode[0]) riffIndex = 1;
        }
    });

    // =========================================
    // 14. VINYL EASTER EGG — Type "vinyl"
    // =========================================
    const vinylCode = ['v', 'i', 'n', 'y', 'l'];
    let vinylIndex = 0;
    let vinylActive = false;

    const vinylSongs = [
        { title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
        { title: 'Hotel California', artist: 'Eagles' },
        { title: 'Bohemian Rhapsody', artist: 'Queen' },
        { title: 'Comfortably Numb', artist: 'Pink Floyd' },
        { title: 'Rock You Like a Hurricane', artist: 'Scorpions' },
        { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses' },
        { title: 'Born to Be Wild', artist: 'Steppenwolf' },
        { title: 'Layla', artist: 'Eric Clapton' }
    ];

    function playVinylCrackle() {
        let ctx;
        try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
        catch (e) { return; }
        const now = ctx.currentTime;

        // Vinyl crackle noise
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() > 0.997 ? (Math.random() * 2 - 1) * 0.3 : (Math.random() * 2 - 1) * 0.01;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 500;
        const gain = ctx.createGain();
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
        source.start(now);
        source.stop(now + 3);
    }

    function activateVinylEasterEgg() {
        if (vinylActive) return;
        vinylActive = true;
        updateEggCounter('Vinyl');

        const song = vinylSongs[Math.floor(Math.random() * vinylSongs.length)];
        playVinylCrackle();

        const overlay = document.createElement('div');
        overlay.className = 'vinyl-overlay';
        overlay.innerHTML = `
            <div class="vinyl-card">
                <div class="vinyl-record"></div>
                <div class="vinyl-now-playing">NOW PLAYING</div>
                <div class="vinyl-song-title">${song.title}</div>
                <div class="vinyl-song-artist">${song.artist}</div>
                <div class="vinyl-close"><span>CLICK</span> or <span>ESC</span> to close</div>
            </div>
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            setTimeout(() => overlay.querySelector('.vinyl-card').classList.add('revealed'), 100);
        });

        let autoTimer = setTimeout(() => closeVinyl(), 10000);

        function closeVinyl() {
            clearTimeout(autoTimer);
            const card = overlay.querySelector('.vinyl-card');
            if (card) card.classList.add('dismissed');
            overlay.classList.remove('active');
            setTimeout(() => { overlay.remove(); vinylActive = false; }, 400);
        }

        overlay.addEventListener('click', closeVinyl);

        function handleKey(e) {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault(); closeVinyl();
                document.removeEventListener('keydown', handleKey);
            }
        }
        document.addEventListener('keydown', handleKey);
    }

    document.addEventListener('keydown', (e) => {
        if (vinylActive || isTypingInInput()) return;
        if (e.key.toLowerCase() === vinylCode[vinylIndex]) {
            vinylIndex++;
            if (vinylIndex === vinylCode.length) { vinylIndex = 0; activateVinylEasterEgg(); }
        } else {
            vinylIndex = 0;
            if (e.key.toLowerCase() === vinylCode[0]) vinylIndex = 1;
        }
    });

    // =========================================
    // 15. SOLO EASTER EGG — Type "solo"
    // =========================================
    const soloCode = ['s', 'o', 'l', 'o'];
    let soloIndex = 0;
    let soloActive = false;

    function playGuitarSolo() {
        let ctx;
        try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
        catch (e) { return; }
        const now = ctx.currentTime;

        // Pentatonic scale solo
        const notes = [329.63, 392, 440, 523.25, 587.33, 659.25, 783.99, 659.25, 523.25, 440, 392, 523.25, 659.25, 783.99, 1046.5];

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = i % 3 === 0 ? 'sawtooth' : 'square';
            osc.frequency.value = freq;

            // Add vibrato
            const vibrato = ctx.createOscillator();
            const vibratoGain = ctx.createGain();
            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            vibrato.frequency.value = 6;
            vibratoGain.gain.value = freq * 0.02;
            vibrato.start(now);
            vibrato.stop(now + 3);

            const t = now + i * 0.12;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
            gain.gain.setValueAtTime(0.06, t + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
            osc.start(t);
            osc.stop(t + 0.2);
        });
    }

    function spawnNotes() {
        const container = document.createElement('div');
        container.className = 'solo-notes';
        document.body.appendChild(container);

        const noteChars = ['♪', '♫', '♬', '🎵', '🎶', '🎸', '🤘', '⚡'];

        for (let i = 0; i < 25; i++) {
            const note = document.createElement('div');
            note.className = 'solo-note';
            note.textContent = noteChars[Math.floor(Math.random() * noteChars.length)];
            note.style.left = Math.random() * 100 + '%';
            note.style.bottom = '0';
            note.style.setProperty('--rot', (Math.random() * 60 - 30) + 'deg');
            note.style.animationDelay = (Math.random() * 2) + 's';
            note.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
            container.appendChild(note);
        }

        setTimeout(() => container.remove(), 5000);
    }

    function activateSoloEasterEgg() {
        if (soloActive) return;
        soloActive = true;
        updateEggCounter('Solo');

        playGuitarSolo();
        spawnNotes();

        const overlay = document.createElement('div');
        overlay.className = 'solo-overlay';
        overlay.innerHTML = `
            <div class="solo-stage">
                <div class="solo-spotlight">
                    <div class="solo-guitar">🎸</div>
                </div>
                <div class="solo-title">GUITAR SOLO!</div>
                <div class="solo-subtitle">"The guitar is the voice of the soul"</div>
                <div class="solo-close"><span>CLICK</span> or <span>ESC</span> to close</div>
            </div>
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            setTimeout(() => overlay.querySelector('.solo-stage').classList.add('revealed'), 100);
        });

        let autoTimer = setTimeout(() => closeSolo(), 8000);

        function closeSolo() {
            clearTimeout(autoTimer);
            overlay.classList.remove('active');
            setTimeout(() => { overlay.remove(); soloActive = false; }, 400);
        }

        overlay.addEventListener('click', closeSolo);

        function handleKey(e) {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault(); closeSolo();
                document.removeEventListener('keydown', handleKey);
            }
        }
        document.addEventListener('keydown', handleKey);
    }

    document.addEventListener('keydown', (e) => {
        if (soloActive || isTypingInInput()) return;
        if (e.key.toLowerCase() === soloCode[soloIndex]) {
            soloIndex++;
            if (soloIndex === soloCode.length) { soloIndex = 0; activateSoloEasterEgg(); }
        } else {
            soloIndex = 0;
            if (e.key.toLowerCase() === soloCode[0]) soloIndex = 1;
        }
    });

    // =========================================
    // 16. LEGEND EASTER EGG — Type "legend"
    // =========================================
    const legendCode = ['l', 'e', 'g', 'e', 'n', 'd'];
    let legendIndex = 0;
    let legendActive = false;

    const legendQuotes = [
        { crown: '👑', quote: '"Music doesn\'t lie. If there is something to be changed in this world, then it can only happen through music."', author: '— Jimi Hendrix', era: '1960s', genre: 'Psychedelic', albums: '∞' },
        { crown: '🎤', quote: '"Rock and roll is the music of the people. It will never die as long as there are rebels left in the world."', author: '— Freddie Mercury', era: '1970s', genre: 'Arena Rock', albums: '250M+' },
        { crown: '🎸', quote: '"I believe every guitar player inherently has something unique about their playing."', author: '— Jimmy Page', era: '1970s', genre: 'Hard Rock', albums: '300M+' },
        { crown: '⚡', quote: '"For those about to rock, we salute you."', author: '— AC/DC', era: '1980s', genre: 'Hard Rock', albums: '200M+' },
        { crown: '🔥', quote: '"The only way to do great work is to love what you do."', author: '— Klaus Meine (Scorpions)', era: '1970s', genre: 'Rock', albums: '100M+' }
    ];

    function playLegendSound() {
        let ctx;
        try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
        catch (e) { return; }
        const now = ctx.currentTime;

        // Majestic rising chord
        const freqs = [261.63, 329.63, 392, 523.25];
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.15;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.08, t + 0.05);
            gain.gain.setValueAtTime(0.08, t + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
            osc.start(t);
            osc.stop(t + 1.5);
        });
    }

    function activateLegendEasterEgg() {
        if (legendActive) return;
        legendActive = true;
        updateEggCounter('Legend');

        const legend = legendQuotes[Math.floor(Math.random() * legendQuotes.length)];
        playLegendSound();

        const overlay = document.createElement('div');
        overlay.className = 'legend-overlay';
        overlay.innerHTML = `
            <div class="legend-card">
                <div class="legend-crown">${legend.crown}</div>
                <div class="legend-title">LEGENDARY</div>
                <div class="legend-subtitle">WISDOM UNLOCKED</div>
                <div class="legend-quote">${legend.quote}</div>
                <div class="legend-quote-author">${legend.author}</div>
                <div class="legend-stats">
                    <div><div class="legend-stat-value">${legend.era}</div><div class="legend-stat-label">Era</div></div>
                    <div><div class="legend-stat-value">${legend.genre}</div><div class="legend-stat-label">Genre</div></div>
                    <div><div class="legend-stat-value">${legend.albums}</div><div class="legend-stat-label">Sales</div></div>
                </div>
                <div class="legend-close"><span>CLICK</span> or <span>ESC</span> to close</div>
            </div>
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            setTimeout(() => overlay.querySelector('.legend-card').classList.add('revealed'), 100);
        });

        let autoTimer = setTimeout(() => closeLegend(), 12000);

        function closeLegend() {
            clearTimeout(autoTimer);
            const card = overlay.querySelector('.legend-card');
            if (card) card.classList.add('dismissed');
            overlay.classList.remove('active');
            setTimeout(() => { overlay.remove(); legendActive = false; }, 400);
        }

        overlay.addEventListener('click', closeLegend);

        function handleKey(e) {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault(); closeLegend();
                document.removeEventListener('keydown', handleKey);
            }
        }
        document.addEventListener('keydown', handleKey);
    }

    document.addEventListener('keydown', (e) => {
        if (legendActive || isTypingInInput()) return;
        if (e.key.toLowerCase() === legendCode[legendIndex]) {
            legendIndex++;
            if (legendIndex === legendCode.length) { legendIndex = 0; activateLegendEasterEgg(); }
        } else {
            legendIndex = 0;
            if (e.key.toLowerCase() === legendCode[0]) legendIndex = 1;
        }
    });

    // =========================================
    // 17. BAND CARD RAPID CLICK EASTER EGG
    // =========================================
    const bandCards = document.querySelectorAll('.band-card');
    let bandClickCount = 0;
    let bandClickTimer = null;
    let bandClickActive = false;

    const bandFacts = [
        { icon: '🎸', title: 'SUPERFAN DETECTED', subtitle: 'You really love these bands, huh?' },
        { icon: '🤘', title: 'ROCK OBSESSED', subtitle: 'Clicking won\'t make them play louder... or will it?' },
        { icon: '🔥', title: 'BAND WORSHIPPER', subtitle: 'You\'ve been clicking like it\'s a guitar pick.' },
        { icon: '⚡', title: 'GROUPIE MODE', subtitle: 'Calm down, it\'s just a website. But we appreciate the energy.' }
    ];

    bandCards.forEach(card => {
        card.addEventListener('click', () => {
            if (bandClickActive) return;

            bandClickCount++;
            clearTimeout(bandClickTimer);
            bandClickTimer = setTimeout(() => { bandClickCount = 0; }, 2000);

            if (bandClickCount >= 8) {
                bandClickCount = 0;
                clearTimeout(bandClickTimer);
                bandClickActive = true;
                updateEggCounter('Superfan');

                const fact = bandFacts[Math.floor(Math.random() * bandFacts.length)];

                playHoverSound(1200);

                const toast = document.createElement('div');
                toast.className = 'band-click-toast';
                toast.innerHTML = `
                    <div class="band-click-icon">${fact.icon}</div>
                    <div class="band-click-title">${fact.title}</div>
                    <div class="band-click-subtitle">${fact.subtitle}</div>
                `;
                document.body.appendChild(toast);

                requestAnimationFrame(() => toast.classList.add('show'));

                setTimeout(() => {
                    toast.classList.remove('show');
                    toast.classList.add('hide');
                    setTimeout(() => { toast.remove(); bandClickActive = false; }, 400);
                }, 3000);
            }
        });
    });

    // =========================================
    // 18. KEYBOARD THEME TOGGLE (Press T)
    // =========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 't' && !e.ctrlKey && !e.altKey && !e.metaKey && !isTypingInInput()) {
            const themes = ['ultra-dark', 'dark', 'light'];
            const current = localStorage.getItem('rock-theme') || 'ultra-dark';
            const idx = themes.indexOf(current);
            const next = themes[(idx + 1) % themes.length];

            if (next === 'dark') {
                htmlElement.setAttribute('data-theme', 'dark');
            } else if (next === 'light') {
                htmlElement.setAttribute('data-theme', 'light');
            } else {
                htmlElement.removeAttribute('data-theme');
            }
            localStorage.setItem('rock-theme', next);
            if (themeSelector) themeSelector.value = next;
        }
    });

});
