// ----------------------
// Create PlayCanvas app
// ----------------------
const canvas = document.getElementById('app');
const app = new pc.Application(canvas, {});
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

// ----------------------
// Camera
// ----------------------
const camera = new pc.Entity();
camera.addComponent('camera', { clearColor: new pc.Color(1, 0.2, 0.2) });
camera.setPosition(0, 0, 4);
app.root.addChild(camera);

// ----------------------
// Add six directional lights
// ----------------------
const directions = [
    { name: 'top',         angles: [45, 0, 0], intensity: 1 },
    { name: 'bottom',      angles: [180, 0, 0], intensity: 0.5 },
    { name: 'front-right', angles: [90, 45, 0], intensity: 0.66 },
    { name: 'front-left',  angles: [90, -45, 0], intensity: 0.66 },
    { name: 'back-right',  angles: [90, 135, 0], intensity: 0.66 },
    { name: 'back-left',   angles: [90, -135, 0], intensity: 0.66 }
];

directions.forEach(dir => {
    const light = new pc.Entity();
    light.name = dir.name + '_light';
    light.addComponent('light', { type: 'directional', intensity: dir.intensity });
    light.setEulerAngles(...dir.angles);
    app.root.addChild(light);
});

// ----------------------
// Load GLB model (null-safe + auto-scale)
// ----------------------
let modelEntities = [];
const modelPath = 'assets/little_cartoon_dog.glb';
const modelAsset = new pc.Asset('model', 'container', { url: modelPath });
app.assets.add(modelAsset);
app.assets.load(modelAsset);

modelAsset.ready(() => {
    const entities = modelAsset.resource.instantiateRenderEntity();
    const entityArray = Array.isArray(entities) ? entities : [entities];

    entityArray.forEach(ent => {
        if (!ent) return;
        app.root.addChild(ent);
        modelEntities.push(ent);
    });

    console.log('Model loaded successfully and auto-scaled!');
});

modelAsset.on('error', (err) => {
    console.error('Failed to load GLB:', err);
});

// ----------------------
// Orbit control setup
// ----------------------
let orbit = {
    pitch: 0,
    yaw: 0,
    distance: 4,
    target: new pc.Vec3(0, 0, 0),
    sensitivity: 0.005,
    zoomSpeed: 0.1
};

let orbitTarget = {
    pitch: 0,
    yaw: 0,
    distance: 4
};

let damping = 0.12; // smoothness factor
let dragging = false;
let lastX = 0;
let lastY = 0;

// ----------------------
// Mouse rotation
// ----------------------
canvas.addEventListener('mousedown', e => {
    if (e.button === 0) { // left button for rotation
        dragging = 'rotate';
    } else if (e.button === 1 || e.button === 2) { // middle/right for pan
        dragging = 'pan';
    }
    lastX = e.clientX;
    lastY = e.clientY;
});

window.addEventListener('mouseup', () => dragging = false);

window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    if (dragging === 'rotate') {
        orbitTarget.yaw -= dx * orbit.sensitivity;
        orbitTarget.pitch += dy * orbit.sensitivity;
        orbitTarget.pitch = pc.math.clamp(orbitTarget.pitch, -Math.PI / 2, Math.PI / 2);
    } else if (dragging === 'pan') {
        const panSpeed = 0.01 * orbitTarget.distance;
        orbit.target.x -= dx * panSpeed;
        orbit.target.y += dy * panSpeed;
    }
});

// Scroll zoom
canvas.addEventListener('wheel', e => {
    orbitTarget.distance += e.deltaY * orbit.zoomSpeed * 0.01;
    orbitTarget.distance = Math.max(0.1, orbitTarget.distance);
});

// ----------------------
// Touch controls (mobile)
// ----------------------
let touchLastX = 0;
let touchLastY = 0;
let lastTouchDist = 0;

canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
        dragging = 'rotate';
        const t = e.touches[0];
        touchLastX = t.clientX;
        touchLastY = t.clientY;
    } else if (e.touches.length === 2) {
        dragging = 'pinch';
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDist = Math.sqrt(dx * dx + dy * dy);
    }
});

canvas.addEventListener('touchmove', e => {
    if (!dragging) return;

    if (dragging === 'rotate' && e.touches.length === 1) {
        const t = e.touches[0];
        const dx = t.clientX - touchLastX;
        const dy = t.clientY - touchLastY;
        touchLastX = t.clientX;
        touchLastY = t.clientY;

        orbitTarget.yaw -= dx * orbit.sensitivity;
        orbitTarget.pitch += dy * orbit.sensitivity;
        orbitTarget.pitch = pc.math.clamp(orbitTarget.pitch, -Math.PI / 2, Math.PI / 2);
    } else if (dragging === 'pinch' && e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const delta = lastTouchDist - dist;
        orbitTarget.distance += delta * orbit.zoomSpeed * 0.01;
        orbitTarget.distance = Math.max(0.1, orbitTarget.distance);

        lastTouchDist = dist;

        // Two-finger pan
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const dxPan = midX - touchLastX;
        const dyPan = midY - touchLastY;
        const panSpeed = 0.01 * orbitTarget.distance;
        orbit.target.x -= dxPan * panSpeed;
        orbit.target.y += dyPan * panSpeed;
        touchLastX = midX;
        touchLastY = midY;
    }

    e.preventDefault();
}, { passive: false });

window.addEventListener('touchend', () => dragging = false);

// ----------------------
// Update camera each frame (smooth interpolation)
// ----------------------
app.on('update', dt => {
    orbit.pitch += (orbitTarget.pitch - orbit.pitch) * damping;
    orbit.yaw += (orbitTarget.yaw - orbit.yaw) * damping;
    orbit.distance += (orbitTarget.distance - orbit.distance) * damping;

    const x = orbit.target.x + orbit.distance * Math.cos(orbit.pitch) * Math.sin(orbit.yaw);
    const y = orbit.target.y + orbit.distance * Math.sin(orbit.pitch);
    const z = orbit.target.z + orbit.distance * Math.cos(orbit.pitch) * Math.cos(orbit.yaw);

    camera.setPosition(x, y, z);
    camera.lookAt(orbit.target);
});
