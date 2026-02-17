/* =============================================
   MINIGAMES — Shared between Gaming & Rock pages
   Gaming Page: Aim Trainer (FPS style)
   Rock Page: Rhythm Catcher (Guitar Hero style)
   ============================================= */

   (function() {
    'use strict';

    // Detect which page we're on
    const isGamingPage = document.querySelector('.gaming-header') !== null;
    const isRockPage = document.querySelector('.rock-loading-screen') !== null || document.querySelector('header[role="banner"]') !== null && !isGamingPage;

    // =========================================
    // INJECT STYLES
    // =========================================
    const gameStyles = document.createElement('style');
    gameStyles.textContent = `
        /* ---- MINIGAME LAUNCH BUTTON ---- */
        .minigame-launch {
            position: fixed;
            bottom: 5rem;
            left: 2rem;
            z-index: 9990;
            border: none;
            cursor: pointer;
            font-family: ${isGamingPage ? "'Consolas', 'Monaco', monospace" : "'Oswald', sans-serif"};
            font-size: 0.8rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 0.7rem 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            opacity: 0.7;
        }
        .minigame-launch:hover {
            opacity: 1;
            transform: translateY(-3px);
        }
        /* Gaming page button */
        .minigame-launch.gaming-btn {
            background: #141414;
            color: #de9b35;
            border: 2px solid #de9b35;
            box-shadow: 0 0 15px rgba(222,155,53,0.2);
        }
        .minigame-launch.gaming-btn:hover {
            background: #de9b35;
            color: #000;
            box-shadow: 0 0 25px rgba(222,155,53,0.4);
        }
        /* Rock page button */
        .minigame-launch.rock-btn {
            background: #0D1B2A;
            color: #E63946;
            border: 3px solid #E63946;
            box-shadow: 0 0 15px rgba(230,57,70,0.2);
            font-weight: 700;
        }
        .minigame-launch.rock-btn:hover {
            background: #E63946;
            color: #fff;
            box-shadow: 0 6px 20px rgba(230,57,70,0.4);
        }
        .minigame-launch-icon {
            font-size: 1.2rem;
        }

        /* ---- GAME OVERLAY ---- */
        .minigame-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        }
        .minigame-overlay.active {
            opacity: 1;
            pointer-events: all;
        }
        .minigame-overlay-bg {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.95);
        }

        /* ---- GAME CONTAINER ---- */
        .minigame-container {
            position: relative;
            z-index: 2;
            width: 95%;
            max-width: 700px;
            border-radius: 0;
            overflow: hidden;
            transform: scale(0.9) translateY(20px);
            transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
        }
        .minigame-overlay.active .minigame-container {
            transform: scale(1) translateY(0);
        }

        /* Gaming theme */
        .minigame-container.gaming-theme {
            background: #0a0a0a;
            border: 2px solid #de9b35;
            box-shadow: 0 0 40px rgba(222,155,53,0.3);
        }
        /* Rock theme */
        .minigame-container.rock-theme {
            background: #0D1B2A;
            border: 3px solid #E63946;
            box-shadow: 0 0 40px rgba(230,57,70,0.3);
        }

        /* ---- GAME HEADER ---- */
        .minigame-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
        }
        .gaming-theme .minigame-header {
            background: #141414;
            border-bottom: 2px solid #de9b35;
        }
        .rock-theme .minigame-header {
            background: #1D3557;
            border-bottom: 3px solid #E63946;
        }
        .minigame-title {
            font-size: 1.3rem;
            text-transform: uppercase;
            letter-spacing: 3px;
        }
        .gaming-theme .minigame-title {
            font-family: 'Bebas Neue', 'Impact', sans-serif;
            color: #de9b35;
        }
        .rock-theme .minigame-title {
            font-family: 'Oswald', sans-serif;
            color: #E63946;
        }
        .minigame-close {
            background: none;
            border: 1px solid;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        .gaming-theme .minigame-close {
            border-color: #444;
            color: #999;
        }
        .gaming-theme .minigame-close:hover {
            border-color: #de9b35;
            color: #de9b35;
        }
        .rock-theme .minigame-close {
            border-color: #8D99AE;
            color: #8D99AE;
        }
        .rock-theme .minigame-close:hover {
            border-color: #E63946;
            color: #E63946;
        }

        /* ---- GAME HUD ---- */
        .minigame-hud {
            display: flex;
            justify-content: space-around;
            padding: 0.75rem 1.5rem;
            font-family: 'Consolas', 'Space Mono', monospace;
            font-size: 0.85rem;
        }
        .gaming-theme .minigame-hud {
            background: #111;
            border-bottom: 1px solid #2a2a2a;
            color: #999;
        }
        .rock-theme .minigame-hud {
            background: #0D1B2A;
            border-bottom: 1px solid #264573;
            color: #8D99AE;
        }
        .hud-item {
            text-align: center;
        }
        .hud-value {
            display: block;
            font-size: 1.4rem;
            font-weight: bold;
            line-height: 1;
        }
        .gaming-theme .hud-value { color: #de9b35; }
        .rock-theme .hud-value { color: #FFB703; }
        .hud-label {
            font-size: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        /* ---- GAME CANVAS AREA ---- */
        .minigame-arena {
            position: relative;
            width: 100%;
            height: 400px;
            overflow: hidden;
            cursor: crosshair;
            user-select: none;
            -webkit-user-select: none;
        }
        .gaming-theme .minigame-arena {
            background:
                radial-gradient(ellipse at center, rgba(222,155,53,0.03) 0%, transparent 70%),
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(222,155,53,0.03) 40px, rgba(222,155,53,0.03) 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(222,155,53,0.03) 40px, rgba(222,155,53,0.03) 41px),
                #0a0a0a;
        }
        .rock-theme .minigame-arena {
            background:
                repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(230,57,70,0.04) 50px, rgba(230,57,70,0.04) 51px),
                #0a0a12;
        }

        /* ---- GAME SCREENS ---- */
        .game-screen {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
            transition: opacity 0.3s ease;
            z-index: 5;
            background: inherit;
        }
        .game-screen.hidden { opacity: 0; pointer-events: none; z-index: -1; }

        .game-screen-title {
            font-size: 2rem;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 0.5rem;
        }
        .gaming-theme .game-screen-title {
            font-family: 'Bebas Neue', 'Impact', sans-serif;
            color: #de9b35;
        }
        .rock-theme .game-screen-title {
            font-family: 'Oswald', sans-serif;
            color: #E63946;
        }
        .game-screen-desc {
            font-size: 0.9rem;
            max-width: 400px;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        .gaming-theme .game-screen-desc { color: #999; font-family: 'Consolas', monospace; }
        .rock-theme .game-screen-desc { color: #A8DADC; font-family: 'Playfair Display', serif; }

        .game-start-btn {
            padding: 0.8rem 2.5rem;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }
        .gaming-theme .game-start-btn {
            font-family: 'Bebas Neue', 'Impact', sans-serif;
            background: #de9b35;
            color: #000;
            border: 2px solid #de9b35;
        }
        .gaming-theme .game-start-btn:hover {
            background: transparent;
            color: #de9b35;
            box-shadow: 0 0 20px rgba(222,155,53,0.4);
        }
        .rock-theme .game-start-btn {
            font-family: 'Oswald', sans-serif;
            font-weight: 700;
            background: #E63946;
            color: #fff;
            border: 3px solid #E63946;
        }
        .rock-theme .game-start-btn:hover {
            background: transparent;
            color: #E63946;
            box-shadow: 0 6px 20px rgba(230,57,70,0.4);
        }

        /* ---- GAME OVER STATS ---- */
        .game-over-stats {
            display: flex;
            gap: 2rem;
            margin: 1rem 0 1.5rem;
        }
        .game-over-stat {
            text-align: center;
        }
        .game-over-stat-value {
            font-size: 2rem;
            font-weight: bold;
            line-height: 1;
        }
        .gaming-theme .game-over-stat-value { color: #de9b35; font-family: 'Bebas Neue', sans-serif; }
        .rock-theme .game-over-stat-value { color: #FFB703; font-family: 'Oswald', sans-serif; }
        .game-over-stat-label {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .gaming-theme .game-over-stat-label { color: #666; font-family: 'Consolas', monospace; }
        .rock-theme .game-over-stat-label { color: #8D99AE; font-family: 'Space Mono', monospace; }

        .game-highscore {
            font-size: 0.75rem;
            letter-spacing: 1px;
            margin-bottom: 1rem;
        }
        .gaming-theme .game-highscore { color: #5cb85c; font-family: 'Consolas', monospace; }
        .rock-theme .game-highscore { color: #2A9D8F; font-family: 'Space Mono', monospace; }

        /* ===============================
           AIM TRAINER SPECIFIC (Gaming)
           =============================== */
        .aim-target {
            position: absolute;
            border-radius: 50%;
            cursor: crosshair;
            transition: transform 0.1s ease;
            pointer-events: all;
        }
        .aim-target::before {
            content: '';
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 30%;
            height: 30%;
            background: #de9b35;
            border-radius: 50%;
        }
        .aim-target::after {
            content: '+';
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            color: #000;
            font-weight: bold;
            font-size: 0.7rem;
            z-index: 2;
        }
        .aim-target.normal {
            background: radial-gradient(circle, #c44b4b 0%, #c44b4b 40%, #f5b942 40%, #f5b942 55%, transparent 55%);
            border: 2px solid #de9b35;
            box-shadow: 0 0 15px rgba(222,155,53,0.3);
        }
        .aim-target.bonus {
            background: radial-gradient(circle, #5cb85c 0%, #5cb85c 40%, #f5c842 40%, #f5c842 55%, transparent 55%);
            border: 2px solid #5cb85c;
            box-shadow: 0 0 20px rgba(92,184,92,0.4);
            animation: bonusPulse 0.5s ease infinite alternate;
        }
        @keyframes bonusPulse {
            from { box-shadow: 0 0 15px rgba(92,184,92,0.3); }
            to { box-shadow: 0 0 30px rgba(92,184,92,0.6); }
        }
        .aim-target.shrinking {
            animation: targetShrink var(--shrink-time, 2s) linear forwards;
        }
        @keyframes targetShrink {
            from { transform: scale(1); opacity: 1; }
            to { transform: scale(0.1); opacity: 0.3; }
        }
        .aim-hit-marker {
            position: absolute;
            color: #de9b35;
            font-family: 'Bebas Neue', 'Impact', sans-serif;
            font-size: 1.2rem;
            pointer-events: none;
            animation: hitMarkerFloat 0.7s ease forwards;
            z-index: 10;
        }
        @keyframes hitMarkerFloat {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-40px) scale(0.6); }
        }
        .aim-miss-marker {
            position: absolute;
            width: 20px; height: 20px;
            pointer-events: none;
            z-index: 10;
        }
        .aim-miss-marker::before, .aim-miss-marker::after {
            content: '';
            position: absolute;
            top: 50%; left: 50%;
            width: 16px; height: 2px;
            background: #c44b4b;
        }
        .aim-miss-marker::before { transform: translate(-50%, -50%) rotate(45deg); }
        .aim-miss-marker::after { transform: translate(-50%, -50%) rotate(-45deg); }
        .aim-miss-marker {
            animation: missFlash 0.4s ease forwards;
        }
        @keyframes missFlash {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.5); }
        }

        /* ===============================
           RHYTHM CATCHER SPECIFIC (Rock)
           =============================== */
        .rhythm-lanes {
            position: absolute;
            bottom: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            z-index: 1;
        }
        .rhythm-lane {
            flex: 1;
            position: relative;
            border-right: 1px solid rgba(230,57,70,0.15);
        }
        .rhythm-lane:last-child { border-right: none; }
        .rhythm-lane-label {
            position: absolute;
            bottom: 55px;
            left: 50%;
            transform: translateX(-50%);
            font-family: 'Oswald', sans-serif;
            font-size: 0.7rem;
            color: rgba(230,57,70,0.3);
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .rhythm-hit-zone {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            border-top: 3px solid rgba(230,57,70,0.4);
            background: rgba(230,57,70,0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
        }
        .rhythm-hit-zone.flash {
            background: rgba(230,57,70,0.3);
            border-top-color: #E63946;
        }
        .rhythm-hit-zone.perfect-flash {
            background: rgba(255,183,3,0.3);
            border-top-color: #FFB703;
        }
        .rhythm-hit-zone.miss-flash {
            background: rgba(255,0,0,0.2);
            border-top-color: #ff4444;
        }
        .rhythm-key-indicator {
            font-family: 'Oswald', sans-serif;
            font-size: 1.4rem;
            font-weight: 700;
            color: rgba(230,57,70,0.5);
            border: 2px solid rgba(230,57,70,0.3);
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.1s ease;
        }
        .rhythm-key-indicator.pressed {
            color: #fff;
            background: #E63946;
            border-color: #E63946;
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(230,57,70,0.5);
        }
        .rhythm-note {
            position: absolute;
            width: 70%;
            left: 15%;
            height: 20px;
            border-radius: 3px;
            transition: none;
        }
        .rhythm-note.note-normal {
            background: linear-gradient(180deg, #E63946, #c4303c);
            border: 1px solid #ff5a67;
            box-shadow: 0 0 8px rgba(230,57,70,0.4);
        }
        .rhythm-note.note-gold {
            background: linear-gradient(180deg, #FFB703, #e6a503);
            border: 1px solid #ffd044;
            box-shadow: 0 0 12px rgba(255,183,3,0.5);
        }
        .rhythm-hit-text {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-family: 'Oswald', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            pointer-events: none;
            animation: rhythmHitFloat 0.6s ease forwards;
            z-index: 10;
        }
        .rhythm-hit-text.perfect { color: #FFB703; }
        .rhythm-hit-text.good { color: #2A9D8F; }
        .rhythm-hit-text.miss { color: #E63946; }
        @keyframes rhythmHitFloat {
            0% { opacity: 1; bottom: 70px; }
            100% { opacity: 0; bottom: 140px; }
        }
        .rhythm-combo {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-family: 'Oswald', sans-serif;
            text-align: right;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .rhythm-combo.visible { opacity: 1; }
        .rhythm-combo-count {
            font-size: 2.5rem;
            font-weight: 700;
            color: #FFB703;
            line-height: 1;
            text-shadow: 0 0 15px rgba(255,183,3,0.4);
        }
        .rhythm-combo-label {
            font-size: 0.65rem;
            color: #8D99AE;
            letter-spacing: 3px;
            text-transform: uppercase;
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 600px) {
            .minigame-arena { height: 320px; }
            .minigame-launch { bottom: 4.5rem; left: 1rem; padding: 0.5rem 0.8rem; font-size: 0.7rem; }
            .game-screen-title { font-size: 1.5rem; }
            .game-over-stats { gap: 1rem; }
            .rhythm-key-indicator { font-size: 1rem; width: 28px; height: 28px; }
        }
    `;
    document.head.appendChild(gameStyles);

    // =========================================
    // CREATE LAUNCH BUTTON
    // =========================================
    const launchBtn = document.createElement('button');
    launchBtn.className = 'minigame-launch ' + (isGamingPage ? 'gaming-btn' : 'rock-btn');
    launchBtn.innerHTML = isGamingPage
        ? '<span class="minigame-launch-icon">🎯</span> AIM TRAINER'
        : '<span class="minigame-launch-icon">🎸</span> RHYTHM GAME';
    launchBtn.setAttribute('aria-label', isGamingPage ? 'Play Aim Trainer minigame' : 'Play Rhythm Catcher minigame');
    document.body.appendChild(launchBtn);

    launchBtn.addEventListener('click', () => {
        if (isGamingPage) launchAimTrainer();
        else launchRhythmGame();
    });

    // =========================================
    // SHARED: Sound helper
    // =========================================
    function getAudioCtx() {
        if (!getAudioCtx._ctx) {
            try { getAudioCtx._ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; }
        }
        return getAudioCtx._ctx;
    }

    function playTone(freq, dur, type, vol) {
        const ctx = getAudioCtx(); if (!ctx) return;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = type || 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(vol || 0.08, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (dur || 0.1));
        o.start(ctx.currentTime); o.stop(ctx.currentTime + (dur || 0.1));
    }

    // =========================================
    // AIM TRAINER (Gaming Page)
    // =========================================
    function launchAimTrainer() {
        const overlay = document.createElement('div');
        overlay.className = 'minigame-overlay';
        overlay.innerHTML = `
            <div class="minigame-overlay-bg"></div>
            <div class="minigame-container gaming-theme">
                <div class="minigame-header">
                    <div class="minigame-title">🎯 AIM TRAINER</div>
                    <button class="minigame-close" aria-label="Close game">✕</button>
                </div>
                <div class="minigame-hud">
                    <div class="hud-item"><span class="hud-value" id="aim-score">0</span><span class="hud-label">Score</span></div>
                    <div class="hud-item"><span class="hud-value" id="aim-hits">0</span><span class="hud-label">Hits</span></div>
                    <div class="hud-item"><span class="hud-value" id="aim-misses">0</span><span class="hud-label">Misses</span></div>
                    <div class="hud-item"><span class="hud-value" id="aim-time">30</span><span class="hud-label">Time</span></div>
                    <div class="hud-item"><span class="hud-value" id="aim-accuracy">100%</span><span class="hud-label">Accuracy</span></div>
                </div>
                <div class="minigame-arena" id="aim-arena">
                    <div class="game-screen" id="aim-start-screen">
                        <div class="game-screen-title">AIM TRAINER</div>
                        <div class="game-screen-desc">Click the targets as fast as you can. Smaller targets = more points. Green bonus targets = 3x points. Don't miss!</div>
                        <button class="game-start-btn" id="aim-start-btn">START ROUND</button>
                    </div>
                    <div class="game-screen hidden" id="aim-end-screen">
                        <div class="game-screen-title" id="aim-end-title">ROUND OVER</div>
                        <div class="game-over-stats" id="aim-end-stats"></div>
                        <div class="game-highscore" id="aim-highscore"></div>
                        <button class="game-start-btn" id="aim-restart-btn">PLAY AGAIN</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('active'));

        const arena = document.getElementById('aim-arena');
        const scoreEl = document.getElementById('aim-score');
        const hitsEl = document.getElementById('aim-hits');
        const missesEl = document.getElementById('aim-misses');
        const timeEl = document.getElementById('aim-time');
        const accEl = document.getElementById('aim-accuracy');
        const startScreen = document.getElementById('aim-start-screen');
        const endScreen = document.getElementById('aim-end-screen');

        let score = 0, hits = 0, misses = 0, timeLeft = 30, gameActive = false;
        let spawnInterval, timerInterval, targets = [];

        function spawnTarget() {
            if (!gameActive) return;
            const target = document.createElement('div');
            target.className = 'aim-target';
            const isBonus = Math.random() < 0.15;
            target.classList.add(isBonus ? 'bonus' : 'normal');
            const size = 30 + Math.random() * 40;
            const maxX = arena.clientWidth - size - 10;
            const maxY = arena.clientHeight - size - 60;
            target.style.width = size + 'px';
            target.style.height = size + 'px';
            target.style.left = (10 + Math.random() * maxX) + 'px';
            target.style.top = (10 + Math.random() * maxY) + 'px';
            const shrinkTime = 1.5 + Math.random() * 1.5;
            target.style.setProperty('--shrink-time', shrinkTime + 's');
            target.classList.add('shrinking');
            target.dataset.points = isBonus ? Math.floor((70 / size) * 30) : Math.floor((70 / size) * 10);
            target.dataset.bonus = isBonus ? '1' : '0';

            target.addEventListener('click', (e) => {
                e.stopPropagation();
                const pts = parseInt(target.dataset.points);
                score += pts; hits++;
                scoreEl.textContent = score;
                hitsEl.textContent = hits;
                updateAccuracy();
                playTone(isBonus ? 1200 : 800, 0.08, 'square', 0.06);
                showHitMarker(e.offsetX, e.offsetY, '+' + pts, target);
                target.remove();
                targets = targets.filter(t => t !== target);
            });

            const autoRemove = setTimeout(() => {
                if (target.parentNode && gameActive) {
                    misses++; missesEl.textContent = misses; updateAccuracy();
                    target.remove();
                    targets = targets.filter(t => t !== target);
                }
            }, shrinkTime * 1000);
            target._timeout = autoRemove;

            arena.appendChild(target);
            targets.push(target);
        }

        function showHitMarker(x, y, text, parent) {
            const marker = document.createElement('div');
            marker.className = 'aim-hit-marker';
            marker.textContent = text;
            const rect = parent.getBoundingClientRect();
            const arenaRect = arena.getBoundingClientRect();
            marker.style.left = (rect.left - arenaRect.left + rect.width / 2) + 'px';
            marker.style.top = (rect.top - arenaRect.top) + 'px';
            arena.appendChild(marker);
            setTimeout(() => marker.remove(), 700);
        }

        function updateAccuracy() {
            const total = hits + misses;
            accEl.textContent = total > 0 ? Math.round((hits / total) * 100) + '%' : '100%';
        }

        arena.addEventListener('click', (e) => {
            if (!gameActive) return;
            if (e.target === arena || e.target.classList.contains('game-screen')) {
                misses++; missesEl.textContent = misses; updateAccuracy();
                playTone(200, 0.08, 'sawtooth', 0.04);
                const miss = document.createElement('div');
                miss.className = 'aim-miss-marker';
                const arenaRect = arena.getBoundingClientRect();
                miss.style.left = (e.clientX - arenaRect.left - 10) + 'px';
                miss.style.top = (e.clientY - arenaRect.top - 10) + 'px';
                arena.appendChild(miss);
                setTimeout(() => miss.remove(), 400);
            }
        });

        function startGame() {
            score = 0; hits = 0; misses = 0; timeLeft = 30; gameActive = true;
            scoreEl.textContent = '0'; hitsEl.textContent = '0'; missesEl.textContent = '0';
            timeEl.textContent = '30'; accEl.textContent = '100%';
            startScreen.classList.add('hidden');
            endScreen.classList.add('hidden');
            targets.forEach(t => { clearTimeout(t._timeout); t.remove(); });
            targets = [];

            spawnInterval = setInterval(() => {
                if (targets.length < 4) spawnTarget();
            }, 600);

            timerInterval = setInterval(() => {
                timeLeft--;
                timeEl.textContent = timeLeft;
                if (timeLeft <= 0) endGame();
            }, 1000);
        }

        function endGame() {
            gameActive = false;
            clearInterval(spawnInterval);
            clearInterval(timerInterval);
            targets.forEach(t => { clearTimeout(t._timeout); t.remove(); });
            targets = [];

            const total = hits + misses;
            const accuracy = total > 0 ? Math.round((hits / total) * 100) : 0;
            const highKey = 'aim-trainer-highscore';
            const prev = parseInt(localStorage.getItem(highKey) || '0');
            const isNew = score > prev;
            if (isNew) localStorage.setItem(highKey, score.toString());

            document.getElementById('aim-end-title').textContent = score > 500 ? 'INSANE!' : score > 200 ? 'NICE AIM!' : 'ROUND OVER';
            document.getElementById('aim-end-stats').innerHTML = `
                <div class="game-over-stat"><div class="game-over-stat-value">${score}</div><div class="game-over-stat-label">Score</div></div>
                <div class="game-over-stat"><div class="game-over-stat-value">${hits}</div><div class="game-over-stat-label">Hits</div></div>
                <div class="game-over-stat"><div class="game-over-stat-value">${accuracy}%</div><div class="game-over-stat-label">Accuracy</div></div>
            `;
            document.getElementById('aim-highscore').textContent = isNew ? '★ NEW HIGH SCORE! ★' : 'High Score: ' + Math.max(prev, score);
            endScreen.classList.remove('hidden');

            playTone(523, 0.15, 'square', 0.06);
            setTimeout(() => playTone(659, 0.15, 'square', 0.06), 150);
            setTimeout(() => playTone(784, 0.3, 'square', 0.06), 300);
        }

        document.getElementById('aim-start-btn').addEventListener('click', startGame);
        document.getElementById('aim-restart-btn').addEventListener('click', startGame);

        function closeGame() {
            gameActive = false;
            clearInterval(spawnInterval);
            clearInterval(timerInterval);
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 400);
        }

        overlay.querySelector('.minigame-close').addEventListener('click', closeGame);
        overlay.querySelector('.minigame-overlay-bg').addEventListener('click', closeGame);
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { closeGame(); document.removeEventListener('keydown', escHandler); }
        });
    }

    // =========================================
    // RHYTHM CATCHER (Rock Page)
    // =========================================
    function launchRhythmGame() {
        const keys = ['D', 'F', 'J', 'K'];
        const overlay = document.createElement('div');
        overlay.className = 'minigame-overlay';
        overlay.innerHTML = `
            <div class="minigame-overlay-bg"></div>
            <div class="minigame-container rock-theme">
                <div class="minigame-header">
                    <div class="minigame-title">🎸 RHYTHM CATCHER</div>
                    <button class="minigame-close" aria-label="Close game">✕</button>
                </div>
                <div class="minigame-hud">
                    <div class="hud-item"><span class="hud-value" id="rhy-score">0</span><span class="hud-label">Score</span></div>
                    <div class="hud-item"><span class="hud-value" id="rhy-combo">0</span><span class="hud-label">Combo</span></div>
                    <div class="hud-item"><span class="hud-value" id="rhy-perfect">0</span><span class="hud-label">Perfect</span></div>
                    <div class="hud-item"><span class="hud-value" id="rhy-time">45</span><span class="hud-label">Time</span></div>
                </div>
                <div class="minigame-arena" id="rhy-arena">
                    <div class="game-screen" id="rhy-start-screen">
                        <div class="game-screen-title">RHYTHM CATCHER</div>
                        <div class="game-screen-desc">Press D, F, J, K when the falling notes reach the bottom line. Time it perfectly for bonus points! Gold notes are worth 3x.</div>
                        <button class="game-start-btn" id="rhy-start-btn">ROCK ON!</button>
                    </div>
                    <div class="game-screen hidden" id="rhy-end-screen">
                        <div class="game-screen-title" id="rhy-end-title">SET OVER</div>
                        <div class="game-over-stats" id="rhy-end-stats"></div>
                        <div class="game-highscore" id="rhy-highscore"></div>
                        <button class="game-start-btn" id="rhy-restart-btn">ENCORE!</button>
                    </div>
                    <div class="rhythm-lanes" id="rhy-lanes" style="display:none;">
                        ${keys.map((k, i) => `
                            <div class="rhythm-lane" data-lane="${i}">
                                <div class="rhythm-lane-label">${k}</div>
                                <div class="rhythm-hit-zone" data-lane="${i}">
                                    <div class="rhythm-key-indicator" id="rhy-key-${i}">${k}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="rhythm-combo" id="rhy-combo-display">
                        <div class="rhythm-combo-count" id="rhy-combo-count">0</div>
                        <div class="rhythm-combo-label">COMBO</div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('active'));

        const arena = document.getElementById('rhy-arena');
        const lanesEl = document.getElementById('rhy-lanes');
        const scoreEl = document.getElementById('rhy-score');
        const comboEl = document.getElementById('rhy-combo');
        const perfectEl = document.getElementById('rhy-perfect');
        const timeEl = document.getElementById('rhy-time');
        const startScreen = document.getElementById('rhy-start-screen');
        const endScreen = document.getElementById('rhy-end-screen');
        const comboDisplay = document.getElementById('rhy-combo-display');
        const comboCount = document.getElementById('rhy-combo-count');

        let score = 0, combo = 0, maxCombo = 0, perfects = 0, goods = 0, missCount = 0;
        let timeLeft = 45, gameActive = false;
        let spawnTimer, gameTimer, animFrame;
        let notes = [];
        let currentDifficulty = 0;
        const noteSpeed = 3;
        const keyMap = { 'd': 0, 'f': 1, 'j': 2, 'k': 3 };

        function spawnNote() {
            if (!gameActive) return;
            const lane = Math.floor(Math.random() * 4);
            const isGold = Math.random() < 0.12;
            const note = document.createElement('div');
            note.className = 'rhythm-note ' + (isGold ? 'note-gold' : 'note-normal');
            note.style.top = '-25px';
            const laneEl = lanesEl.children[lane];
            laneEl.appendChild(note);
            notes.push({ el: note, lane, y: -25, isGold, hit: false });
        }

        function updateNotes() {
            if (!gameActive) return;
            const arenaH = arena.clientHeight;

            for (let i = notes.length - 1; i >= 0; i--) {
                const n = notes[i];
                if (n.hit) continue;
                n.y += noteSpeed;
                n.el.style.top = n.y + 'px';

                if (n.y > arenaH + 10) {
                    combo = 0;
                    missCount++;
                    updateComboDisplay();
                    showHitText(n.lane, 'MISS', 'miss');
                    n.el.remove();
                    notes.splice(i, 1);
                    const hz = lanesEl.children[n.lane].querySelector('.rhythm-hit-zone');
                    hz.classList.add('miss-flash');
                    setTimeout(() => hz.classList.remove('miss-flash'), 200);
                }
            }
            animFrame = requestAnimationFrame(updateNotes);
        }

        function hitLane(laneIdx) {
            if (!gameActive) return;
            const arenaH = arena.clientHeight;
            const hitZoneCenter = arenaH - 25;

            let closest = null, closestDist = Infinity;
            for (const n of notes) {
                if (n.lane !== laneIdx || n.hit) continue;
                const dist = Math.abs((n.y + 10) - hitZoneCenter);
                if (dist < closestDist) { closestDist = dist; closest = n; }
            }

            const keyEl = document.getElementById('rhy-key-' + laneIdx);
            keyEl.classList.add('pressed');
            setTimeout(() => keyEl.classList.remove('pressed'), 120);

            const hz = lanesEl.children[laneIdx].querySelector('.rhythm-hit-zone');

            if (closest && closestDist < 50) {
                closest.hit = true;
                closest.el.remove();
                notes = notes.filter(n => n !== closest);

                let pts, label, cls;
                if (closestDist < 18) {
                    pts = closest.isGold ? 150 : 50;
                    label = 'PERFECT'; cls = 'perfect';
                    perfects++;
                    hz.classList.add('perfect-flash');
                    setTimeout(() => hz.classList.remove('perfect-flash'), 200);
                    playTone(880, 0.08, 'sine', 0.06);
                } else {
                    pts = closest.isGold ? 75 : 25;
                    label = 'GOOD'; cls = 'good';
                    goods++;
                    hz.classList.add('flash');
                    setTimeout(() => hz.classList.remove('flash'), 200);
                    playTone(660, 0.06, 'sine', 0.05);
                }

                combo++;
                if (combo > maxCombo) maxCombo = combo;
                const multiplier = Math.min(1 + Math.floor(combo / 10) * 0.5, 4);
                pts = Math.round(pts * multiplier);
                score += pts;

                scoreEl.textContent = score;
                comboEl.textContent = combo;
                perfectEl.textContent = perfects;
                updateComboDisplay();
                showHitText(laneIdx, label + (multiplier > 1 ? ' x' + multiplier.toFixed(1) : ''), cls);
            } else {
                playTone(150, 0.06, 'sawtooth', 0.03);
            }
        }

        function showHitText(lane, text, cls) {
            const hit = document.createElement('div');
            hit.className = 'rhythm-hit-text ' + cls;
            hit.textContent = text;
            lanesEl.children[lane].appendChild(hit);
            setTimeout(() => hit.remove(), 600);
        }

        function updateComboDisplay() {
            comboCount.textContent = combo;
            comboDisplay.classList.toggle('visible', combo >= 3);
        }

        function setSpawnDifficulty(level) {
            if (level === currentDifficulty) return;
            currentDifficulty = level;
            clearInterval(spawnTimer);
            if (level === 0) {
                spawnTimer = setInterval(() => {
                    spawnNote();
                    if (Math.random() < 0.3) setTimeout(spawnNote, 200);
                }, 700);
            } else if (level === 1) {
                spawnTimer = setInterval(() => {
                    spawnNote();
                    if (Math.random() < 0.4) setTimeout(spawnNote, 150);
                }, 550);
            } else {
                spawnTimer = setInterval(() => {
                    spawnNote();
                    if (Math.random() < 0.5) setTimeout(spawnNote, 120);
                }, 400);
            }
        }

        function startGame() {
            score = 0; combo = 0; maxCombo = 0; perfects = 0; goods = 0; missCount = 0; timeLeft = 45;
            gameActive = false;
            currentDifficulty = -1;
            scoreEl.textContent = '0'; comboEl.textContent = '0'; perfectEl.textContent = '0'; timeEl.textContent = '45';
            startScreen.classList.add('hidden');
            endScreen.classList.add('hidden');
            comboDisplay.classList.remove('visible');

            notes.forEach(n => n.el.remove());
            notes = [];

            // Show lanes and wait a frame so the browser can layout/render them
            lanesEl.style.display = 'flex';

            // Small delay to ensure layout is computed before starting
            setTimeout(() => {
                gameActive = true;
                setSpawnDifficulty(0);

                gameTimer = setInterval(() => {
                    timeLeft--;
                    timeEl.textContent = timeLeft;
                    if (timeLeft <= 10) {
                        setSpawnDifficulty(2);
                    } else if (timeLeft <= 20) {
                        setSpawnDifficulty(1);
                    }
                    if (timeLeft <= 0) endGame();
                }, 1000);

                animFrame = requestAnimationFrame(updateNotes);
            }, 100);
        }

        function endGame() {
            gameActive = false;
            clearInterval(spawnTimer);
            clearInterval(gameTimer);
            cancelAnimationFrame(animFrame);
            notes.forEach(n => n.el.remove());
            notes = [];
            lanesEl.style.display = 'none';
            comboDisplay.classList.remove('visible');

            const total = perfects + goods + missCount;
            const accuracy = total > 0 ? Math.round(((perfects + goods) / total) * 100) : 0;
            const highKey = 'rhythm-game-highscore';
            const prev = parseInt(localStorage.getItem(highKey) || '0');
            const isNew = score > prev;
            if (isNew) localStorage.setItem(highKey, score.toString());

            document.getElementById('rhy-end-title').textContent = score > 3000 ? 'ROCKSTAR!' : score > 1500 ? 'GREAT SET!' : 'SET OVER';
            document.getElementById('rhy-end-stats').innerHTML = `
                <div class="game-over-stat"><div class="game-over-stat-value">${score}</div><div class="game-over-stat-label">Score</div></div>
                <div class="game-over-stat"><div class="game-over-stat-value">${maxCombo}</div><div class="game-over-stat-label">Max Combo</div></div>
                <div class="game-over-stat"><div class="game-over-stat-value">${accuracy}%</div><div class="game-over-stat-label">Accuracy</div></div>
                <div class="game-over-stat"><div class="game-over-stat-value">${perfects}</div><div class="game-over-stat-label">Perfects</div></div>
            `;
            document.getElementById('rhy-highscore').textContent = isNew ? '★ NEW HIGH SCORE! ★' : 'High Score: ' + Math.max(prev, score);
            endScreen.classList.remove('hidden');

            playTone(523, 0.15, 'square', 0.06);
            setTimeout(() => playTone(659, 0.15, 'square', 0.06), 150);
            setTimeout(() => playTone(784, 0.3, 'square', 0.06), 300);
        }

        function handleKeyDown(e) {
            if (!gameActive) return;
            const lane = keyMap[e.key.toLowerCase()];
            if (lane !== undefined) {
                e.preventDefault();
                hitLane(lane);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        document.getElementById('rhy-start-btn').addEventListener('click', startGame);
        document.getElementById('rhy-restart-btn').addEventListener('click', startGame);

        function closeGame() {
            gameActive = false;
            clearInterval(spawnTimer);
            clearInterval(gameTimer);
            cancelAnimationFrame(animFrame);
            document.removeEventListener('keydown', handleKeyDown);
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 400);
        }

        overlay.querySelector('.minigame-close').addEventListener('click', closeGame);
        overlay.querySelector('.minigame-overlay-bg').addEventListener('click', closeGame);
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { closeGame(); document.removeEventListener('keydown', escHandler); }
        });
    }

})();
