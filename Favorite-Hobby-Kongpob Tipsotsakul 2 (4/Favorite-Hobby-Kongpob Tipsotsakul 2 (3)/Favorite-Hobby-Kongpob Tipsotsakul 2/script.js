/* =============================================
   GAMING PAGE - Enhanced Interactive JavaScript
   ============================================= */

   document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. LOADING SCREEN
    // =========================================
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingPercent = document.querySelector('.loading-percent');

    if (loadingScreen) {
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingScreen.classList.add('loaded');
                    document.body.style.overflow = '';
                }, 300);
            }
            if (loadingBar) loadingBar.style.width = progress + '%';
            if (loadingPercent) loadingPercent.textContent = Math.floor(progress) + '%';
        }, 150);

        document.body.style.overflow = 'hidden';
    }

    // =========================================
    // 2. SCROLL PROGRESS BAR
    // =========================================
    const scrollProgress = document.querySelector('.scroll-progress');

    function updateScrollProgress() {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // =========================================
    // 3. CURSOR GLOW FOLLOWER (Desktop only)
    // =========================================
    const cursorGlow = document.querySelector('.cursor-glow');

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
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // =========================================
    // 5. ACTIVE NAV HIGHLIGHTING ON SCROLL
    // =========================================
    const navLinks = document.querySelectorAll('.gaming-nav a[href^="#"]');
    const sections = [];

    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const section = document.getElementById(targetId);
        if (section) {
            sections.push({ link, section });
        }
    });

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;

        let activeFound = false;
        for (let i = sections.length - 1; i >= 0; i--) {
            const { link, section } = sections[i];
            if (scrollPos >= section.offsetTop) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                activeFound = true;
                break;
            }
        }
        if (!activeFound) {
            navLinks.forEach(l => l.classList.remove('active'));
        }
    }

    // =========================================
    // 6. SMOOTH SCROLL FOR NAV LINKS
    // =========================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                const headerOffset = 20;
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

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
    // 8. THEME SWITCHER
    // =========================================
    const themeSelector = document.getElementById('theme-selector');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('gaming-theme') || 'ultra-dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeSelector) themeSelector.value = savedTheme;

    if (themeSelector) {
        themeSelector.addEventListener('change', (e) => {
            const theme = e.target.value;
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('gaming-theme', theme);

            document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
        });
    }

    // =========================================
    // 9. SKILL BARS ANIMATION
    // =========================================
    const skillBarsSection = document.querySelector('.skill-bars');

    if (skillBarsSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.skill-fill');
                    fills.forEach((fill, index) => {
                        const targetWidth = fill.getAttribute('data-width') || fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = targetWidth;
                        }, 150 + index * 150);
                    });
                }
            });
        }, { threshold: 0.3 });

        skillObserver.observe(skillBarsSection);

        const fills = skillBarsSection.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
            fill.setAttribute('data-width', fill.style.width);
        });
    }

    // =========================================
    // 10. COUNTER ANIMATION FOR STATS
    // =========================================
    function animateCounter(element, target, suffix = '', duration = 1500) {
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }
        requestAnimationFrame(update);
    }

    const statValues = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const text = entry.target.textContent.trim();

                if (text === '8K+') {
                    animateCounter(entry.target, 8, 'K+', 1200);
                } else if (text === '0') {
                    // Keep it as 0
                } else if (text === '50+') {
                    animateCounter(entry.target, 50, '+', 1000);
                }
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => statsObserver.observe(stat));

    // =========================================
    // 11. TYPING EFFECT FOR BANNER
    // =========================================
    const bannerTitle = document.querySelector('.banner-title');
    if (bannerTitle) {
        const originalText = bannerTitle.textContent;
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.typed) {
                    entry.target.dataset.typed = 'true';
                    typeText(entry.target, originalText);
                }
            });
        }, { threshold: 0.5 });

        typingObserver.observe(bannerTitle);
    }

    function typeText(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // =========================================
    // 12. PARALLAX EFFECT ON HEADER
    // =========================================
    const header = document.querySelector('.gaming-header');

    function updateParallax() {
        if (!header) return;
        const scrolled = window.scrollY;
        const headerHeight = header.offsetHeight;
        if (scrolled < headerHeight) {
            const parallaxOffset = scrolled * 0.3;
            header.style.backgroundPositionY = parallaxOffset + 'px';
        }
    }

    // =========================================
    // 13. HEADER PARTICLES
    // =========================================
    const particlesContainer = document.querySelector('.header-particles');

    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    // =========================================
    // 14. CARD TILT EFFECT (Desktop)
    // =========================================
    if (window.matchMedia('(pointer: fine)').matches) {
        const tiltCards = document.querySelectorAll('.core-game-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;

                card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // =========================================
    // 15. KEYBOARD NAVIGATION ENHANCEMENT
    // =========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 't' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT') return;

            const themes = ['ultra-dark', 'dark', 'light'];
            const currentTheme = htmlElement.getAttribute('data-theme') || 'ultra-dark';
            const currentIndex = themes.indexOf(currentTheme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];

            htmlElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('gaming-theme', nextTheme);
            if (themeSelector) themeSelector.value = nextTheme;
        }

        if (e.key === 'Home' && !e.ctrlKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // =========================================
    // 16. CONSOLIDATED SCROLL HANDLER
    // =========================================
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateActiveNav();
                updateBackToTop();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    updateScrollProgress();
    updateActiveNav();
    updateBackToTop();

    // =========================================
    // 17. EASTER EGG - KONAMI CODE (Enhanced)
    // =========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const konamiLabels = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];
    let konamiIndex = 0;
    let konamiActive = false;
    let konamiTracker = null;
    let konamiTrackerTimeout = null;

    // Create the visual key tracker
    function createKonamiTracker() {
        if (konamiTracker) konamiTracker.remove();
        konamiTracker = document.createElement('div');
        konamiTracker.className = 'konami-tracker';
        konamiTracker.innerHTML = konamiLabels.map((label, i) =>
            `<div class="konami-key" data-index="${i}">${label}</div>`
        ).join('');
        document.body.appendChild(konamiTracker);
    }

    function showKonamiTracker() {
        if (!konamiTracker) createKonamiTracker();
        konamiTracker.classList.add('visible');
        clearTimeout(konamiTrackerTimeout);
        konamiTrackerTimeout = setTimeout(() => {
            hideKonamiTracker();
            konamiIndex = 0;
            resetKonamiKeys();
        }, 5000);
    }

    function hideKonamiTracker() {
        if (konamiTracker) konamiTracker.classList.remove('visible');
    }

    function resetKonamiKeys() {
        if (!konamiTracker) return;
        konamiTracker.querySelectorAll('.konami-key').forEach(k => {
            k.classList.remove('hit', 'wrong');
        });
    }

    function updateKonamiKey(index, success) {
        if (!konamiTracker) return;
        const key = konamiTracker.querySelector(`[data-index="${index}"]`);
        if (key) {
            key.classList.add(success ? 'hit' : 'wrong');
            if (!success) {
                setTimeout(() => resetKonamiKeys(), 400);
            }
        }
    }

    document.addEventListener('keydown', (e) => {
        if (konamiActive) return;
        const activeEl = document.activeElement;
        if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT') return;

        if (e.key === konamiCode[konamiIndex]) {
            showKonamiTracker();
            updateKonamiKey(konamiIndex, true);
            konamiIndex++;

            // Play a subtle tick sound
            playKonamiTick(konamiIndex);

            if (konamiIndex === konamiCode.length) {
                clearTimeout(konamiTrackerTimeout);
                konamiIndex = 0;
                setTimeout(() => {
                    hideKonamiTracker();
                    activateKonamiEasterEgg();
                }, 300);
            }
        } else if (konamiIndex > 0) {
            showKonamiTracker();
            updateKonamiKey(konamiIndex, false);
            konamiIndex = 0;
            // Check if this key starts a new sequence
            if (e.key === konamiCode[0]) {
                setTimeout(() => {
                    resetKonamiKeys();
                    updateKonamiKey(0, true);
                    konamiIndex = 1;
                }, 400);
            }
        }
    });

    // Konami tick sound - pitch rises with progress
    function playKonamiTick(step) {
        let ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { return; }
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        // Pitch rises as you progress through the code
        osc.frequency.value = 400 + (step * 80);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
    }

    // Power-up achievement sound
    function playKonamiPowerUp() {
        let ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { return; }
        const now = ctx.currentTime;

        // Ascending arpeggio - classic power-up feel
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1568.0];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = i < 3 ? 'square' : 'sine';
            osc.frequency.value = freq;
            const startT = now + i * 0.08;
            gain.gain.setValueAtTime(0, startT);
            gain.gain.linearRampToValueAtTime(0.1, startT + 0.02);
            gain.gain.setValueAtTime(0.1, startT + 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.2);
            osc.start(startT);
            osc.stop(startT + 0.2);
        });

        // Final sustained chord
        const chordFreqs = [523.25, 659.25, 783.99];
        chordFreqs.forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            const startT = now + 0.5;
            gain.gain.setValueAtTime(0, startT);
            gain.gain.linearRampToValueAtTime(0.07, startT + 0.05);
            gain.gain.setValueAtTime(0.07, startT + 0.4);
            gain.gain.exponentialRampToValueAtTime(0.001, startT + 1.2);
            osc.start(startT);
            osc.stop(startT + 1.2);
        });
    }

    // Spawn particle explosion
    function spawnKonamiParticles() {
        const container = document.createElement('div');
        container.className = 'konami-particles';
        document.body.appendChild(container);

        const emojis = ['🏆', '⭐', '🎮', '🎯', '🔥', '💎', '⚡', '🎖️', '✨', '🕹️', '👾', '🎪', '💥', '🌟', '🎆'];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'konami-particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            const angle = (Math.PI * 2 * i) / 30 + (Math.random() * 0.5 - 0.25);
            const distance = 150 + Math.random() * 250;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 50;
            const rot = Math.random() * 360 - 180;

            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.setProperty('--rot', rot + 'deg');
            particle.style.animationDelay = (Math.random() * 0.3) + 's';
            particle.style.fontSize = (1 + Math.random() * 1.5) + 'rem';

            container.appendChild(particle);
        }

        setTimeout(() => container.remove(), 3000);
    }

    // Achievement data pool
    const konamiAchievements = [
        {
            name: 'CODE BREAKER',
            desc: 'You entered the legendary Konami Code. This ancient cheat has been granting extra lives since 1986. You are now part of gaming history.',
            rarity: 'legendary',
            rarityLabel: 'LEGENDARY',
            xp: 1986,
            maxXp: 2000,
            unlocks: ['🎮 +30 Lives', '⭐ Infinite Continues', '🏆 Bragging Rights']
        },
        {
            name: 'RETRO WARRIOR',
            desc: 'The code that started it all. From Contra to Gradius, this sequence has saved millions of gamers from rage-quitting since the NES era.',
            rarity: 'legendary',
            rarityLabel: 'LEGENDARY',
            xp: 9999,
            maxXp: 10000,
            unlocks: ['👾 Retro Cred', '🕹️ Old School Status', '💎 Diamond Hands']
        },
        {
            name: 'SECRET HUNTER',
            desc: 'Most players never find this. You are not most players. Your curiosity and persistence have been rewarded, fellow gamer.',
            rarity: 'epic',
            rarityLabel: 'EPIC',
            xp: 777,
            maxXp: 1000,
            unlocks: ['🔍 Eagle Eyes', '🗝️ Master Key', '✨ Hidden Power']
        },
        {
            name: 'UP UP AND AWAY',
            desc: '↑↑↓↓←→←→BA — The most famous cheat code in gaming history. Kazuhisa Hashimoto created it while testing Gradius. Thank you, legend.',
            rarity: 'legendary',
            rarityLabel: 'LEGENDARY',
            xp: 1337,
            maxXp: 1337,
            unlocks: ['🎖️ Elite Status', '⚡ God Mode', '🌟 Max Power']
        }
    ];

    function activateKonamiEasterEgg() {
        if (konamiActive) return;
        konamiActive = true;

        const achievement = konamiAchievements[Math.floor(Math.random() * konamiAchievements.length)];
        const konamiCount = parseInt(localStorage.getItem('konami-count') || '0') + 1;
        localStorage.setItem('konami-count', konamiCount.toString());

        // Flash effect
        const flash = document.createElement('div');
        flash.className = 'konami-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.classList.add('flash-gold'), 50);

        // Play power-up sound
        playKonamiPowerUp();

        // Spawn particles
        setTimeout(() => spawnKonamiParticles(), 200);

        // Build achievement overlay
        const overlay = document.createElement('div');
        overlay.className = 'konami-overlay';

        const now = new Date();
        const timestamp = now.toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        overlay.innerHTML = `
            <div class="konami-card">
                <div class="konami-card-header">
                    <div class="konami-card-header-left">
                        <div class="konami-trophy">🏆</div>
                        <div>
                            <div class="konami-card-label">ACHIEVEMENT UNLOCKED</div>
                            <div class="konami-card-title">KONAMI CODE</div>
                        </div>
                    </div>
                    <div class="konami-rarity ${achievement.rarity}">${achievement.rarityLabel}</div>
                </div>
                <div class="konami-card-body">
                    <div class="konami-achievement-name">${achievement.name}</div>
                    <div class="konami-achievement-desc">${achievement.desc}</div>

                    <div class="konami-xp-section">
                        <div class="konami-xp-header">
                            <span class="konami-xp-label">ACHIEVEMENT XP</span>
                            <span class="konami-xp-value">+${achievement.xp.toLocaleString()} / ${achievement.maxXp.toLocaleString()} XP</span>
                        </div>
                        <div class="konami-xp-bar">
                            <div class="konami-xp-fill" data-target="${(achievement.xp / achievement.maxXp) * 100}"></div>
                        </div>
                    </div>

                    <div class="konami-stats-row">
                        <div class="konami-stat">
                            <div class="konami-stat-value">#${konamiCount}</div>
                            <div class="konami-stat-label">Times Found</div>
                        </div>
                        <div class="konami-stat">
                            <div class="konami-stat-value">10</div>
                            <div class="konami-stat-label">Keys Pressed</div>
                        </div>
                        <div class="konami-stat">
                            <div class="konami-stat-value">0.1%</div>
                            <div class="konami-stat-label">Players Found</div>
                        </div>
                    </div>

                    <div class="konami-unlocked">
                        <div class="konami-unlocked-title">— REWARDS UNLOCKED —</div>
                        <div class="konami-unlocked-items">
                            ${achievement.unlocks.map(u => `<div class="konami-unlocked-item">${u}</div>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="konami-card-footer">
                    <div class="konami-timestamp">${timestamp}</div>
                    <div class="konami-close-hint"><span>CLICK</span> or <span>ESC</span> to close</div>
                    <div class="konami-auto-close"></div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(() => {
            overlay.classList.add('active');
            const card = overlay.querySelector('.konami-card');
            setTimeout(() => card.classList.add('revealed'), 100);

            // Animate XP bar fill
            const xpFill = overlay.querySelector('.konami-xp-fill');
            if (xpFill) {
                const target = xpFill.getAttribute('data-target');
                setTimeout(() => { xpFill.style.width = target + '%'; }, 50);
            }
        });

        // Auto-close after 12 seconds
        let autoCloseTimer = setTimeout(() => closeKonamiOverlay(), 12000);

        function closeKonamiOverlay() {
            clearTimeout(autoCloseTimer);
            const card = overlay.querySelector('.konami-card');
            if (card) card.classList.add('dismissed');
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                flash.remove();
                konamiActive = false;
            }, 500);
        }

        // Click to close
        overlay.addEventListener('click', closeKonamiOverlay);

        // ESC to close
        function handleKonamiKey(e) {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                closeKonamiOverlay();
                document.removeEventListener('keydown', handleKonamiKey);
            }
        }
        document.addEventListener('keydown', handleKonamiKey);
    }

    // =========================================
    // 18. SECTION VISIT COUNTER (Fun Feature)
    // =========================================
    const allSections = document.querySelectorAll('section[id]');
    const visitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const visits = parseInt(localStorage.getItem('visit_' + id) || '0') + 1;
                localStorage.setItem('visit_' + id, visits.toString());
            }
        });
    }, { threshold: 0.3 });

    allSections.forEach(section => visitObserver.observe(section));

    // =========================================
    // 19. SOUND EFFECT ON HOVER (Opt-in subtle)
    // =========================================
    let audioCtx = null;

    function playHoverSound() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) { return; }
        }
        try {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) { /* silently fail */ }
    }

    const soundLinks = document.querySelectorAll('.gaming-nav a, .steam-link');
    soundLinks.forEach(link => {
        link.addEventListener('mouseenter', playHoverSound);
    });

    // =========================================
    // 20. MGS EASTER EGG - TYPE "SNAKE"
    // =========================================
    const mgsCode = ['s', 'n', 'a', 'k', 'e'];
    let mgsIndex = 0;
    let mgsActive = false;

    // MGS Alert Sound using Web Audio API
    function playMGSAlertSound() {
        let ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { return; }

        const now = ctx.currentTime;

        // The iconic "!" alert sound - a sharp rising tone
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.type = 'square';
        osc1.frequency.setValueAtTime(900, now);
        osc1.frequency.linearRampToValueAtTime(1800, now + 0.08);
        osc1.frequency.setValueAtTime(1800, now + 0.08);
        gain1.gain.setValueAtTime(0.15, now);
        gain1.gain.setValueAtTime(0.15, now + 0.08);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc1.start(now);
        osc1.stop(now + 0.5);

        // Add a secondary harmonic
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(1200, now);
        osc2.frequency.linearRampToValueAtTime(2400, now + 0.06);
        gain2.gain.setValueAtTime(0.06, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc2.start(now);
        osc2.stop(now + 0.35);
    }

    // Codec beep sound
    function playCodecBeep() {
        let ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { return; }
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 1000;
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    // Codec call ring
    function playCodecRing() {
        let ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) { return; }
        const now = ctx.currentTime;
        // Ring pattern: beep-beep ... beep-beep
        for (let i = 0; i < 4; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = i % 2 === 0 ? 1100 : 900;
            const startT = now + i * 0.18;
            gain.gain.setValueAtTime(0, startT);
            gain.gain.linearRampToValueAtTime(0.06, startT + 0.02);
            gain.gain.setValueAtTime(0.06, startT + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.14);
            osc.start(startT);
            osc.stop(startT + 0.14);
        }
    }

    // MGS Codec dialogue sequences
    const codecDialogues = [
        {
            speaker: 'COLONEL',
            portrait: '🎖️',
            frequency: '140.85',
            lines: [
                "Snake, do you copy? This is a codec call.",
                "Your mission is to infiltrate this gaming page and gather intel on the target's setup.",
                "Be careful, Snake. The enemy has... a GTX 970. Threat level: potato.",
                "Remember, this is a sneaking mission. Try not to get spotted... again."
            ]
        },
        {
            speaker: 'OTACON',
            portrait: '🤓',
            frequency: '141.12',
            lines: [
                "Snake! It's me, Otacon!",
                "I've been analyzing this page's code. It's... actually pretty clean. Kojima would be proud.",
                "Did you know there's a Konami Code easter egg too? ↑↑↓↓←→←→BA",
                "The developer claims 8000+ hours of gaming but zero kills. That's... impressive? In a sad way."
            ]
        },
        {
            speaker: 'SNAKE',
            portrait: '🐍',
            frequency: '140.96',
            lines: [
                "...Kept you waiting, huh?",
                "This page... it reminds me of the old days. Back when gaming was simple.",
                "Silver rank in CS2... I've seen worse. At least they're honest about it.",
                "Stealth breaks and hell breaks loose... sounds like every one of my missions."
            ]
        },
        {
            speaker: 'MILLER',
            portrait: '😎',
            frequency: '141.80',
            lines: [
                "Boss! Welcome back to Mother Base... I mean, this gaming page.",
                "We've analyzed the target's battlestation. The setup is... functional.",
                "A 5-year-old mousepad? Now THAT'S tactical espionage action.",
                "They're playing us like a damn fiddle! ...Actually they're playing CS2. Close enough."
            ]
        }
    ];

    function activateMGSEasterEgg() {
        if (mgsActive) return;
        mgsActive = true;

        // Phase 1: Screen flash + "!" alert
        const flash = document.createElement('div');
        flash.className = 'mgs-flash';
        document.body.appendChild(flash);

        const alertOverlay = document.createElement('div');
        alertOverlay.className = 'mgs-alert-overlay';
        alertOverlay.innerHTML = '<div class="mgs-exclamation">!</div>';
        document.body.appendChild(alertOverlay);
        alertOverlay.classList.add('active');

        // Play alert sound
        playMGSAlertSound();

        // Flash screen
        setTimeout(() => flash.classList.add('active'), 50);

        // Pop the exclamation mark
        const excl = alertOverlay.querySelector('.mgs-exclamation');
        setTimeout(() => excl.classList.add('pop'), 100);

        // Fade out exclamation, then show codec
        setTimeout(() => {
            excl.classList.remove('pop');
            excl.classList.add('fade');
        }, 1800);

        setTimeout(() => {
            alertOverlay.remove();
            flash.remove();

            // Phase 2: Codec screen
            playCodecRing();
            setTimeout(() => showCodecScreen(), 800);
        }, 2300);
    }

    function showCodecScreen() {
        const dialogueSet = codecDialogues[Math.floor(Math.random() * codecDialogues.length)];
        let currentLine = 0;

        const codecOverlay = document.createElement('div');
        codecOverlay.className = 'mgs-codec-overlay';
        codecOverlay.innerHTML = `
            <div class="mgs-codec">
                <div class="codec-header">
                    <div>
                        <div class="codec-label">CODEC</div>
                        <div class="codec-frequency">${dialogueSet.frequency}</div>
                    </div>
                    <div class="codec-status">● CONNECTED</div>
                </div>
                <div class="codec-body">
                    <div class="codec-portrait">
                        <div class="codec-portrait-inner">${dialogueSet.portrait}</div>
                    </div>
                    <div class="codec-dialogue">
                        <div class="codec-speaker">${dialogueSet.speaker}</div>
                        <div class="codec-text"></div>
                    </div>
                </div>
                <div class="codec-footer">
                    <div class="codec-hint">CLICK OR PRESS SPACE TO ADVANCE</div>
                    <div class="codec-dots">
                        ${dialogueSet.lines.map((_, i) => `<div class="codec-dot${i === 0 ? ' active' : ''}"></div>`).join('')}
                    </div>
                </div>
                <div class="codec-nav-hint">ESC TO CLOSE</div>
            </div>
        `;

        document.body.appendChild(codecOverlay);

        // Fade in
        requestAnimationFrame(() => {
            codecOverlay.classList.add('visible');
        });

        const textEl = codecOverlay.querySelector('.codec-text');
        const dots = codecOverlay.querySelectorAll('.codec-dot');
        let isTyping = false;
        let typeTimeout = null;

        // Type out text character by character
        function typeCodecText(text, callback) {
            isTyping = true;
            textEl.innerHTML = '';
            let i = 0;

            function typeChar() {
                if (i < text.length) {
                    textEl.innerHTML = text.substring(0, i + 1) + '<span class="codec-cursor">_</span>';
                    i++;
                    // Vary typing speed slightly
                    const speed = text[i-1] === '.' ? 120 : text[i-1] === ',' ? 80 : 25 + Math.random() * 20;
                    typeTimeout = setTimeout(typeChar, speed);
                } else {
                    textEl.innerHTML = text + '<span class="codec-cursor">_</span>';
                    isTyping = false;
                    if (callback) callback();
                }
            }
            typeChar();
        }

        // Skip typing animation
        function skipTyping() {
            if (typeTimeout) clearTimeout(typeTimeout);
            isTyping = false;
            textEl.innerHTML = dialogueSet.lines[currentLine] + '<span class="codec-cursor">_</span>';
        }

        // Advance dialogue
        function advanceDialogue() {
            playCodecBeep();

            if (isTyping) {
                skipTyping();
                return;
            }

            currentLine++;
            if (currentLine >= dialogueSet.lines.length) {
                closeCodec();
                return;
            }

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i <= currentLine);
            });

            typeCodecText(dialogueSet.lines[currentLine]);
        }

        function closeCodec() {
            if (typeTimeout) clearTimeout(typeTimeout);
            codecOverlay.classList.remove('visible');
            setTimeout(() => {
                codecOverlay.remove();
                mgsActive = false;
            }, 500);
        }

        // Event listeners
        codecOverlay.addEventListener('click', (e) => {
            advanceDialogue();
        });

        function handleCodecKey(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                advanceDialogue();
            } else if (e.key === 'Escape') {
                closeCodec();
                document.removeEventListener('keydown', handleCodecKey);
            }
        }
        document.addEventListener('keydown', handleCodecKey);

        // Start first line
        typeCodecText(dialogueSet.lines[0]);
    }

    // Listen for "snake" typed on keyboard
    document.addEventListener('keydown', (e) => {
        if (mgsActive) return;
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT') return;

        if (e.key.toLowerCase() === mgsCode[mgsIndex]) {
            mgsIndex++;
            if (mgsIndex === mgsCode.length) {
                mgsIndex = 0;
                activateMGSEasterEgg();
            }
        } else {
            mgsIndex = 0;
            if (e.key.toLowerCase() === mgsCode[0]) {
                mgsIndex = 1;
            }
        }
    });

    // =========================================
    // 21. EASTER EGG COUNTER SYSTEM
    // =========================================
    const eggCounter = document.querySelector('.egg-counter');
    const eggCounterText = document.querySelector('.egg-counter-text');
    const totalEggs = 6;
    let foundEggs = new Set(JSON.parse(localStorage.getItem('found-eggs') || '[]'));

    function updateEggCounter(eggName) {
        foundEggs.add(eggName);
        localStorage.setItem('found-eggs', JSON.stringify([...foundEggs]));
        if (eggCounter && eggCounterText) {
            eggCounterText.textContent = foundEggs.size + '/' + totalEggs;
            eggCounter.classList.add('visible');
            eggCounter.setAttribute('data-tooltip', 'Easter eggs found: ' + [...foundEggs].join(', '));
            eggCounter.classList.remove('pulse');
            void eggCounter.offsetWidth;
            eggCounter.classList.add('pulse');

            if (foundEggs.size === totalEggs) {
                eggCounterText.textContent = '6/6 ★';
                eggCounterText.style.color = '#f5b942';
            }
        }
    }

    // Show counter if eggs already found
    if (foundEggs.size > 0 && eggCounter && eggCounterText) {
        eggCounterText.textContent = foundEggs.size + '/' + totalEggs;
        eggCounter.classList.add('visible');
        eggCounter.setAttribute('data-tooltip', 'Easter eggs found: ' + [...foundEggs].join(', '));
        if (foundEggs.size === totalEggs) {
            eggCounterText.textContent = '6/6 ★';
            eggCounterText.style.color = '#f5b942';
        }
    }

    // Patch existing easter eggs to track discovery
    const origKonami = activateKonamiEasterEgg;
    activateKonamiEasterEgg = function() {
        updateEggCounter('Konami');
        origKonami();
    };

    const origMGS = activateMGSEasterEgg;
    activateMGSEasterEgg = function() {
        updateEggCounter('Snake');
        origMGS();
    };

    // =========================================
    // 22. DOOM EASTER EGG - TYPE "IDDQD"
    // =========================================
    const doomCode = ['i', 'd', 'd', 'q', 'd'];
    let doomIndex = 0;
    let doomActive = false;

    function playDoomSound() {
        let ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { return; }
        const now = ctx.currentTime;

        // Heavy distorted power chord feel
        const freqs = [82.41, 110, 164.81]; // E2, A2, E3
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const distortion = ctx.createWaveShaper();

            // Create distortion curve
            const samples = 44100;
            const curve = new Float32Array(samples);
            for (let s = 0; s < samples; s++) {
                const x = (s * 2) / samples - 1;
                curve[s] = (Math.PI + 200) * x / (Math.PI + 200 * Math.abs(x));
            }
            distortion.curve = curve;
            distortion.oversample = '4x';

            osc.connect(distortion);
            distortion.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.value = freq;
            const startT = now + i * 0.03;
            gain.gain.setValueAtTime(0, startT);
            gain.gain.linearRampToValueAtTime(0.08, startT + 0.05);
            gain.gain.setValueAtTime(0.08, startT + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, startT + 1.5);
            osc.start(startT);
            osc.stop(startT + 1.5);
        });

        // Impact hit
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseData.length; i++) {
            noiseData[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const noiseGain = ctx.createGain();
        noise.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseGain.gain.setValueAtTime(0.12, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        noise.start(now);
        noise.stop(now + 0.3);
    }

    const doomMessages = [
        { title: 'GOD MODE', subtitle: 'ACTIVATED', desc: 'Degreelessness mode engaged. You are now invulnerable. No damage can touch you. Not even Silver rank matchmaking.', icon: '💀' },
        { title: 'IDDQD', subtitle: 'CHEAT ENABLED', desc: 'The original god mode cheat from DOOM (1993). id Software changed gaming forever. You just typed gaming history.', icon: '🔥' },
        { title: 'IMMORTAL', subtitle: 'STATUS ACHIEVED', desc: 'Health locked at 100%. Armor at max. The demons fear you. The Silver lobby fears you. Nothing can stop you now.', icon: '⚡' }
    ];

    function activateDoomEasterEgg() {
        if (doomActive) return;
        doomActive = true;
        updateEggCounter('DOOM');

        const msg = doomMessages[Math.floor(Math.random() * doomMessages.length)];

        // Flash
        const flash = document.createElement('div');
        flash.className = 'doom-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.classList.add('active'), 50);

        // Sound
        playDoomSound();

        // Brief red tint on body
        document.body.classList.add('doom-mode');

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'doom-overlay';
        overlay.innerHTML = `
            <div class="doom-vignette"></div>
            <div class="doom-card">
                <div class="doom-icon">${msg.icon}</div>
                <div class="doom-title">${msg.title}</div>
                <div class="doom-subtitle">${msg.subtitle}</div>
                <div class="doom-desc">${msg.desc}</div>
                <div class="doom-stats">
                    <div class="doom-stat">
                        <div class="doom-stat-value">100%</div>
                        <div class="doom-stat-label">Health</div>
                    </div>
                    <div class="doom-stat">
                        <div class="doom-stat-value">200%</div>
                        <div class="doom-stat-label">Armor</div>
                    </div>
                    <div class="doom-stat">
                        <div class="doom-stat-value">∞</div>
                        <div class="doom-stat-label">Ammo</div>
                    </div>
                </div>
                <div class="doom-close"><span>CLICK</span> or <span>ESC</span> to close</div>
            </div>
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            const card = overlay.querySelector('.doom-card');
            setTimeout(() => card.classList.add('revealed'), 100);
        });

        let autoTimer = setTimeout(() => closeDoom(), 10000);

        function closeDoom() {
            clearTimeout(autoTimer);
            const card = overlay.querySelector('.doom-card');
            if (card) card.classList.add('dismissed');
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                flash.remove();
                document.body.classList.remove('doom-mode');
                doomActive = false;
            }, 400);
        }

        overlay.addEventListener('click', closeDoom);

        function handleDoomKey(e) {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                closeDoom();
                document.removeEventListener('keydown', handleDoomKey);
            }
        }
        document.addEventListener('keydown', handleDoomKey);
    }

    // Listen for "iddqd"
    document.addEventListener('keydown', (e) => {
        if (doomActive) return;
        const activeEl = document.activeElement;
        if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT') return;

        if (e.key.toLowerCase() === doomCode[doomIndex]) {
            doomIndex++;
            if (doomIndex === doomCode.length) {
                doomIndex = 0;
                activateDoomEasterEgg();
            }
        } else {
            doomIndex = 0;
            if (e.key.toLowerCase() === doomCode[0]) {
                doomIndex = 1;
            }
        }
    });

    // =========================================
    // 23. GG EASTER EGG - TYPE "GG"
    // =========================================
    const ggCode = ['g', 'g'];
    let ggIndex = 0;
    let ggActive = false;
    let ggLastKeyTime = 0;

    function playGGSound() {
        let ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { return; }
        const now = ctx.currentTime;

        // Victory fanfare
        const melody = [
            { freq: 523.25, start: 0, dur: 0.15 },
            { freq: 659.25, start: 0.12, dur: 0.15 },
            { freq: 783.99, start: 0.24, dur: 0.15 },
            { freq: 1046.5, start: 0.36, dur: 0.4 },
            { freq: 783.99, start: 0.36, dur: 0.4 },
            { freq: 659.25, start: 0.36, dur: 0.4 }
        ];

        melody.forEach(note => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.value = note.freq;
            const t = now + note.start;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
            gain.gain.setValueAtTime(0.07, t + note.dur * 0.7);
            gain.gain.exponentialRampToValueAtTime(0.001, t + note.dur);
            osc.start(t);
            osc.stop(t + note.dur);
        });
    }

    function spawnConfetti() {
        const container = document.createElement('div');
        container.className = 'gg-confetti-container';
        document.body.appendChild(container);

        const colors = ['#de9b35', '#f5b942', '#5cb85c', '#4a90d9', '#c44b4b', '#a855f7', '#ffffff', '#f5c842'];

        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'gg-confetti';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 6 + Math.random() * 10;
            const isRect = Math.random() > 0.5;
            confetti.style.cssText = `
                left: ${Math.random() * 100}%;
                width: ${size}px;
                height: ${isRect ? size * 2 : size}px;
                background: ${color};
                border-radius: ${isRect ? '2px' : '50%'};
                animation-duration: ${2 + Math.random() * 3}s;
                animation-delay: ${Math.random() * 1}s;
            `;
            container.appendChild(confetti);
        }

        setTimeout(() => container.remove(), 6000);
    }

    const ggScoreboards = [
        {
            result: 'VICTORY',
            score: '16 - 14',
            type: 'COMPETITIVE • DUST II',
            players: [
                { name: '★ You (MVP)', k: 32, d: 18, a: 7, mvp: true },
                { name: 'xX_ProGamer_Xx', k: 25, d: 20, a: 5, mvp: false },
                { name: 'silverboi420', k: 18, d: 22, a: 9, mvp: false },
                { name: 'clutchOrKick', k: 21, d: 19, a: 3, mvp: false },
                { name: 'theBottomFragger', k: 8, d: 24, a: 12, mvp: false }
            ]
        },
        {
            result: 'MATCH COMPLETE',
            score: '13 - 11',
            type: 'PREMIER • MIRAGE',
            players: [
                { name: '★ You (MVP)', k: 28, d: 15, a: 4, mvp: true },
                { name: 'AimAssist_Andy', k: 22, d: 17, a: 8, mvp: false },
                { name: 'IHaveAFamilyPls', k: 15, d: 19, a: 6, mvp: false },
                { name: 'WhyAmIHere', k: 19, d: 16, a: 11, mvp: false },
                { name: 'AFKSimulator', k: 3, d: 22, a: 1, mvp: false }
            ]
        },
        {
            result: 'FLAWLESS VICTORY',
            score: '13 - 0',
            type: 'UNRANKED • NUKE',
            players: [
                { name: '★ You (MVP)', k: 42, d: 3, a: 2, mvp: true },
                { name: 'SmurfAlert', k: 35, d: 5, a: 6, mvp: false },
                { name: 'JustVibing', k: 20, d: 8, a: 10, mvp: false },
                { name: 'CasualGamer', k: 15, d: 10, a: 8, mvp: false },
                { name: 'FirstTimePlaying', k: 12, d: 7, a: 4, mvp: false }
            ]
        }
    ];

    function activateGGEasterEgg() {
        if (ggActive) return;
        ggActive = true;
        updateEggCounter('GG');

        const scoreboard = ggScoreboards[Math.floor(Math.random() * ggScoreboards.length)];

        playGGSound();
        spawnConfetti();

        const overlay = document.createElement('div');
        overlay.className = 'gg-overlay';
        overlay.innerHTML = `
            <div class="gg-scoreboard">
                <div class="gg-header">
                    <div class="gg-header-left">
                        <div class="gg-trophy-icon">🏆</div>
                        <div>
                            <div class="gg-match-result">${scoreboard.result}</div>
                            <div class="gg-match-type">${scoreboard.type}</div>
                        </div>
                    </div>
                    <div class="gg-score">${scoreboard.score}</div>
                </div>
                <div class="gg-body">
                    <div class="gg-stats-header">
                        <span>Player</span>
                        <div class="gg-stats-header-right">
                            <span>K</span>
                            <span>D</span>
                            <span>A</span>
                        </div>
                    </div>
                    ${scoreboard.players.map((p, i) => `
                        <div class="gg-player-row${p.mvp ? ' mvp' : ''}" style="animation-delay: ${0.3 + i * 0.15}s">
                            <div class="gg-player-name">
                                <span>${p.name}</span>
                            </div>
                            <div class="gg-player-stats">
                                <span>${p.k}</span>
                                <span>${p.d}</span>
                                <span>${p.a}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="gg-footer">
                    <div class="gg-footer-text">GG WP • Well Played</div>
                    <div class="gg-footer-close"><span>CLICK</span> or <span>ESC</span> to close</div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            const board = overlay.querySelector('.gg-scoreboard');
            setTimeout(() => board.classList.add('revealed'), 100);
        });

        let autoTimer = setTimeout(() => closeGG(), 12000);

        function closeGG() {
            clearTimeout(autoTimer);
            const board = overlay.querySelector('.gg-scoreboard');
            if (board) board.classList.add('dismissed');
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                ggActive = false;
            }, 400);
        }

        overlay.addEventListener('click', closeGG);

        function handleGGKey(e) {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                closeGG();
                document.removeEventListener('keydown', handleGGKey);
            }
        }
        document.addEventListener('keydown', handleGGKey);
    }

    // Listen for "gg" typed quickly
    document.addEventListener('keydown', (e) => {
        if (ggActive || doomActive || konamiActive || mgsActive) return;
        const activeEl = document.activeElement;
        if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT') return;

        const now = Date.now();
        if (e.key.toLowerCase() === ggCode[ggIndex]) {
            if (ggIndex === 0) {
                ggLastKeyTime = now;
                ggIndex = 1;
            } else if (now - ggLastKeyTime < 500) {
                ggIndex = 0;
                activateGGEasterEgg();
            } else {
                ggLastKeyTime = now;
                ggIndex = 1;
            }
        } else {
            ggIndex = 0;
        }
    });

    // =========================================
    // 24. BARREL ROLL EASTER EGG - TYPE "BARREL"
    // =========================================
    const barrelCode = ['b', 'a', 'r', 'r', 'e', 'l'];
    let barrelIndex = 0;
    let barrelActive = false;

    function playBarrelSound() {
        let ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { return; }
        const now = ctx.currentTime;

        // Swoosh sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.5);
        osc.frequency.exponentialRampToValueAtTime(200, now + 1.0);
        osc.frequency.exponentialRampToValueAtTime(800, now + 1.5);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.setValueAtTime(0.08, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
        osc.start(now);
        osc.stop(now + 1.6);

        // Whoosh noise
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseData.length; i++) {
            noiseData[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const noiseGain = ctx.createGain();
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1000;
        noiseFilter.Q.value = 0.5;
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseGain.gain.setValueAtTime(0.03, now);
        noiseGain.gain.setValueAtTime(0.03, now + 1.2);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        noise.start(now);
        noise.stop(now + 1.5);
    }

    function activateBarrelRoll() {
        if (barrelActive) return;
        barrelActive = true;
        updateEggCounter('Barrel');

        playBarrelSound();

        document.body.classList.add('barrel-rolling');

        // Toast message
        const toast = document.createElement('div');
        toast.className = 'barrel-toast';
        toast.innerHTML = `
            <div class="barrel-toast-icon">🛩️</div>
            <div class="barrel-toast-title">DO A BARREL ROLL!</div>
            <div class="barrel-toast-subtitle">— Peppy Hare, Star Fox 64</div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 200);

        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hide');
        }, 2000);

        setTimeout(() => {
            document.body.classList.remove('barrel-rolling');
            toast.remove();
            barrelActive = false;
        }, 2500);
    }

    // Listen for "barrel"
    document.addEventListener('keydown', (e) => {
        if (barrelActive) return;
        const activeEl = document.activeElement;
        if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT') return;

        if (e.key.toLowerCase() === barrelCode[barrelIndex]) {
            barrelIndex++;
            if (barrelIndex === barrelCode.length) {
                barrelIndex = 0;
                activateBarrelRoll();
            }
        } else {
            barrelIndex = 0;
            if (e.key.toLowerCase() === barrelCode[0]) {
                barrelIndex = 1;
            }
        }
    });

    // =========================================
    // 25. RAPID CLICK "0 KILLS" EASTER EGG
    // =========================================
    const killsStat = document.querySelector('.quick-stat[data-tooltip="Confirmed kills: none"]');
    let killClickCount = 0;
    let killClickTimer = null;
    let killEggActive = false;

    const killMessages = [
        { icon: '💀', title: 'STILL ZERO', desc: 'You clicked the 0 kills counter 10 times. It\'s still zero. Were you expecting it to change? That\'s not how this works.', counter: '0' },
        { icon: '🎯', title: 'PACIFIST MODE', desc: 'Achievement unlocked: Pacifist. 8000+ hours of gaming and zero kills. That takes real dedication... or a complete lack of aim.', counter: '0' },
        { icon: '👻', title: 'GHOST PLAYER', desc: 'You exist in the game, but do you really? Zero kills, zero impact, zero evidence you were ever there. A true ghost.', counter: '0' },
        { icon: '😅', title: 'NICE TRY', desc: 'No matter how many times you click, the kill counter stays at zero. Some things in life are constant: death, taxes, and this kill count.', counter: '0' }
    ];

    if (killsStat) {
        killsStat.style.cursor = 'pointer';

        killsStat.addEventListener('click', () => {
            if (killEggActive) return;

            killClickCount++;

            // Visual feedback on each click
            const statVal = killsStat.querySelector('.stat-value');
            if (statVal) {
                statVal.classList.add('kill-glitch');
                setTimeout(() => statVal.classList.remove('kill-glitch'), 150);

                // Show funny temp values
                const funnyVals = ['0', '-1', 'NaN', '0', '???', '0', 'lol', '0', 'nope', '0'];
                if (killClickCount <= 10) {
                    statVal.textContent = funnyVals[killClickCount - 1] || '0';
                    if (killClickCount < 10) {
                        setTimeout(() => { statVal.textContent = '0'; }, 300);
                    }
                }
            }

            clearTimeout(killClickTimer);
            killClickTimer = setTimeout(() => {
                killClickCount = 0;
                if (statVal) statVal.textContent = '0';
            }, 2000);

            if (killClickCount >= 10) {
                killClickCount = 0;
                clearTimeout(killClickTimer);
                killEggActive = true;
                updateEggCounter('0 Kills');

                const msg = killMessages[Math.floor(Math.random() * killMessages.length)];

                // Play error-like sound
                let ctx;
                try {
                    ctx = new (window.AudioContext || window.webkitAudioContext)();
                } catch (ex) {}
                if (ctx) {
                    const now = ctx.currentTime;
                    // Error buzzer
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'square';
                    osc.frequency.value = 150;
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.setValueAtTime(0.08, now + 0.15);
                    gain.gain.setValueAtTime(0, now + 0.2);
                    gain.gain.setValueAtTime(0.08, now + 0.3);
                    gain.gain.setValueAtTime(0.08, now + 0.45);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                    osc.start(now);
                    osc.stop(now + 0.6);
                }

                // Create popup
                const bgOverlay = document.createElement('div');
                bgOverlay.className = 'kill-popup-overlay';
                document.body.appendChild(bgOverlay);

                const popup = document.createElement('div');
                popup.className = 'kill-popup';
                popup.innerHTML = `
                    <div class="kill-popup-icon">${msg.icon}</div>
                    <div class="kill-popup-title">${msg.title}</div>
                    <div class="kill-popup-desc">${msg.desc}</div>
                    <div class="kill-popup-counter">${msg.counter}</div>
                    <div class="kill-popup-counter-label">TOTAL KILLS (FOREVER)</div>
                    <div class="kill-popup-close"><span>CLICK</span> to close</div>
                `;
                document.body.appendChild(popup);

                requestAnimationFrame(() => {
                    bgOverlay.classList.add('active');
                    popup.classList.add('show');
                });

                if (statVal) statVal.textContent = '0';

                function closeKillPopup() {
                    popup.classList.remove('show');
                    popup.classList.add('hide');
                    bgOverlay.classList.remove('active');
                    setTimeout(() => {
                        popup.remove();
                        bgOverlay.remove();
                        killEggActive = false;
                    }, 400);
                }

                popup.addEventListener('click', closeKillPopup);
                bgOverlay.addEventListener('click', closeKillPopup);

                function handleKillKey(e) {
                    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        closeKillPopup();
                        document.removeEventListener('keydown', handleKillKey);
                    }
                }
                document.addEventListener('keydown', handleKillKey);

                setTimeout(() => {
                    if (killEggActive) closeKillPopup();
                }, 10000);
            }
        });
    }

});