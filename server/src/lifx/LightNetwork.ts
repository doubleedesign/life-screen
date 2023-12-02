import pWaitFor from 'p-wait-for';
import { Light } from 'lifxware/dist/light';
import { Group } from 'lifxware/dist/packets/group/group';
import { Version } from 'lifxware/dist/packets/version/version';
import { Client } from 'lifxware';
import pick from 'lodash/pick';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import chalk from 'chalk';
import productRegistry from './products.json' assert { type: 'json' };
import { FancyLight, LightState, Product } from './types';
import { config } from 'dotenv';

config();


export class LightNetwork {
	client: Client;
	lights: FancyLight[];
	knownAddresses: string[] = process.env.LIFX_LOCAL_IP_ADDRESSES.split(',');

	constructor() {
		this.client = new Client({
			startDiscovery: false
		});
	}


	/**
	 * Get all currently saved light data
	 */
	getLightCache(): FancyLight[] {
		return this.lights;
	}


	/**
	 * Discover and save lights
	 *
	 * @return Promise<FancyLight[]>
	 */
	async getLights(): Promise<FancyLight[]> {
		const lights: {[key:string]: Light} = {};
		const result: {[id: string]: FancyLight} = {};
		console.log(chalk.cyan('Discovering lights...'));

		this.client.startDiscovery();

		this.client.on('light-new', async (light: Light) => {
			lights[light.id] = light;

			result[light.id] = {
				...pick(light, ['label', 'id', 'address'])
			};
		});

		// TODO: This times out if fewer than ALL known lights are found; need a way to return the ones that are
		await pWaitFor(() => Object.keys(lights).length >= this.knownAddresses.length, { timeout: 15000 });

		this.client.stopDiscovery();
		console.log('Light discovery process finished.');
		console.log(chalk.cyan('Fetching groups...'));

		for (const [id, light] of Object.entries(lights)) {
			result[id].group = await light.getGroup();
		}

		console.log('Light data populated.');

		const data: FancyLight[] = Object.values(result);
		this.lights = data;

		return data;
	}


	/**
	 * Get all currently saved light groups
	 *
	 * @return Group[]
	 */
	getGroups(): Group[] {
		const groups = this.lights.map(light => light.group);
		return uniqWith(groups, isEqual);
	}


	/**
	 * Get the current state of a light by its ID
	 * @param id
	 *
	 * @return LightState
	 */
	async getLightState(id: string): Promise<LightState> {
		const light = this.client.light(id);
		const state: LightState = await light.getState() as LightState;

		this.lights[id].state = state;

		return state;
	}


	/**
	 * Get hardware and product details of a light by its ID
	 * @param id
	 *
	 * @return Promise<Pick<FancyLight, 'hardware' | 'type'>
	 */
	async getLightHardware(id: string): Promise<Pick<FancyLight, 'hardware' | 'type'>> {
		const light = this.client.light(id);
		const hardware: Version = await light.getHardwareVersion() as Version;
		const type: Product =  this.getProductById(hardware.productId);

		this.lights[id].hardware = hardware;
		this.lights[id].type = type;

		return {
			hardware: hardware,
			type: type
		};
	}


	/**
	 * Find details of a Lifx product in the registry file downloaded from https://github.com/LIFX/products/blob/master/products.json
	 * Also see: https://lan.developer.lifx.com/docs/product-registry
	 * @param productId
	 *
	 * @return Product
	 */
	getProductById(productId: number): Product {
		return productRegistry.products.find((product: Product) => (product).pid === productId);
	}

}
