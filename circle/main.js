import { getCircumference, getArea, getVolume } from './math.js';

const calculatorForm = document.getElementById('calculatorForm');
const radiusInput = document.getElementById('radiusInput');
const resultsDiv = document.getElementById('results');

calculatorForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const radius = parseFloat(radiusInput.value);

    if (isNaN(radius) || radius <= 0) {
        resultsDiv.innerHTML = '<p class="error">Please enter a valid positive radius.</p>';
        return;
    }

    const circ = getCircumference(radius);
    const area = getArea(radius);
    const volume = getVolume(radius);

    resultsDiv.innerHTML = `
        <p><strong>Circumference:</strong> ${circ.toFixed(2)} cm</p>
        <p><strong>Circle area:</strong> ${area.toFixed(2)} cm²</p>
        <p><strong>Sphere volume:</strong> ${volume.toFixed(2)} cm³</p>
    `;
});