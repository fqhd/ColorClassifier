const canvasElement = document.getElementById('canvas');
const ctx = canvasElement.getContext('2d');
let r, g, b;
const SERVER_IP = '';

changeCanvasColor();

// Setting up the buttons
for(let i = 0; i < 8; i++){
	const buttonID = 'button' + (i+1);
	document.getElementById(buttonID).onclick = buttonFunc;
}
document.getElementById('skipButton').onclick = changeCanvasColor;

function buttonFunc(param){
	const buttonText = param.srcElement.innerText;

	// Send canvas color and buttonText to server
	sendDataToServer(buttonText);

	changeCanvasColor();
}

function sendDataToServer(buttonText){
	const obj = {
		label: buttonText,
		r, g, b
	};
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	};
	fetch(SERVER_IP + '/data', options);
}

function changeCanvasColor(){
	r = Math.floor(Math.random() * 255);
	g = Math.floor(Math.random() * 255);
	b = Math.floor(Math.random() * 255);
	ctx.fillStyle = rgbToString(r, g, b);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function rgbToString(r, g, b){
	return `rgb(${r}, ${g}, ${b})`;
}
