// --- BUILDING BLUEPRINTS & MULTI-CELL SPAWNER ---

const buildingBlueprints = [
    // 0-Storey Plazas / Landmarks
    { w: 3, d: 3, minS: 0, maxS: 0, weight: 10 }, // keep 10!
    
    // Standard 1x1 Pillars & Towers
    { w: 1, d: 1, minS: 1, maxS: 2, weight: 18 },
    { w: 1, d: 1, minS: 3, maxS: 4, weight: 15 },
    { w: 1, d: 1, minS: 5, maxS: 6, weight: 12 },
    
    // Narrow & Slender Variations
    { w: 1, d: 2, minS: 1, maxS: 3, weight: 7 },
    { w: 1, d: 3, minS: 1, maxS: 3, weight: 7 },
    
    // Medium Blocks
    { w: 2, d: 2, minS: 1, maxS: 4, weight: 3 },
    
    // Rectangular Variations
    { w: 2, d: 3, minS: 1, maxS: 3, weight: 2 },
    { w: 2, d: 4, minS: 1, maxS: 3, weight: 2 },
    { w: 3, d: 4, minS: 2, maxS: 4, weight: 2 },
    
    // Large Monument Blocks
    { w: 4, d: 4, minS: 2, maxS: 4, weight: 1 }
];

// Simple helper with polygon offset to prevent z-fighting at y = 0
function getPolygonOffsetMaterial(baseMat) {
    const mat = baseMat.clone();
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -1.0;
    mat.polygonOffsetUnits = -4.0;
    return mat;
}

function canReserveCells(startX, startZ, width, depth) {
    for (let x = startX; x < startX + width; x++) {
        for (let z = startZ; z < startZ + depth; z++) {
            if (window.occupiedGridRegistry.has(`${x},${z}`)) return false;
            if (x < 1 || x > 18 || z < 1 || z > 18) return false;
        }
    }
    return true;
}

function reserveCells(startX, startZ, width, depth) {
    for (let x = startX; x < startX + width; x++) {
        for (let z = startZ; z < startZ + depth; z++) {
            window.occupiedGridRegistry.add(`${x},${z}`);
        }
    }
}

