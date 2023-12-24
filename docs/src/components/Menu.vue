<script setup lang="ts">
import { useRouter } from 'vue-router';
import compact from 'lodash/compact';

const router = useRouter();
const topLevelItems = router.getRoutes().filter(route => {
	const level = compact(route.path.split('/')).length;
	return level === 1 && route.name !== '';
});
</script>

<template>
    <nav class="menu">
		<ul class="menu__list">
			<li v-for="item in topLevelItems" class="menu__list__item">
				<router-link :to="item.path">{{item.name}}</router-link>
				<ul v-if="item.children.length > 0" class="menu__list">
					<template v-for="subItem in item.children">
						<li v-if="subItem.path" class="menu-list__item">
							<router-link :to="item.path + '/' + subItem.path">{{subItem.name}}</router-link>
						</li>
					</template>
				</ul>
			</li>
		</ul>
    </nav>
</template>

<style scoped lang="scss">
	.menu {
		&__list {
			margin: 0 0 1rem 0;
			padding: 0;
			list-style: none;
			width: 100%;

			&__item {
				display: flex;
				flex-basis: 100%;
				flex-wrap: wrap;
			}
		}
	}
</style>
