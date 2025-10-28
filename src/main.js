import './styles/main.scss';

const HERO_CARD_CLASSES = [
    'hero-card--far-left',
    'hero-card--left',
    'hero-card--center',
    'hero-card--right',
    'hero-card--far-right'
];

const HERO_CARD_OFFSETS = [-2, -1, 0, 1, 2];
const DOT_ACTIVE_CLASS = 'hero__dot--active';
const AUTO_ROTATE_INTERVAL = 8000;

const isArrowKey = (key) => key === 'ArrowLeft' || key === 'ArrowRight';

function applyCardVariables(cards) {
    cards.forEach((card) => {
        const { gradient, glow, accent } = card.dataset;

        if (gradient) card.style.setProperty('--card-gradient', gradient);
        if (glow) card.style.setProperty('--card-glow', glow);
        if (accent) card.style.setProperty('--card-accent', accent);
    });
}

function updateCards(cards, dots, currentIndex) {
    cards.forEach((card) => {
        HERO_CARD_CLASSES.forEach((className) => card.classList.remove(className));
        card.setAttribute('aria-hidden', 'true');
    });

    HERO_CARD_OFFSETS.forEach((offset, positionIndex) => {
        const className = HERO_CARD_CLASSES[positionIndex];
        const cardIndex = (currentIndex + offset + cards.length) % cards.length;
        const card = cards[cardIndex];

        if (!card) return;
        card.classList.add(className);
        card.setAttribute('aria-hidden', className === 'hero-card--center' ? 'false' : 'true');
    });

    dots.forEach((dot) => {
        const index = Number.parseInt(dot.dataset.index ?? '-1', 10);
        const isActive = index === currentIndex;
        dot.classList.toggle(DOT_ACTIVE_CLASS, isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
}

function initHeroCarousel(root = document.querySelector('.hero')) {
    if (!root) return;

    const cards = Array.from(root.querySelectorAll('.hero-card'));
    const dots = Array.from(root.querySelectorAll('.hero__dot'));
    const prevButton = root.querySelector('.hero__nav--prev');
    const nextButton = root.querySelector('.hero__nav--next');

    if (!cards.length || !prevButton || !nextButton) return;

    applyCardVariables(cards);

    let currentIndex =
        cards.findIndex((card) => card.classList.contains('hero-card--center')) || 0;
    let autoRotateTimer = null;

    const goToIndex = (index) => {
        currentIndex = (index + cards.length) % cards.length;
        updateCards(cards, dots, currentIndex);
    };

    const goNext = () => goToIndex(currentIndex + 1);
    const goPrev = () => goToIndex(currentIndex - 1);

    const stopAutoRotate = () => {
        if (!autoRotateTimer) return;
        window.clearInterval(autoRotateTimer);
        autoRotateTimer = null;
    };

    const startAutoRotate = () => {
        if (autoRotateTimer || cards.length <= 1) return;
        autoRotateTimer = window.setInterval(goNext, AUTO_ROTATE_INTERVAL);
    };

    prevButton.addEventListener('click', goPrev);
    nextButton.addEventListener('click', goNext);

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = Number.parseInt(dot.dataset.index ?? '-1', 10);
            if (!Number.isNaN(index)) goToIndex(index);
        });

        dot.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const index = Number.parseInt(dot.dataset.index ?? '-1', 10);
                if (!Number.isNaN(index)) goToIndex(index);
            }
        });
    });

    root.addEventListener('keydown', (event) => {
        if (!isArrowKey(event.key)) return;
        event.preventDefault();
        if (event.key === 'ArrowLeft') goPrev();
        if (event.key === 'ArrowRight') goNext();
    });

    root.addEventListener('pointerenter', stopAutoRotate);
    root.addEventListener('pointerleave', startAutoRotate);
    root.addEventListener('focusin', stopAutoRotate);
    root.addEventListener('focusout', startAutoRotate);

    updateCards(cards, dots, currentIndex);
    startAutoRotate();
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    console.log('Card Sharp Zone hero carousel ready');
});
