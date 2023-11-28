import require from 'require-from-esm';
const LifxClient = require('lifx-lan-client').Client;
import pick from 'lodash/pick';


type GlobeSummary = {
	id: string;
	label: string;
	address: string;
	port: number;
	power: number;
	color: {
		hue: number;
		saturation: number;
		brightness: number;
		kelvin: number;
	},
	productName: string;
	productFeatures: unknown;
}

export class LightNetwork {
	client: typeof LifxClient;
	lights: object;
	knownAddresses: string[];

	constructor() {
		this.client = new LifxClient();
		this.knownAddresses = ['192.168.68.115'];
		this.lights = {};

		this.client.init();
	}

	fetchLights() {
		this.client.startDiscovery(this.knownAddresses);

		this.client.on('light-online', function (light) {
			console.log(light);
		});

		this.client.on('light-new', function (light) {
			console.log(light);
		});

		//this.client.stopDiscovery();

		//return this.lights;
	}

	saveOrUpdateLight(light) {
		Object.defineProperty(this.lights, light.id, light);
	}
}

// const client = new LifxClient();
// const lights = {};
// client.on('light-online', function(light) {
// 	Object.defineProperty(lights, light.id, light);
// });
//
// client.on('light-new', function(light) {
// 	Object.defineProperty(lights, light.id, light);
// });
//
// client.init({
// 	startDiscovery: true, // start discovery after initialization
// 	address: '0.0.0.0', // the IPv4 address to bind the udp connection to
// 	broadcast: '255.255.255.255', // the IPv4 broadcast address which is addressed to discover bulbs
// 	lights: [], // Can be used provide a list of known light IPv4 ip addresses if broadcast packets in network are not allowed
// 	stopAfterDiscovery: true, // stops discovery process after discovering all known lights
// 	discoveryInterval: 5000, // Interval (in ms) between discovery operations
// });
//
// export const lightNetwork = {
// 	client: client,
// 	lights: lights
// };
