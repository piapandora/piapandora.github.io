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
    { name: 'top', angles: [45, 0, 0], intensity: 1 },
    { name: 'bottom', angles: [180, 0, 0], intensity: 0.5 },
    { name: 'front-right', angles: [90, 45, 0], intensity: 0.66 },
    { name: 'front-left', angles: [90, -45, 0], intensity: 0.66 },
    { name: 'back-right', angles: [90, 135, 0], intensity: 0.66 },
    { name: 'back-left', angles: [90, -135, 0], intensity: 0.66 }
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

// ----------------------
// Enhanced Orbit Control
// ----------------------
let orbit = {
    pitch: 0,
    yaw: 0,
    distance: 4,
    target: new pc.Vec3(0, 0, 0),

    // Sensitivity
    rotSens: 0.005,
    panSens: 0.005,
    zoomSens: 0.003
};

let dragging = false;
let lastX = 0;
let lastY = 0;
let lastDistance = 0;

// ----------------------
// Mouse rotate
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

    orbit.yaw -= dx * orbit.rotSens;
    orbit.pitch += dy * orbit.rotSens;
    orbit.pitch = pc.math.clamp(orbit.pitch, -Math.PI / 2, Math.PI / 2);
});

// Mouse wheel zoom
canvas.addEventListener('wheel', e => {
    orbit.distance += e.deltaY * orbit.zoomSens;
    orbit.distance = Math.max(0.1, orbit.distance);
});

// ----------------------
// Touch input (FULL FEATURED)
// ----------------------
canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
        // one finger rotate
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        // pinch zoom or pan
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastDistance = Math.sqrt(dx * dx + dy * dy);
    }
}, { passive: false });

canvas.addEventListener('touchmove', e => {
    if (e.touches.length === 1) {
        // ROTATE
        const t = e.touches[0];

        const dx = t.clientX - lastX;
        const dy = t.clientY - lastY;
        lastX = t.clientX;
        lastY = t.clientY;

        orbit.yaw -= dx * orbit.rotSens;
        orbit.pitch += dy * orbit.rotSens;
        orbit.pitch = pc.math.clamp(orbit.pitch, -Math.PI / 2, Math.PI / 2);

    } else if (e.touches.length === 2) {
        // Pinch OR Pan
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const delta = dist - lastDistance;
        lastDistance = dist;

        orbit.distance -= delta * orbit.zoomSens * 0.5;
        orbit.distance = Math.max(0.1, orbit.distance);
    }

    e.preventDefault();
}, { passive: false });

// Double tap → reset view
let lastTap = 0;
canvas.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - lastTap < 250) {
        orbit.pitch = 0;
        orbit.yaw = 0;
        orbit.distance = 4;
    }
    lastTap = now;
});

// ----------------------
// Update camera each frame
// ----------------------
app.on('update', dt => {
    const x = orbit.target.x +
        orbit.distance * Math.cos(orbit.pitch) * Math.sin(orbit.yaw);

    const y = orbit.target.y +
        orbit.distance * Math.sin(orbit.pitch);

    const z = orbit.target.z +
        orbit.distance * Math.cos(orbit.pitch) * Math.cos(orbit.yaw);

    camera.setPosition(x, y, z);
    camera.lookAt(orbit.target);
});
