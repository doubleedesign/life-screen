import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Tag from './components/Tag.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/msgraph', component: Tag },
		{ path: '/gcal', component: Tag },
		{ path: '/lifx', component: Tag },
	]
});

const app = createApp(App);
app.use(router);

app.mount('#app');
