// ----------------------
// Configuration
// ----------------------
const START_DISTANCE = 5; // change this to set default camera distance
const ROTATION_SENSITIVITY = 0.005;
const ZOOM_SPEED = 0.3;
const LERP_SPEED = 10.0;
const ZOOM_LERP_SPEED = 10.0;

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
camera.setPosition(0, 0, START_DISTANCE);
app.root.addChild(camera);

// ----------------------
// Lights
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
// Load GLB model
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

modelAsset.on('error', (err) => console.error('Failed to load GLB:', err));

// ----------------------
// Orbit setup
// ----------------------
let orbit = {
    target: new pc.Vec3(0, 0, 0),
    yaw: 0,
    pitch: 0,
    currentYaw: 0,
    currentPitch: 0,
    distance: START_DISTANCE,
    targetDistance: START_DISTANCE,
    sensitivity: ROTATION_SENSITIVITY,
    zoomSpeed: ZOOM_SPEED,
    lerpSpeed: LERP_SPEED,
    zoomLerpSpeed: ZOOM_LERP_SPEED
};

let dragging = false;
let lastX = 0;
let lastY = 0;
let touchLastX = 0;
let touchLastY = 0;
let pinchStartDistance = 0;
let initialDistance = START_DISTANCE;

// ----------------------
// Mouse controls
// ----------------------
canvas.addEventListener('mousedown', e => {
    dragging = true;
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

    orbit.yaw -= dx * orbit.sensitivity;
    orbit.pitch += dy * orbit.sensitivity;
    orbit.pitch = pc.math.clamp(orbit.pitch, -Math.PI / 2, Math.PI / 2);
});

// Smooth mouse wheel zoom
canvas.addEventListener('wheel', e => {
    orbit.targetDistance += e.deltaY * orbit.zoomSpeed * 0.01;
    orbit.targetDistance = Math.max(0.1, orbit.targetDistance);
});

// ----------------------
// Touch controls (mobile rotation + pinch zoom)
// ----------------------
canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
        const t = e.touches[0];
        dragging = true;
        touchLastX = t.clientX;
        touchLastY = t.clientY;
    } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchStartDistance = Math.sqrt(dx * dx + dy * dy);
        initialDistance = orbit.targetDistance;
    }
});

canvas.addEventListener('touchmove', e => {
    if (e.touches.length === 1 && dragging) {
        const t = e.touches[0];
        const dx = t.clientX - touchLastX;
        const dy = t.clientY - touchLastY;
        touchLastX = t.clientX;
        touchLastY = t.clientY;

        orbit.yaw -= dx * orbit.sensitivity;
        orbit.pitch += dy * orbit.sensitivity;
        orbit.pitch = pc.math.clamp(orbit.pitch, -Math.PI / 2, Math.PI / 2);
        e.preventDefault();
    } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const pinchDistance = Math.sqrt(dx * dx + dy * dy);
        const scale = pinchStartDistance / pinchDistance;
        orbit.targetDistance = initialDistance * scale;
        orbit.targetDistance = Math.max(0.1, orbit.targetDistance);
        e.preventDefault();
    }
}, { passive: false });

window.addEventListener('touchend', e => {
    if (e.touches.length === 0) dragging = false;
});

// ----------------------
// Update camera each frame (smooth rotation + zoom)
// ----------------------
app.on('update', dt => {
    const t = orbit.lerpSpeed * dt;
    orbit.currentYaw = pc.math.lerp(orbit.currentYaw, orbit.yaw, t);
    orbit.currentPitch = pc.math.lerp(orbit.currentPitch, orbit.pitch, t);

    const zt = orbit.zoomLerpSpeed * dt;
    orbit.distance = pc.math.lerp(orbit.distance, orbit.targetDistance, zt);

    const x = orbit.target.x + orbit.distance * Math.cos(orbit.currentPitch) * Math.sin(orbit.currentYaw);
    const y = orbit.target.y + orbit.distance * Math.sin(orbit.currentPitch);
    const z = orbit.target.z + orbit.distance * Math.cos(orbit.currentPitch) * Math.cos(orbit.currentYaw);

    camera.setPosition(x, y, z);
    camera.lookAt(orbit.target);
});
