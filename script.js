// ===== INTERACTIVE ANIMATIONS & EFFECTS =====

document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated sections
    const animatedElements = document.querySelectorAll('.victory-section, .message-section, .cta-section, .stats-section');
    animatedElements.forEach(el => observer.observe(el));

    // Add particle effect on button hover
    const driveButton = document.getElementById('driveButton');

    if (driveButton) {
        driveButton.addEventListener('mouseenter', createParticles);
        driveButton.addEventListener('click', celebrateClick);
    }

    // Create floating particles
    function createParticles(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #a855f7, #ec4899);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                animation: particleFloat 1s ease-out forwards;
            `;

            const angle = (Math.PI * 2 * i) / 5;
            const velocity = 100;
            particle.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Celebration effect on button click
    function celebrateClick(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();

        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            const colors = ['#a855f7', '#ec4899', '#fbbf24', '#06b6d4', '#f59e0b'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${randomColor};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                animation: confettiFall ${Math.random() * 2 + 1}s ease-out forwards;
            `;

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 200 + 100;
            confetti.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
            confetti.style.setProperty('--ty', `${Math.sin(angle) * velocity - 100}px`);
            confetti.style.setProperty('--rotation', `${Math.random() * 720}deg`);

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }
    }

    // Add dynamic gradient animation to title
    const titleLine = document.querySelector('.title-line');
    if (titleLine) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            titleLine.style.filter = `hue-rotate(${hue}deg)`;
        }, 50);
    }

    // Add parallax effect to trophy icon
    const trophyIcon = document.querySelector('.trophy-icon');
    if (trophyIcon) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            trophyIcon.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
        });
    }

    // Add hover effect to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to message (optional enhancement)
    const messageHighlight = document.querySelector('.message-highlight');
    if (messageHighlight) {
        const originalText = messageHighlight.textContent;
        messageHighlight.textContent = '';
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < originalText.length) {
                messageHighlight.textContent += originalText[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }

    // Add cursor trail effect
    let cursorTrail = [];
    const maxTrailLength = 10;

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { // Only on desktop
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: trailFade 0.5s ease-out forwards;
            `;

            document.body.appendChild(trail);
            cursorTrail.push(trail);

            if (cursorTrail.length > maxTrailLength) {
                const oldTrail = cursorTrail.shift();
                oldTrail.remove();
            }

            setTimeout(() => trail.remove(), 500);
        }
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) rotate(var(--rotation));
            opacity: 0;
        }
    }
    
    @keyframes trailFade {
        0% {
            transform: scale(1);
            opacity: 0.8;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console message for developers
console.log('%c🏆 ¡LAS CAMPEONAS 2026! 🏆', 'font-size: 24px; font-weight: bold; color: #a855f7; text-shadow: 2px 2px 4px rgba(168, 85, 247, 0.5);');
console.log('%cFamilia Salhuana - Torneo de Juegos de Mentalidad y Trabajo en Equipo', 'font-size: 14px; color: #ec4899;');
console.log('%c¡Que 2026 sea extraordinario! ✨', 'font-size: 12px; color: #fbbf24;');
