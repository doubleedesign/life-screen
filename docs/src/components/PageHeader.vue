<script lang="ts">
import Menu from './Menu.vue';
import { useSpecStore } from '../state/store.ts';

export default {
	components: {
		Menu
	},
	props: {},
	data() {
		const spec = useSpecStore();
		return {
			title: spec.info.title,
			tagline: spec.info.description
		};
	},
	computed: {},
	methods: {}
};
</script>;

<template>
	<header class="page-header">
        <h1><router-link to="/">{{ title }}</router-link></h1>
        <p>{{ tagline }}</p>
		<Menu/>
	</header>
</template>;

<style scoped lang="scss">
	.page-header {
        background: #EFEFEF;
        height: 100%;
        padding: 1rem;

        h1 {
            margin: 0;
        }
	}
</style>;
