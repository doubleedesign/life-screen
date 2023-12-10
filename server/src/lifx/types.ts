import { ColorHSBK } from 'lifxware/dist/packets/color/colorHSBK';
import { Group } from 'lifxware/dist/packets/group/group';
import { Version } from 'lifxware/dist/packets/version/version';

export type LightState = {
	connectivity: boolean;
	power: boolean;
	color: ColorHSBK;
}

export type Product = {
	pid: number;
	name: string;
	features: unknown;
	upgrades?: unknown
}

export type FancyLight = {
	label: string;
	id: string;
	address: string;
	group?: Group;
	state?: LightState;
	hardware?: Version;
	type?: Product
}

export type FancyGroup = Group & {
	lights: Pick<FancyLight, 'label' | 'id' | 'address'>
}
