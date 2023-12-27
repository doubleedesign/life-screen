import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import Markdown from 'vite-plugin-md';
import { full as emoji } from 'markdown-it-emoji';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/], // <--
		}),
		ViteYaml(),
		Markdown({
			markdownItOptions: {
			},
			markdownItSetup(md) {
				md.use(emoji);
			},
		})
	],
});
