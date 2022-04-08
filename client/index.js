const redSlider = document.getElementById('slider-1');
const greenSlider = document.getElementById('slider-2');
const blueSlider = document.getElementById('slider-3');
const colorDisplay = document.getElementById('colorDisplay');
const prediction = document.getElementById('prediction');
let model;
const labels = ['brown-ish', 'blue-ish', 'green-ish', 'purple-ish', 'red-ish', 'orange-ish', 'yellow-ish', 'pink-ish'];

async function main(){
	model = await tf.loadLayersModel('./color_classification_model.json');
	setInputSliderCallbacks();
}

function setInputSliderCallbacks(){
	redSlider.addEventListener('input', inputCallback);
	greenSlider.addEventListener('input', inputCallback);
	blueSlider.addEventListener('input', inputCallback);
}

function inputCallback(){
	const r = redSlider.value;
	const g = greenSlider.value;
	const b = blueSlider.value;

	colorDisplay.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

	const xs = tf.tensor([[r/255, g/255, b/255]], [1, 3], 'float32');
	const result = model.predict(xs);
	const index = result.argMax(1).dataSync();
	xs.dispose();
	
	prediction.innerText = labels[index];
}

main();