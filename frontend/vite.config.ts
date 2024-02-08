import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		basicSsl({
			name: 'local',
			certDir: 'local-dev-certs'
		})
	],
	server: {
		port: 3000,
		strictPort: true
	}
});
