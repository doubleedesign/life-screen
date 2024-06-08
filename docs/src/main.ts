import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPinia } from 'pinia';
import data from './content/spec.yaml';
import { Spec } from './types';
const spec: Spec = data as Spec;
import { Branch, ContentTree, Leaf, Twig } from './content';
import sortBy from 'lodash/sortBy';
import App from './App.vue';
import Page from './components/Page.vue';
import Tag from './components/Tag.vue';
import './style.scss';

const contentTree = new ContentTree().growTree();

/**
 * Content component - markdown files
 * branch/index.md: For the root page of a top-level branch
 * branch/leaf.md: If twig.path exists, this is probably actually a "leaf" i.e. a markdown file that defines the content of a page at the second level that has no children
 * branch/twig/index.md: For the root page of a "twig" i.e., a subfolder, a second-level branch with third-level "leaves" (child pages)
 * branch/twig/leaf.md: For a "leaf" i.e. a markdown file that defines the content of a page at the third level
 *
 * The children at the second level (twigs) are sorted here because the order of the children in the content tree is not guaranteed to be the same as the order of the children in the filesystem
 * due to the way the combination of files and folders within branches is handled when the content tree is built in content/index.ts
 * - Basically it involves ending up with an array with string keys, which is not an issue at the third level (the last level at the time of writing and thus should only contain leaves/files, not more folders)
 */
const markdownPageRoutes: RouteRecordRaw[] = (contentTree.map((branch: Branch) => {
	return {
		name: branch.name,
		path: '/' + branch.path,
		components: {
			default: Page
		},
		children: sortBy(branch.children.map((twig: Twig) => {
			return {
				name: twig.name,
				path: twig.path,
				// Empty path at "twig" level means this is the root page for a directory
				...twig.path === '' && {
					components: {
						default: Page,
						content: () => import(`./content/${branch.path}/index.md`)
					}
				},
				// Non-empty path and no children at "twig" level means this "twig" is actually a "leaf"
				// i.e. a content page directly in the subfolder, no third level
				...twig.path !== '' && !twig.children && {
					components: {
						content: () => import(`./content/${branch.path}/${twig.path}.md`)
					}
				},
				// If the "twig" has children, this is a subfolder with third-level "leaves" (child pages) that need to be mapped here
				...twig.children && {
					children: (twig as Twig)?.children?.map((leaf: Leaf) => {
						return {
							path: leaf.path,
							name: leaf.name,
							components: {
								content: () => leaf.path === ''
									? import(`./content/${branch.path}/${twig.path}/index.md`)
									: import(`./content/${branch.path}/${twig.path}/${leaf.path}.md`)
							}
						};
					})
				}
			};
		}), 'name')
	};
}) as RouteRecordRaw[]);

const openApiSpecRoutes: RouteRecordRaw[] = [{
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
					content: Tag
				}
			};
		})]
}];

const router = createRouter({
	history: createWebHistory(),
	routes: [...markdownPageRoutes, ...openApiSpecRoutes]
});

const store = createPinia();
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
