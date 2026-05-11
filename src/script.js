import { scene } from './scene/scene.js';
import { renderer } from './scene/renderer.js';
import { addLights } from './scene/lights.js';
import { perspectiveCamera, orthoCamera, frustumSize,} from './cameras/cameras.js';
import { placesData } from './data/placesData.js';
import { createShops } from './scene/createShops.js';
import { initHover } from './interaction/hover.js';
import { initClick } from './interaction/click.js';
import { initResizeHandler } from './utils/resizeHandler.js';

// LIGHTS

addLights(scene);

// SHOPS

const shopMeshes = createShops(scene, placesData, renderer);

// CAMERAS

let is3D = true;
let currentCamera = perspectiveCamera;

document.getElementById('toggleView').onclick = () => {
	is3D = !is3D;
	currentCamera = is3D
		? perspectiveCamera
		: orthoCamera;
};

// INTERACTION

initHover(shopMeshes, () => currentCamera);
initClick(shopMeshes, () => currentCamera);

// RESIZE

initResizeHandler(renderer, perspectiveCamera, orthoCamera, frustumSize);

// RENDER LOOP

function animate() {
	requestAnimationFrame(animate);

	renderer.render(
		scene,
		currentCamera
	);
}

animate();