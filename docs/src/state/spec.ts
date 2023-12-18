import { defineStore } from 'pinia';
import data from '../../../server/spec.yaml';
import { Spec } from '../types';
const spec: Spec = data as Spec;

function getTagNamesAndSlugs(spec: Spec) {
	return spec.tags.map(tag => {
		return {
			label: tag.name,
			path: '/' + tag.name.toLowerCase().replace(' ', '-')
		};
	});
}

export const useSpecStore = defineStore('spec', {
	state: () => spec,
	getters: {
		routes: () => getTagNamesAndSlugs(spec),
		endpointsForTag: () => (tag: string) => {
			return Object.values(spec.paths).filter(item => {
				return Object.values(item)[0].tags.includes(tag);
			});
		}
	},
	actions: {
	},
});
