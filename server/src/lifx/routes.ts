import Router from 'express-promise-router';
import { LightNetwork } from './LightNetwork';
import chalk from 'chalk';
import { FancyLight, LightState } from './types';
import { Group } from 'lifxware/dist/packets/group/group';
const router = Router();

const network = new LightNetwork();

router.patch('/setup', async (req, res) => {
	try {
		const lights: FancyLight[] = await network.getLights();
		res.status(201).json(lights);
	}
	catch (error) {
		console.log(chalk.red(error.message));
		res.status(500).json(`${error.name}: ${error.message}`);
	}
});

router.get('/cache', (req, res) => {
	try {
		const data: FancyLight[] = network.getLightCache();
		if(data.length < 1) {
			res.status(404).json('No lights found, maybe you need to run setup again');
		}
		res.status(200).json(data);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(404).json(`${error.name}: ${error.message}`);
	}
});

router.get('/cache/groups', (req, res) => {
	try {
		const data: Group[] = network.getGroups();
		return res.status(200).json(data);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(404).json(`${error.name}: ${error.message}`);
	}
});

router.get('/:id', (req, res) => {
	try {
		const cached = network.getLightCache().find(light => light.id === req.params.id);
		if(cached) {
			res.status(200).json(cached);
		}
		res.status(404).json(`Light ${req.params.id} not found. Try running setup again to discover available lights.`);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(404).json(`${error.name}: ${error.message}`);
	}
});

router.patch('/:id/state', async (req, res) => {
	try {
		const data: LightState = await network.getLightState(req.params.id);
		res.status(200).json(data);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(500).json(`${error.name}: ${error.message}`);
	}
});

router.patch('/:id/device', async (req, res) => {
	try {
		const data: Pick<FancyLight, 'hardware' | 'type'> = await network.getLightHardware(req.params.id);
		res.status(200).json(data);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(500).json(`${error.name}: ${error.message}`);
	}
});

export default router;
