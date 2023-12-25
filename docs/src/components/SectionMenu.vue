<script setup lang="ts">
import { useRouter, useRoute, RouteRecordNormalized } from 'vue-router';
import MenuList from './MenuList.vue';

const routes = useRouter().getRoutes();
const current = useRoute();
const tree: RouteRecordNormalized[] = Array(routes.find(route => current.matched[0].path === route.path && current.matched[0].name === route.name)) as RouteRecordNormalized[];
</script>

<template>
	<nav class="section-menu" aria-label="Section menu">
		<MenuList :items="tree"/>
	</nav>
</template>

<style scoped lang="scss">
	.section-menu {

	}
</style>
