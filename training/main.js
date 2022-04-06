let database;


async function main(){
	connectToFirebase();
	const crowdsourceData = await getCrowdsourceData();
	const { xs, ys } = createTensors(crowdsourceData);
	// Create the model
	// Train&Test the model
}

function createTensors(crowdsourceData){
	// Creating the inputs
	let inputsArray = [];
	for(const prop in crowdsourceData.trainingData){
		const elementsInColorSection = crowdsourceData.trainingData[prop];
		inputsArray = inputsArray.concat(elementsInColorSection);
	}

	// Creating the labels
	let labelsArray = [];
	let propertyIndex = 0;
	for(const prop in crowdsourceData.trainingData){
		const numEntriesInColorSection = crowdsourceData.trainingData[prop];
		for(let i = 0; i < numEntriesInColorSection.length; i++){
			labelsArray.push(propertyIndex);
		}
		propertyIndex++;
	}
	const labelsTensor = tf.tensor(labelsArray, [labelsArray.length], 'int32');

	const xs = tf.tensor(inputsArray, [inputsArray.length, 3], 'int32');
	const ys = tf.oneHot(labelsTensor, 8);
	return { xs, ys };
}

function createModel(){
	// const model = tf.sequential();
	// model.add({units: 5, inputShape: []});
}

function connectToFirebase(){
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

async function getCrowdsourceData(){
	let cache = await loadCachedData();
	if(!cache.trainingData){
		const firebaseData = await getRawDataFromFirebase();
		cache = parseData(firebaseData);
		displayData(cache);
	}
	return cache;
}

function displayData(data){
	const body = document.getElementById("crowdsourcedData");
	body.textContent = JSON.stringify(data);
}

async function getRawDataFromFirebase(){
	const data = await database.get();
	return data;
}

function parseData(data){
	const trainingData = {};
	const competitionData = {};

	data.forEach(doc => {
		console.log('hello this is an entry');
		const entry = doc.data();

		// Filling training data
		const label = entry.label;
		if(!trainingData[label]){
			trainingData[label] = [[entry.r, entry.g, entry.b]];
		}else{
			trainingData[label].push([entry.r, entry.g, entry.b]);
		}

		// Filling competition data
		const userID = entry.user;
		if(!competitionData[userID]){
			competitionData[userID] = 1;
		}else{
			competitionData[userID]++;
		}
	});

	return { trainingData, competitionData };
}

async function loadCachedData(){
	const response = await fetch('cache.json');
	const json = await response.json();
	return json;
}

main();