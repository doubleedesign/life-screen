<script lang="ts">
import { useSpecStore } from '../state/spec.ts';
import { defineComponent, PropType } from 'vue';
import Menu from './Menu.vue';

export default defineComponent({
	components: {
		Menu
	},
	props: {
		as: String as PropType<keyof HTMLElementTagNameMap>
	},
	data() {
		const spec = useSpecStore();
		return {
			title: spec.info.title,
			tagline: spec.info.description,
			element: this.as ?? 'header'
		};
	},
	computed: {},
	methods: {}
});
</script>;

<template>
	<component :is="element" class="page-header">
        <h1><router-link to="/">{{ title }}</router-link></h1>
        <p>{{ tagline }}</p>
		<Menu/>
	</component>
</template>;

<style scoped lang="scss">
	.page-header {
        background: #EFEFEF;
        padding: 1rem;
		height: 100%;

        h1 {
            margin: 0;
        }
	}
</style>;
