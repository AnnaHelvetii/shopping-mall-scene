import * as THREE from 'three'; import { scene } from './scene/scene.js';
import { renderer } from './scene/renderer.js';
import { addLights } from './scene/lights.js';
import { perspectiveCamera, pos3D, pos2D, frustumSize } from './cameras/cameras.js';
import { placesData } from './data/placesData.js';
import { createShops } from './scene/createShops.js';
import { initHover } from './interaction/hover.js';
import { initClick } from './interaction/click.js';
import { initResizeHandler } from './utils/resizeHandler.js';
import { initControls } from './interaction/controls.js';

addLights(scene);
const shopMeshes = createShops(scene, placesData, renderer);

let is3D = true;
const cameraTarget = new THREE.Vector3(0, 0, 0);

const controls = initControls(perspectiveCamera, renderer);

document.getElementById('toggleView').onclick = () => {
	is3D = !is3D;
	const targetPos = is3D ? pos3D : pos2D;

	controls.enabled = false;

	gsap.killTweensOf(perspectiveCamera.position);
	gsap.to(perspectiveCamera.position, {
		x: targetPos.x,
		y: targetPos.y,
		z: targetPos.z,
		duration: 2.0,
		ease: "expo.inOut",
		onUpdate: () => {
			perspectiveCamera.lookAt(cameraTarget);
		},
		onComplete: () => {
			if (is3D) controls.enabled = true;
		}
	});
};

initHover(shopMeshes, () => perspectiveCamera);
initClick(shopMeshes, () => perspectiveCamera);
initResizeHandler(renderer, perspectiveCamera, perspectiveCamera, frustumSize);

function animate() {
	requestAnimationFrame(animate);

	if (is3D && controls.enabled) {
		controls.update(); 
	} else {
		perspectiveCamera.lookAt(cameraTarget); 
	}

	renderer.render(scene, perspectiveCamera);
}

animate();