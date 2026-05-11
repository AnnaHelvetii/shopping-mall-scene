import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function createShops(scene, placesData, renderer) {
	const shopMeshes = [];
	const padding = 3;
	const maxRowWidth = 100;
	let currentX = 0, currentZ = 0, currentRowDepth = 0;

	placesData.forEach((place) => {
		if (currentX + place.width > maxRowWidth) {
			currentX = 0;
			currentZ += currentRowDepth + padding;
			currentRowDepth = 0;
		}
		currentRowDepth = Math.max(currentRowDepth, place.depth);

		const materials = [];
		for (let i = 0; i < 6; i++) {
			materials.push(new THREE.MeshStandardMaterial({ color: place.color }));
		}

		const geometry = new THREE.BoxGeometry(place.width, 2, place.depth);
		const mesh = new THREE.Mesh(geometry, materials);
		mesh.position.set(currentX + place.width / 2, 1, currentZ + place.depth / 2);
		mesh.userData = place;

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = 2048; 
		canvas.height = 512;

		ctx.fillStyle = 'white'; 
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = 'black'; 
		ctx.lineWidth = 20; ctx.strokeRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'black'; 
		ctx.font = 'bold 160px Arial';
		ctx.textAlign = 'center'; 
		ctx.textBaseline = 'middle';
		const text = place.name.length > 16 ? `${place.name.slice(0, 16)}...` : place.name;
		ctx.fillText(text, canvas.width / 2, canvas.height / 2);

		const texture = new THREE.CanvasTexture(canvas);
		texture.generateMipmaps = false;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.needsUpdate = true;

		const labelWidth = place.width * 0.9;
		const labelHeight = labelWidth * (canvas.height / canvas.width);
		const labelGeometry = new THREE.PlaneGeometry(labelWidth, labelHeight);		
		const labelMaterial = new THREE.MeshBasicMaterial({ 
			map: texture, 
			transparent: true,
			depthTest: true,
			depthWrite: true
		});

		const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
		labelMesh.position.set(0, 1.01, 0);
		labelMesh.rotation.x = -Math.PI / 2;
		
		mesh.add(labelMesh);
		scene.add(mesh);
		shopMeshes.push(mesh);

		currentX += place.width + padding;
	});
	
	return shopMeshes;
}
