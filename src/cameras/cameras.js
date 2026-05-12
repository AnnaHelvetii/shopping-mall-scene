import * as THREE from 'three';

const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 110;

export const perspectiveCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
export const pos3D = { x: 80, y: 80, z: 80 };
export const pos2D = { x: 0, y: 140, z: 0.1 };

perspectiveCamera.position.set(pos3D.x, pos3D.y, pos3D.z);
perspectiveCamera.lookAt(0, 0, 0);

export const orthoCamera = new THREE.OrthographicCamera(
	(frustumSize * aspect) / -2, (frustumSize * aspect) / 2,
	frustumSize / 2, frustumSize / -2, 0.1, 2000
);

export { frustumSize };
