<script setup lang="ts">
import { useRouter } from 'vue-router';
import compact from 'lodash/compact';
import MenuList from './MenuList.vue';

const router = useRouter();
const topLevelItems = router.getRoutes().filter(route => {
	const level = compact(route.path.split('/')).length;
	return level === 1 && route.name !== '';
});

console.log(router.getRoutes());
</script>

<template>
    <nav class="menu">
		<MenuList :items="topLevelItems" :depth="2"/>
    </nav>
</template>

<style scoped lang="scss">
</style>
