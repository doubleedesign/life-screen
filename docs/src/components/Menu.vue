<script setup lang="ts">
import { useSpecStore } from '../state/spec.ts';
import { useRouter } from 'vue-router';
const spec = useSpecStore();
const router = useRouter();
const topLevelItems = router.getRoutes().filter(route => route.children.length > 0);
</script>

<template>
    <nav class="menu">
		<ul class="menu__list">
			<li v-for="item in topLevelItems" class="menu-list__item">
				<router-link :to="item.path">{{item.name}}</router-link>
				<ul class="menu__list">
					<li v-for="subItem in item.children" class="menu-list__item">
						<router-link :to="item.path + '/' + subItem.path">{{subItem.name}}</router-link>
					</li>
				</ul>
			</li>
		</ul>
        <ul class="menu__list">
            <li class="menu-list__item" v-for="item in spec.routes">
                <router-link :key="item.path" :to="item.path">{{item.label}}</router-link>
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

		&__item {
			display: flex;
		}
	}
}
</style>
