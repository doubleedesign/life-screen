<script setup lang="ts">
import { useRouter } from 'vue-router';
import compact from 'lodash/compact';
import MenuListInteractive from './MenuListInteractive.vue';

const router = useRouter();
const topLevelItems = router.getRoutes().filter(route => {
	const level = compact(route.path.split('/')).length;
	return level === 1 && route.name !== '';
});
</script>

<template>
    <nav class="menu">
		<MenuListInteractive :items="topLevelItems" :depth="3" />
    </nav>
</template>

<style scoped lang="scss">
</style>
