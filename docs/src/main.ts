import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';
import Tag from './components/Tag.vue';
import './style.css';
import data from '../../server/spec.yaml';
import { Spec } from './types';
const spec: Spec = data as Spec;

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
const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');
