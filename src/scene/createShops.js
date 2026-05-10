import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function createShops(scene, placesData) {
	const spacing = 8;
	const gridSize = 10;
	const shopMeshes = [];

	placesData.forEach((place, index) => {
		const geometry = new THREE.BoxGeometry(place.width, 2, place.depth);
		const material = new THREE.MeshStandardMaterial({ color: place.color, });
		const mesh = new THREE.Mesh(geometry, material);
		const row = Math.floor(index / gridSize);
		const col = index % gridSize;
		mesh.position.x = col * spacing;
		mesh.position.z = row * spacing;
		mesh.userData = place;

		const canvas = document.createElement('canvas');
		canvas.width = 512;
		canvas.height = 128;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'black';
		ctx.font = 'bold 40px Arial';
		ctx.textAlign = 'center';
		ctx.fillText(place.name, canvas.width / 2, 80);

		const texture = new THREE.CanvasTexture(canvas);
		const spriteMaterial = new THREE.SpriteMaterial({ map: texture, });

		const sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(12, 3, 1);
		sprite.position.set(0, 3, 0);
		mesh.add(sprite);
		scene.add(mesh);
		shopMeshes.push(mesh);
	});

	return shopMeshes;
}