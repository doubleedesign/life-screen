import Router from 'express-promise-router';
import { LightNetwork } from './LightNetwork';
import chalk from 'chalk';
import { FancyLight, LightState } from './types';
import { Group } from 'lifxware/dist/packets/group/group';
import { ResponseCode } from '../responses';
const router = Router();

const network = new LightNetwork();

/**
 * Discover and cache lights
 */
router.patch('/setup', async (req, res) => {
	try {
		const lights: FancyLight[] = await network.getLights();
		res.status(ResponseCode.SuccessCreated).json(lights);
	}
	catch (error) {
		console.log(chalk.red(error.message));
		res.status(ResponseCode[error.name]).json(`${error.name}: ${error.message}`);
	}
});


/**
 * Get summary of lights that have been discovered and cached in this session
 */
router.get('/cache', (req, res) => {
	try {
		const data: FancyLight[] = network.getCache();
		res.status(ResponseCode.SuccessFound).json(data);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(ResponseCode[error.name]).json(`${error.name}: ${error.message}`);
	}
});


/**
 * Get summary of light groups that have been discovered and cached in this session
 */
router.get('/cache/groups', (req, res) => {
	try {
		const data: Group[] = network.getGroups();
		return res.status(ResponseCode.SuccessFound).json(data);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(ResponseCode[error.name]).json(`${error.name}: ${error.message}`);
	}
});


/**
 * Get the cached summary of a light
 */
router.get('/:id', (req, res) => {
	try {
		const cached = network.getCachedLight(req.params.id);
		res.status(ResponseCode.SuccessFound).json(cached);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(ResponseCode[error.name]).json(`${error.name}: ${error.message}`);
	}
});


/**
 * Fetch/update and cache the current state of a light.
 */
router.patch('/:id/state', async (req, res) => {
	try {
		const data: LightState = await network.getLightState(req.params.id);
		res.status(ResponseCode.SuccessCreated).json(data);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(ResponseCode[error.name]).json(`${error.name}: ${error.message}`);
	}
});


/**
 * Fetch/update and cache the hardware information for a light.
 */
router.patch('/:id/device', async (req, res) => {
	try {
		const data: Pick<FancyLight, 'hardware' | 'type'> = await network.getLightHardware(req.params.id);
		res.status(ResponseCode.SuccessCreated).json(data);
	}
	catch(error) {
		console.log(chalk.red(error.message));
		res.status(ResponseCode[error.name]).json(`${error.name}: ${error.message}`);
	}
});

export default router;
