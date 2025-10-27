import './styles/main.scss'
import * as THREE from 'three';

// Initialize application
console.log('Card Sharp - Poker Lessons Application');

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFlipCards();
    initLessons();
    initSubscribe();
    
    console.log('All components initialized');
});

// Three.js setup (ready for future 3D features)
// Uncomment and expand when ready to add 3D elements
/*
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
*/
