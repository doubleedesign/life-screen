<script setup lang="ts">
import { useRouter, useRoute, RouteRecordNormalized } from 'vue-router';

const routes = useRouter().getRoutes();
const current = useRoute();
const tree = Array(routes.find(route => current.matched[0].path === route.path && current.matched[0].name === route.name));
</script>

<template>
	<nav class="section-menu" aria-label="Section menu">
		<ul class="section-menu__list">
			<li v-for="item in tree" class="section-menu__list__item">
				<router-link :to="(item as RouteRecordNormalized).path">{{(item as RouteRecordNormalized).name}}</router-link>
				<ul v-if="(item as RouteRecordNormalized).children.length > 0" class="section-menu__list">
					<template v-for="subItem in (item as RouteRecordNormalized).children">
						<li v-if="subItem.path" class="section-menu__list__item">
							<router-link :to="(item as RouteRecordNormalized).path + '/' + subItem.path">{{subItem.name}}</router-link>
						</li>
					</template>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<style scoped lang="scss">
	.section-menu {

	}
</style>
