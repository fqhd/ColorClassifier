const canvasElement = document.getElementById('canvas');
const ctx = canvasElement.getContext('2d');
let r, g, b;
let database;
const inputElement = document.getElementById('inputElement');
const counter = document.getElementById('counter');

function main(){
	changeCanvasColor();
	setupButtons();
	connectToFirebase();
}

function connectToFirebase(){
	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyDdX6Unz9iNFXV1KUVo80GrJ3Coaq8q5PA",
		authDomain: "colorclassifier-110e3.firebaseapp.com",
		projectId: "colorclassifier-110e3",
		storageBucket: "colorclassifier-110e3.appspot.com",
		messagingSenderId: "686401618905",
		appId: "1:686401618905:web:0f111c3f2bf8ebd2b2cfc8"
	};
	firebase.initializeApp(firebaseConfig);
	const db = firebase.firestore();
	database = db.collection('entries');
}

function setupButtons(){
	for(let i = 0; i < 8; i++){
		const buttonID = 'button' + (i+1);
		document.getElementById(buttonID).onclick = buttonFunc;
	}
	document.getElementById('skipButton').onclick = changeCanvasColor;
}

function buttonFunc(param){
	const buttonText = param.srcElement.innerText;
	saveToDatabase(buttonText);
	increaseCounter();
	changeCanvasColor();
}

function saveToDatabase(buttonText){
	const data = {
		r, g, b,
		label: buttonText,
		user: inputElement.value
	};
	database.add(data);
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

function increaseCounter(){
	counter.textContent++;
}

main();