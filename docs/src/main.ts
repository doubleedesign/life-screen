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
// @ts-ignore
import SetupIntroText from './content/setup/intro.md';
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
//import devtools from '@vue/devtools';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'Setup',
			path: '/setup',
			components: {
				default: Page
			},
			children: [
				{
					path: '',
					name: '',
					components: {
						content: SetupIntroText
					}
				},
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
			children: [
				{
					path: '',
					name: '',
					components: {}
				},
				...spec.tags.map(tag => {
					return {
						name: tag.name,
						path: tag.name.toLowerCase().replace(' ', '-'),
						components: {
							default: Tag
						}
					};
				})]
		},
		{
			path: '/development',
			name: 'Development',
			components: {
				default: Page
			},
			children: [
				{
					path: '',
					name: '',
					components: {
						content: DevGeneralText
					}
				},
				{
					path: 'postman',
					name: 'Testing in Postman',
					components: {},
					children: [
						{
							name: 'This app\'s REST API',
							path: 'lifescreen',
							components: {
								content: DevPostmanText1
							}
						},
						{
							name: 'Integrated services',
							path: 'integrations',
							components: {
								content: DevPostmanText2
							}
						},
					]
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
