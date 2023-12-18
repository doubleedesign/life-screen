<script setup lang="ts">
import { useSpecStore } from '../state/spec.ts';
const spec = useSpecStore();
</script>

<template>
    <nav class="menu">
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
