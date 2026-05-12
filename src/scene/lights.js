import * as THREE from 'three';
export function addLights(scene) {
	const ambientLight = new THREE.AmbientLight(0xffffff, 1);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(50, 100, 50);

	scene.add(directionalLight);
}