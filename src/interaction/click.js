import * as THREE from 'three';
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function initClick(shopMeshes, getCurrentCamera) {
	window.addEventListener('mousemove', (event) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	});

	window.addEventListener('click', () => {
		raycaster.setFromCamera(mouse, getCurrentCamera());
	});
}