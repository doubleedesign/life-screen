import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import data from './content/spec.yaml';
import { Spec } from './types';
const spec: Spec = data as Spec;
import { ContentTree, Leaf, Twig } from './content';
import sortBy from 'lodash/sortBy';
import App from './App.vue';
import Page from './components/Page.vue';
import Tag from './components/Tag.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight);
import './style.css';
import { log } from 'node:util';

const contentTree = new ContentTree().growTree();

/**
 * Content component - markdown files
 * branch/index.md: For the root page of a top-level branch
 * branch/item/index.md: For the root page of a "twig" i.e., a subfolder, a second-level branch with third-level "leaves" (child pages)
 * branch/item.md: If item.path exists, this is probably a standard "leaf" route with a matching markdown filename that defines the content of the page
 */
const markdownPageRoutes = contentTree.map(branch => {
	return {
		name: branch.name,
		path: '/' + branch.path,
		components: {
			default: Page
		},
		children: sortBy(branch.children.map((twig: Twig | Leaf) => {
			return {
				name: twig.name,
				path: twig.path,
				components: {
					content: twig.path !== ''
						? import(`./content/${branch.path}/${twig.path}.md`).catch(() => import((`./content/${branch.path}/${twig.path}/index.md`)))
						: import(`./content/${branch.path}/index.md`)
				},
				children: (twig as Twig)?.children?.map((leaf: Leaf) => {
					return {
						path: leaf.path,
						name: leaf.name,
						//  TODO: This isn't working but I think it's just because of the 'twig' parent taking up the content router-view
						components: {
							content: leaf.path !== ''
								? import(`./content/${branch.path}/${twig.path}/${leaf.path}.md`)
								: import(`./content/${branch.path}/${twig.path}/index.md`)
						}
					};
				})
			};
		}), 'name')
	};
});

const openApiSpecRoutes = [{
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
}];

const router = createRouter({
	history: createWebHistory(),
	routes: [...markdownPageRoutes, ...openApiSpecRoutes]
});

const store = createPinia();
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount('#app');
