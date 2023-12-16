import { defineStore } from 'pinia';
// @ts-ignore
import data from '../../../server/spec.yaml';
import { Spec } from '../types';
const spec: Spec = data as Spec;

export const useSpecStore = defineStore('spec', {
	state: () => spec,
	getters: {
		routes: () => spec.tags.map(tag => {
			return {
				label: tag.name,
				path: '/' + tag.name.toLowerCase().replace(' ', '-')
			};
		})
	},
	actions: {
	},
});
