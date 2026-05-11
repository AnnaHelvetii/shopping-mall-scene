import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;

export function initHover(shopMeshes, getCurrentCamera) {
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, getCurrentCamera());
        const intersects = raycaster.intersectObjects(shopMeshes, false);

        if (hovered && (intersects.length === 0 || intersects[0].object !== hovered)) {
            const mats = Array.isArray(hovered.material) ? hovered.material : [hovered.material];
            for (const mat of mats) {
                mat.color.set(hovered.userData.color);
            }
            hovered = null;
        }

        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object !== hovered) {
                hovered = object;
                const mats = Array.isArray(hovered.material) ? hovered.material : [hovered.material];
                for (const mat of mats) {
                    mat.color.set(0xffff00);
                }
            }
        }
    });
}
