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

const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
	console.log('server is running...');
});

