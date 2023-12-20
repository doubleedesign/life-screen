import { defineStore } from 'pinia';
import data from '../content/spec.yaml';
const spec: Spec = data as Spec;
import { Endpoint, Spec } from '../types';
import groupBy from 'lodash/groupBy';
import flatten from 'lodash/flatten';

function getTagNamesAndSlugs(spec: Spec) {
	return spec.tags.map(tag => {
		return {
			label: tag.name,
			path: '/' + tag.name.toLowerCase().replace(' ', '-')
		};
	});
}

function getPathsByTag(spec: Spec) {
	const transformed = Object.entries(spec.paths).map(([path, item]) => {
		return Object.entries(item).map(([operation, details]) => {
			return {
				path: path,
				operation: operation,
				...details
			};
		});
	});

	const flattened: Endpoint[] = flatten(transformed) as Endpoint[];

	return groupBy(flattened, 'tags'); // TODO: account for items having more than one tag
}

export const useSpecStore = defineStore('spec', {
	state: () => {
		return {
			...spec,
			pathsByTag: getPathsByTag(spec)
		};
	},
	getters: {
		routes: () => getTagNamesAndSlugs(spec),
		endpointsForTag: (state) => (tag: string) => {
			const result: Endpoint[] = state.pathsByTag[tag];
			return result;
		}
	},
	actions: {
	},
});
