import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initControls(camera, renderer) {
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.minDistance = 20;
	controls.maxDistance = 400;
	controls.maxPolarAngle = Math.PI / 2.1;
	controls.enabled = true;
	return controls;
}
