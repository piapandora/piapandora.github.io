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
camera.addComponent('camera', { clearColor: new pc.Color(1, 0.5, 0) });
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
// Mouse orbit controls (natural vertical drag)
// ----------------------
let orbit = {
    pitch: 0,
    yaw: 0,
    distance: 4,
    target: new pc.Vec3(0, 0, 0),
    sensitivity: 0.005,
    zoomSpeed: 0.1
};

let dragging = false;
let lastX = 0;
let lastY = 0;

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

canvas.addEventListener('wheel', e => {
    orbit.distance += e.deltaY * orbit.zoomSpeed * 0.01;
    orbit.distance = Math.max(0.1, orbit.distance);
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

