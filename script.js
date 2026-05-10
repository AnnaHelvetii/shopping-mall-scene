import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { placesData } from './data/placesData.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 100, 50);
scene.add(directionalLight);
const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

perspectiveCamera.position.set(60, 70, 60);
perspectiveCamera.lookAt(40, 0, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//

const spacing = 8;
const gridSize = 10;

const shopMeshes = [];

placesData.forEach((place, index) => {
	const geometry = new THREE.BoxGeometry(place.width, 2, place.depth);

	const material = new THREE.MeshStandardMaterial({
		color: place.color,
	});

	const mesh = new THREE.Mesh(geometry, material);
	const row = Math.floor(index / gridSize);
	const col = index % gridSize;

	mesh.position.x = col * spacing;
	mesh.position.z = row * spacing;
	mesh.userData = place;

	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 64;

	const ctx = canvas.getContext('2d');
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.font = 'bold 40px Arial';
	ctx.textAlign = 'center';

	ctx.fillText(place.name, canvas.width / 2, 40);
	const texture = new THREE.CanvasTexture(canvas);
	const spriteMaterial = new THREE.SpriteMaterial({
		map: texture,
	});

	const sprite = new THREE.Sprite(spriteMaterial);
	sprite.scale.set(8, 2, 1);
	sprite.position.set(0, 2.5, 0);
	mesh.add(sprite);
	scene.add(mesh);

	shopMeshes.push(mesh);
});

//

const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 120;

const orthoCamera = new THREE.OrthographicCamera(
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

//

let is3D = true;
let currentCamera = perspectiveCamera;

document.getElementById('toggleView').onclick = () => {
	is3D = !is3D;
	currentCamera = is3D ? perspectiveCamera : orthoCamera;
};

renderer.render(scene, currentCamera);

//

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
	raycaster.setFromCamera(mouse, currentCamera);

	const intersects = raycaster.intersectObjects(shopMeshes);

	const found = intersects.find(
		(item) => item.object.type === 'Mesh'
	);

	if (found) {
		hovered = found.object;
		hovered.material.color.set(0xffff00);
	}

	if (intersects.length > 0) {
		const obj = intersects[0].object;
		console.log(obj.userData);
	}
});

//

let hovered = null;

window.addEventListener('mousemove', () => {
	raycaster.setFromCamera(mouse, currentCamera);
	const intersects = raycaster.intersectObjects(shopMeshes);

	if (hovered) {
		hovered.material.color.set(hovered.userData.color);
		hovered = null;
	}

	if (intersects.length > 0) {
		hovered = intersects[0].object;
		hovered.material.color.set(0xffff00);
	}
});

window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
	perspectiveCamera.aspect = width / height;
	perspectiveCamera.updateProjectionMatrix();
	const aspect = width / height;
	orthoCamera.left = (-frustumSize * aspect) / 2;
	orthoCamera.right = (frustumSize * aspect) / 2;
	orthoCamera.top = frustumSize / 2;
	orthoCamera.bottom = -frustumSize / 2;
	orthoCamera.updateProjectionMatrix();
});

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, currentCamera);
}

animate();