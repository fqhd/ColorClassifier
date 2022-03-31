import express from 'express';
import cors from 'cors';
const app = express();

// Express Configuration
app.use(express.json({limit: '1mb'}));
app.use(cors());
app.post('/data', (request, response) => {
	console.log(request.body);
});


// Starting the server
app.listen(3000, () => {
	console.log('server is running...');
});

