const redSlider = document.getElementById('slider-1');
const greenSlider = document.getElementById('slider-2');
const blueSlider = document.getElementById('slider-3');
const colorDisplay = document.getElementById('colorDisplay');
const prediction = document.getElementById('prediction');
const label_1 = document.getElementById('label-1');
const label_2 = document.getElementById('label-2');
const label_3 = document.getElementById('label-3');
let model;
const labels = ['orange-ish', 'blue-ish', 'green-ish', 'purple-ish', 'red-ish', 'brown-ish', 'yellow-ish', 'pink-ish'];

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
	label_1.innerText = r;
	label_2.innerText = g;
	label_3.innerText = b;

	const xs = tf.tensor([[r/255, g/255, b/255]], [1, 3], 'float32');
	const result = model.predict(xs);
	const index = result.argMax(1).dataSync();
	xs.dispose();
	result.dispose();
	
	prediction.innerText = labels[index];
}

main();