function buildMap() {
    window.occupiedGridRegistry.clear();
    window.obstacleColliders.length = 0;
    window.landmarkPlazaCenters = [];
    window.solidCells = new Set();
    const { scene, gridToWorld } = window;

    // Reserve center player spawn zone
    for (let x = 9; x <= 10; x++) {
        for (let z = 9; z <= 10; z++) {
            window.occupiedGridRegistry.add(`${x},${z}`);
        }
    }
    // Reserve outer boundary walls
    for (let i = 0; i < 20; i++) {
        window.occupiedGridRegistry.add(`0,${i}`); window.occupiedGridRegistry.add(`19,${i}`);
        window.occupiedGridRegistry.add(`${i},0`); window.occupiedGridRegistry.add(`${i},19`);
    }

    const spawnQueue = [];
    buildingBlueprints.forEach(bp => {
        for (let i = 0; i < bp.weight; i++) {
            spawnQueue.push({ ...bp });
        }
    });

    // Priority sorting: 0-storey landmarks first, then descending surface area footprint, 1x1 fillers last
    spawnQueue.sort((a, b) => {
        const aIsLandmark = a.minS === 0 && a.maxS === 0 ? 1 : 0;
        const bIsLandmark = b.minS === 0 && b.maxS === 0 ? 1 : 0;
        if (aIsLandmark !== bIsLandmark) return bIsLandmark - aIsLandmark;

        const aArea = a.w * a.d;
        const bArea = b.w * b.d;
        return bArea - aArea;
    });

    const standardCubeGeo = new THREE.BoxGeometry(5.0, 5.0, 5.0);

    // Flood-fill from the spawn over cells that aren't solid. Only 2+ storey towers are solid:
    // a double jump (~6.25 high) clears a 1-storey (5 high) building, so those count as passable.
    const floodReach = () => {
        const reach = new Set(), stack = ['9,9'];
        while (stack.length) {
            const k = stack.pop();
            if (reach.has(k) || window.solidCells.has(k)) continue;
            const [x, z] = k.split(',').map(Number);
            if (x < 1 || x > 18 || z < 1 || z > 18) continue;
            reach.add(k);
            stack.push(`${x + 1},${z}`, `${x - 1},${z}`, `${x},${z + 1}`, `${x},${z - 1}`);
        }
        return reach;
    };

    // Cubes are batched into InstancedMeshes, one per unique (side, top) material pair
    const batches = new Map();
    const addInstance = (sideMat, topMat, x, y, z) => {
        const key = sideMat.uuid + '|' + topMat.uuid;
        if (!batches.has(key)) batches.set(key, { mats: [sideMat, sideMat, topMat, sideMat, sideMat, sideMat], matrices: [] });
        batches.get(key).matrices.push(new THREE.Matrix4().makeTranslation(x, y, z));
    };

    spawnQueue.forEach((bp) => {
        let w = bp.w;
        let d = bp.d;

        if (w !== d && Math.random() < 0.5) {
            const temp = w; w = d; d = temp;
        }

        const storeyCount = Math.floor(Math.random() * (bp.maxS - bp.minS + 1)) + bp.minS;

        let startX, startZ, placed = false, attempts = 0;
        while (!placed && attempts < 80) {
            startX = Math.floor(Math.random() * (18 - w + 1)) + 1;
            startZ = Math.floor(Math.random() * (18 - d + 1)) + 1;

            if (canReserveCells(startX, startZ, w, d)) {
                const blocks = storeyCount >= 2;
                const cells = [];
                for (let fx = 0; fx < w; fx++) for (let fz = 0; fz < d; fz++) cells.push(`${startX + fx},${startZ + fz}`);
                if (blocks) cells.forEach(k => window.solidCells.add(k));
                if (!blocks || floodReach().size === 324 - window.solidCells.size) {
                    reserveCells(startX, startZ, w, d);
                    placed = true;
                } else {
                    cells.forEach(k => window.solidCells.delete(k));
                }
            }
            attempts++;
        }

        if (!placed) return;

        const totalWidth = w * 5.0;
        const totalDepth = d * 5.0;
        const wx = (startX + w / 2.0 - 10) * 5.0;
        const wz = (startZ + d / 2.0 - 10) * 5.0;

        if (storeyCount === 0) {
            // ONLY collect 3x3 plaza centers so gallery boxes align perfectly to the grid!
            if (w === 3 && d === 3 && window.landmarkPlazaCenters.length < 15) {
                window.landmarkPlazaCenters.push({ x: wx, z: wz });
            }

            /* --- COMMENTED OUT: visible landmark plaza planes (restore by deleting the opening and closing comment markers)

            const plazaGroup = new THREE.Group();
            plazaGroup.position.set(wx, 0, wz);

            const landmarkBase = window.landmarkMaterial || window.roofMaterial;
            const landmarkPlazaMat = getPolygonOffsetMaterial(landmarkBase);
            
            for (let fx = 0; fx < w; fx++) {
                for (let fz = 0; fz < d; fz++) {
                    const planeGeo = new THREE.PlaneGeometry(5.0, 5.0);
                    const planeMesh = new THREE.Mesh(planeGeo, landmarkPlazaMat);
                    planeMesh.rotation.x = -Math.PI / 2;
                    planeMesh.position.set(
                        (fx - w / 2.0 + 0.5) * 5.0,
                        0,
                        (fz - d / 2.0 + 0.5) * 5.0
                    );
                    plazaGroup.add(planeMesh);
                    window.dynamicMeshes.push(planeMesh);
                }
            }

            scene.add(plazaGroup);
            window.dynamicMeshes.push(plazaGroup);
            */

        } else {
            const availableGroundMats = window.groundMaterials || [window.groundMaterial];
            const chosenGroundMat = availableGroundMats[Math.floor(Math.random() * availableGroundMats.length)];

            for (let h = 0; h < storeyCount; h++) {
                const sideMat = (h === 0) ? chosenGroundMat : window.upperMaterial;
                const topMat = (h === storeyCount - 1) ? window.roofMaterial : sideMat;
                for (let fx = 0; fx < w; fx++) {
                    for (let fz = 0; fz < d; fz++) {
                        addInstance(sideMat, topMat, gridToWorld(startX + fx), h * 5.0 + 2.5, gridToWorld(startZ + fz));
                    }
                }
            }

            const totalHeight = storeyCount * 5.0;
            window.obstacleColliders.push(new THREE.Box3().setFromCenterAndSize(
                new THREE.Vector3(wx, totalHeight / 2, wz),
                new THREE.Vector3(totalWidth, totalHeight, totalDepth)
            ));
        }
    });

    // Outer boundary walls (same instancing path, one collider per wall cube)
    const addWall = (xIdx, zIdx) => {
        const x = gridToWorld(xIdx), z = gridToWorld(zIdx);
        addInstance(window.wallMaterial, window.roofMaterial, x, 2.5, z);
        window.obstacleColliders.push(new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(x, 2.5, z), new THREE.Vector3(5.0, 5.0, 5.0)));
    };
    for (let g = 0; g < 20; g++) {
        addWall(g, 0); addWall(g, 19);
        if (g > 0 && g < 19) { addWall(0, g); addWall(19, g); }
    }

    batches.forEach(({ mats, matrices }) => {
        const mesh = new THREE.InstancedMesh(standardCubeGeo, mats, matrices.length);
        matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
        mesh.instanceMatrix.needsUpdate = true;
        scene.add(mesh);
        window.dynamicMeshes.push(mesh);
    });

    // Reachability (safety net; placement already keeps open cells connected)
    const reach = floodReach();
    window.reachableCells = reach;
    window.landmarkPlazaCenters = window.landmarkPlazaCenters.filter(c =>
        reach.has(`${Math.round((c.x - 2.5) / 5 + 10)},${Math.round((c.z - 2.5) / 5 + 10)}`));
}