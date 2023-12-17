import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';
import Tag from './components/Tag.vue';
import './style.css';
import data from '../../server/spec.yaml';
import { Spec } from './types';
const spec: Spec = data as Spec;
//import devtools from '@vue/devtools';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight);

const endpointPaths = spec.tags.map(tag => {
	return {
		path: '/' + tag.name.toLowerCase().replace(' ', '-'),
		component: Tag
	};
});

const router = createRouter({
	history: createWebHistory(),
	routes: [
		...endpointPaths
	]
});

const store = createPinia();
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount('#app');

// if (process.env.NODE_ENV === 'development') {
// 	devtools.connect(/* host, port */);
// }
