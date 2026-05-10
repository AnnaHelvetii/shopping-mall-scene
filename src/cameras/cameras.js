import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 120;

export const perspectiveCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

perspectiveCamera.position.set(60, 70, 60);
perspectiveCamera.lookAt(40, 0, 40);

export const orthoCamera = new THREE.OrthographicCamera(
		(frustumSize * aspect) / -2,
		(frustumSize * aspect) / 2,
		frustumSize / 2,
		frustumSize / -2,
		0.1,
		1000
	);

orthoCamera.position.set(40, 120, 40);
orthoCamera.up.set(0, 0, -1);
orthoCamera.lookAt(40, 0, 40);

export { frustumSize };