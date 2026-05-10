import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function addLights(scene) {
	const ambientLight = new THREE.AmbientLight(0xffffff, 1);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(50, 100, 50);

	scene.add(directionalLight);
}