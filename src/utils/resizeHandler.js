export function initResizeHandler(renderer, perspectiveCamera, orthoCamera, frustumSize) {
	window.addEventListener('resize', () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const aspect = width / height;

		renderer.setSize(width, height);
		perspectiveCamera.aspect = aspect;
		perspectiveCamera.updateProjectionMatrix();

		orthoCamera.left = (-frustumSize * aspect) / 2;
		orthoCamera.right = (frustumSize * aspect) / 2;
		orthoCamera.top = frustumSize / 2;
		orthoCamera.bottom = -frustumSize / 2;
		orthoCamera.updateProjectionMatrix();
	});
}