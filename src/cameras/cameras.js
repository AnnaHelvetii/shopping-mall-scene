import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 140;

export const perspectiveCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
perspectiveCamera.position.set(100, 100, 100);
perspectiveCamera.lookAt(0, 0, 0);

export const orthoCamera = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    0.1,
    2000
);
orthoCamera.position.set(0, 150, 0);
orthoCamera.lookAt(0, 0, 0);

export { frustumSize };