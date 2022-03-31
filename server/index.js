import express from 'express';
import cors from 'cors';
import Nedb from 'nedb';
const app = express();
const database = new Nedb('database.db');

database.loadDatabase();

// Express Configuration
app.use(express.json({limit: '1mb'}));
app.use(cors());
app.post('/data', (request, response) => {
	const entry = request.body;
	database.insert(entry);
});

// Starting the server
app.listen(3000, () => {
	console.log('server is running...');
});

