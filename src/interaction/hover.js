import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;

export function initHover(shopMeshes, getCurrentCamera) {
	window.addEventListener('mousemove', (event) => {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
			raycaster.setFromCamera(mouse, getCurrentCamera());
			const intersects = raycaster.intersectObjects(shopMeshes);

			if (hovered) {
				hovered.material.color.set(hovered.userData.color);
				hovered = null;
			}

			if (intersects.length > 0) {
				hovered = intersects[0].object;
				hovered.material.color.set(0xffff00);
			}
		}
	);
}