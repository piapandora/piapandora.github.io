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

modelAsset.on('error', (err) => {
    console.error('Failed to load GLB:', err);
});

// ----------------------
// Orbit/pan control setup
// ----------------------
let orbit = {
    pitch: 0,
    yaw: 0,
    distance: 4,
    target: new pc.Vec3(0, 0, 0),
    sensitivity: 0.005,
    zoomSpeed: 0.1,
    panSpeed: 0.005
};

let dragging = false;
let action = 'none'; // 'orbit' or 'pan'
let lastX = 0;
let lastY = 0;

// ----------------------
// Mouse controls
// ----------------------
canvas.addEventListener('mousedown', e => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;

    if (e.button === 0) {
        action = 'orbit'; // left
    } else if (e.button === 1 || e.button === 2) {
        action = 'pan'; // middle or right
    }
});

window.addEventListener('mouseup', () => {
    dragging = false;
    action = 'none';
});

window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    if (action === 'orbit') {
        orbit.yaw -= dx * orbit.sensitivity;
        orbit.pitch += dy * orbit.sensitivity;
        orbit.pitch = pc.math.clamp(orbit.pitch, -Math.PI / 2, Math.PI / 2);
    } else if (action === 'pan') {
        const panOffset = new pc.Vec3(-dx * orbit.panSpeed, dy * orbit.panSpeed, 0);
        // Transform pan to camera local space
        const right = camera.right;
        const up = camera.up;
        orbit.target.add(pc.Vec3.scale(right, panOffset.x));
        orbit.target.add(pc.Vec3.scale(up, panOffset.y));
    }
});

// Scroll zoom
canvas.addEventListener('wheel', e => {
    orbit.distance += e.deltaY * orbit.zoomSpeed * 0.01;
    orbit.distance = Math.max(0.1, orbit.distance);
});

// ----------------------
// Touch controls
// ----------------------
let touchLastX = 0;
let touchLastY = 0;
let lastDistance = 0;

canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
        dragging = true;
        action = 'orbit';
        const t = e.touches[0];
        touchLastX = t.clientX;
        touchLastY = t.clientY;
    } else if (e.touches.length === 2) {
        dragging = true;
        action = 'panZoom';
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        lastDistance = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        touchLastX = (t0.clientX + t1.clientX) / 2;
        touchLastY = (t0.clientY + t1.clientY) / 2;
    }
});

canvas.addEventListener('touchmove', e => {
    if (!dragging) return;

    if (e.touches.length === 1 && action === 'orbit') {
        const t = e.touches[0];
        const dx = t.clientX - touchLastX;
        const dy = t.clientY - touchLastY;
        touchLastX = t.clientX;
        touchLastY = t.clientY;

        orbit.yaw -= dx * orbit.sensitivity;
        orbit.pitch += dy * orbit.sensitivity;
        orbit.pitch = pc.math.clamp(orbit.pitch, -Math.PI / 2, Math.PI / 2);
    } else if (e.touches.length === 2 && action === 'panZoom') {
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const midX = (t0.clientX + t1.clientX) / 2;
        const midY = (t0.clientY + t1.clientY) / 2;

        // Pan
        const dx = midX - touchLastX;
        const dy = midY - touchLastY;
        touchLastX = midX;
        touchLastY = midY;

        const panOffset = new pc.Vec3(-dx * orbit.panSpeed, dy * orbit.panSpeed, 0);
        const right = camera.right;
        const up = camera.up;
        orbit.target.add(pc.Vec3.scale(right, panOffset.x));
        orbit.target.add(pc.Vec3.scale(up, panOffset.y));

        // Zoom
        const currentDistance = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        orbit.distance *= lastDistance / currentDistance;
        lastDistance = currentDistance;
        orbit.distance = Math.max(0.1, orbit.distance);
    }

    e.preventDefault();
}, { passive: false });

window.addEventListener('touchend', () => {
    dragging = false;
    action = 'none';
});

// ----------------------
// Update camera each frame
// ----------------------
app.on('update', dt => {
    const x = orbit.target.x + orbit.distance * Math.cos(orbit.pitch) * Math.sin(orbit.yaw);
    const y = orbit.target.y + orbit.distance * Math.sin(orbit.pitch);
    const z = orbit.target.z + orbit.distance * Math.cos(orbit.pitch) * Math.cos(orbit.yaw);

    camera.setPosition(x, y, z);
    camera.lookAt(orbit.target);
});
