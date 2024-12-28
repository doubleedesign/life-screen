import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';
import msGraphRouter from './msgraph/index.ts';
import MsgraphClient from './msgraph/graph.ts';
import { config } from 'dotenv';
config();

const app = express();
app.use(cors({
	origin: 'https://localhost:3000',
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Third-party API integrations
app.locals.msGraph = new MsgraphClient();

// API endpoints
app.use('/msgraph', msGraphRouter);
//app.use('/gcal', googleRouter);
//app.use('/lifx', lifxRouter);

app.use('/', (req, res) => {
	res.status(200).json(listEndpoints(app));
});

// Start server
app.listen(3001, () => {
	console.log('Server running on port 3001');
	console.log('To see all available endpoints, visit http://localhost:3001/');
});

