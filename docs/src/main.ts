import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';
import Page from './components/Page.vue';
import Tag from './components/Tag.vue';
// @ts-ignore
import data from './content/spec.yaml';
import { Spec } from './types';
const spec: Spec = data as Spec;
//import devtools from '@vue/devtools';
// @ts-ignore
import SetupIntegrationsText from './content/setup/integrations.md';
// @ts-ignore
import DevGeneralText from './content/development/general.md';
// @ts-ignore
import DevPostmanText1 from './content/development/postman-lifescreen.md';
// @ts-ignore
import DevPostmanText2 from './content/development/postman-integrations.md';
// @ts-ignore
import DevLinks from './content/development/links.md';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight);
import './style.css';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/setup',
			name: 'Setup',
			components: {
				default: Page
			},
			children: [
				{
					path: 'integrations',
					name: 'Integrations',
					components: {
						content: SetupIntegrationsText
					}
				}
			]
		},
		{
			name: 'REST API',
			path: '/api',
			components: {
				default: Page
			},
			children: spec.tags.map(tag => {
				return {
					name: tag.name,
					path: tag.name.toLowerCase().replace(' ', '-'),
					components: {
						default: Tag
					}
				};
			})
		},
		{
			path: '/development',
			name: 'Development',
			components: {
				default: Page,
				content: DevGeneralText
			},
			children: [
				{
					path: 'postman-lifescreen',
					name: 'Testing the REST API in Postman',
					components: {
						content: DevPostmanText1
					}
				},
				{
					path: 'postman-integrations',
					name: 'Working with integrated services in Postman',
					components: {
						content: DevPostmanText2
					}
				},
				{
					path: 'links',
					name: 'Useful links',
					components: {
						content: DevLinks
					}
				}
			]
		}
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
