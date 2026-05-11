import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function createShops(scene, placesData, renderer) {
    const shopMeshes = [];
    const GAP = 1.5;
    const MAX_ROW_WIDTH = 180; 
    const group = new THREE.Group();
    let rows = [], tempRow = [], curRowWidth = 0;

    placesData.forEach((place) => {
        const w = Math.max(place.width, 8);
        if (curRowWidth + w + GAP > MAX_ROW_WIDTH) {
            rows.push(tempRow); tempRow = []; curRowWidth = 0;
        }
        tempRow.push(place); curRowWidth += w + GAP;
    });
    if (tempRow.length > 0) rows.push(tempRow);

    let curZ = 0;
    rows.forEach((row, rowIndex) => {
        const rowMaxDepth = Math.max(...row.map(p => p.depth));
        const sumOriginalWidth = row.reduce((sum, p) => sum + p.width, 0);
        const scaleFactor = (MAX_ROW_WIDTH - (row.length - 1) * GAP) / sumOriginalWidth;

        let rowX = 0;
        row.forEach((place) => {
            const finalWidth = place.width * scaleFactor;
            const geometry = new THREE.BoxGeometry(finalWidth, 2, place.depth);
            const materials = Array.from({length: 6}, () => new THREE.MeshStandardMaterial({ color: place.color }));
            const mesh = new THREE.Mesh(geometry, materials);

            let offsetZ = 0;
            if (rowIndex === 0) offsetZ = 0; 
            else if (rowIndex === rows.length - 1) offsetZ = rowMaxDepth - place.depth;
            else offsetZ = (rowMaxDepth - place.depth) / 2;

            mesh.position.set(rowX + finalWidth / 2, 1, curZ + offsetZ + place.depth / 2);
            mesh.userData = place;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const fontSize = 80;
            ctx.font = `bold ${fontSize}px Arial`;
            
            const textMetrics = ctx.measureText(place.name);
            const textPadding = 40;
            canvas.width = textMetrics.width + textPadding * 2;
            canvas.height = fontSize + textPadding;

            ctx.fillStyle = 'white';
            const r = 20;
            ctx.beginPath();
            ctx.moveTo(r, 0);
            ctx.lineTo(canvas.width - r, 0); ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r);
            ctx.lineTo(canvas.width, canvas.height - r); ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height);
            ctx.lineTo(r, canvas.height); ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r);
            ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(place.name, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            
            const visualWidth = Math.min(finalWidth * 0.8, canvas.width / 40); 
            const visualHeight = visualWidth * (canvas.height / canvas.width);
            const labelMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(visualWidth, visualHeight),
                new THREE.MeshBasicMaterial({ map: texture, transparent: true })
            );
            labelMesh.position.set(0, 1.02, 0);
            labelMesh.rotation.x = -Math.PI / 2;
            
            mesh.add(labelMesh);
            group.add(mesh);
            shopMeshes.push(mesh);
            rowX += finalWidth + GAP;
        });

        curZ += rowMaxDepth + GAP * 2; 
    });

    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.set(-center.x, 0, -center.z);
    scene.add(group);
    return shopMeshes;
}
