import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selected = null;

export function initClick(shopMeshes, getCurrentCamera) {
	window.addEventListener('click', (event) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, getCurrentCamera());
		const intersects = raycaster.intersectObjects(shopMeshes, false);

		if (selected) {
			selected.userData.isSelected = false;
			selected.material.forEach(mat => mat.color.set(selected.userData.color));
			selected = null;
		}

		if (intersects.length > 0) {
			selected = intersects[0].object;
			const data = selected.userData;

			console.log(`
				Информация о магазине: 
				ID: ${data.id} 
				Name: ${data.name} 
				Position: 
				X: ${selected.position.x.toFixed(2)}, 
				Z: ${selected.position.z.toFixed(2)}
			`);
			
			selected.userData.isSelected = true;
			selected.material.forEach(mat => mat.color.set(0x00ffff));
		}
	});
}
