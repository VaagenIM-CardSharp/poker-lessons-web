import './styles/main.scss';

const HALF_ARC = Math.PI;
const ROTATION_SPEED = 0.02; // fraction of a full lap per second
const MOBILE_BREAKPOINT = 768;
const REDUCE_MOTION_QUERY = window.matchMedia('(prefers-reduced-motion: reduce)');
const MOBILE_QUERY = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

function applyCardVariables(cards) {
    cards.forEach((card) => {
        const { gradient, glow, accent } = card.dataset;

        if (gradient) card.style.setProperty('--card-gradient', gradient);
        if (glow) card.style.setProperty('--card-glow', glow);
        if (accent) card.style.setProperty('--card-accent', accent);
    });
}

function initHeroOrbit(root = document.querySelector('.hero')) {
    if (!root) return;

    const track = root.querySelector('[data-hero-cards]');
    const cards = Array.from(track?.querySelectorAll('.hero-card') ?? []);
    if (!track || !cards.length) return;

    applyCardVariables(cards);

    let progress = 0;
    let lastTimestamp = 0;
    let radiusX = 0;
    let radiusY = 0;
    let depth = 0;
    let animationFrame = null;

    const cardCount = cards.length;
    const step = 1 / cardCount;

    const resetCardStyles = () => {
        cards.forEach((card) => {
            card.style.removeProperty('--translate-x');
            card.style.removeProperty('--translate-y');
            card.style.removeProperty('--translate-z');
            card.style.removeProperty('--rotate-z');
            card.style.removeProperty('--rotate-y');
            card.style.removeProperty('--scale');
            card.style.removeProperty('--card-opacity');
            card.style.removeProperty('--card-blur');
            card.style.removeProperty('--card-layer');
            card.classList.remove('hero-card--focus');
            card.style.pointerEvents = 'auto';
            card.setAttribute('aria-hidden', 'false');
        });
    };

    const computeDimensions = () => {
        const { width, height } = track.getBoundingClientRect();
        radiusX = width / 2.1;
        radiusY = Math.max(height * 0.28, 80);
        depth = Math.min(width, height) * 0.45;
    };

    const updateCardStyles = () => {
        if (!cardCount) return;

        cards.forEach((card, index) => {
            const position = (index * step + progress) % 1;
            const normalized = position > 0.5 ? position - 1 : position; // [-0.5, 0.5)
            const angle = normalized * HALF_ARC; // half-circle distribution
            const sin = Math.sin(angle);
            const cos = Math.max(Math.cos(angle), 0); // keep cards in front hemisphere

            const translateX = sin * radiusX;
            const translateY = (1 - cos) * radiusY;
            const translateZ = cos * depth;

            const focus = cos; // 0 (edge) -> 1 (center)
            const scale = 0.78 + 0.28 * focus;
            const opacity = 0.35 + 0.65 * focus;
            const blur = (1 - focus) * 1.4;
            const rotateZ = sin * 14;
            const rotateY = -sin * 18;
            const elevation = Math.round(focus * 100);

            card.style.setProperty('--translate-x', `${translateX.toFixed(2)}px`);
            card.style.setProperty('--translate-y', `${translateY.toFixed(2)}px`);
            card.style.setProperty('--translate-z', `${translateZ.toFixed(2)}px`);
            card.style.setProperty('--rotate-z', `${rotateZ.toFixed(2)}deg`);
            card.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`);
            card.style.setProperty('--scale', scale.toFixed(3));
            card.style.setProperty('--card-opacity', opacity.toFixed(3));
            card.style.setProperty('--card-blur', `${blur.toFixed(2)}px`);
            card.style.setProperty('--card-layer', `${elevation}`);

            const isFocus = focus > 0.7;
            card.classList.toggle('hero-card--focus', isFocus);
            card.style.pointerEvents = isFocus ? 'auto' : 'none';
            card.setAttribute('aria-hidden', isFocus ? 'false' : 'true');
        });
    };

    const cancelAnimation = () => {
        if (!animationFrame) return;
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
    };

    const animate = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;
        progress = (progress + delta * ROTATION_SPEED) % 1;
        updateCardStyles();
        animationFrame = window.requestAnimationFrame(animate);
    };

    const start = () => {
        cancelAnimation();
        computeDimensions();

        if (MOBILE_QUERY.matches) {
            resetCardStyles();
            return;
        }

        updateCardStyles();

        if (REDUCE_MOTION_QUERY.matches) {
            return;
        }

        lastTimestamp = 0;
        animationFrame = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
        start();
    };

    const handleMotionChange = () => {
        start();
    };

    window.addEventListener('resize', handleResize);
    REDUCE_MOTION_QUERY.addEventListener('change', handleMotionChange);
    MOBILE_QUERY.addEventListener('change', handleMotionChange);

    start();
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroOrbit();
    console.log('Card Sharp Zone hero orbit ready');
});
