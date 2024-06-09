<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MenuListItem',
	props: {
		isExpanded: {
			type: Boolean,
			default: false
		},
		level: {
			type: Number,
			default: 0
		}
	},
});
</script>

<template>
	<li :class="['menu-list__item',
			'menu-list__item--level-' + level,
			{'menu-list__item--expanded': isExpanded}
	]">
		<slot name="menu-list-item-link"></slot>
		<slot name="menu-list-item-submenu"></slot>
	</li>
</template>

<style scoped lang="scss">
	@import 'tokens';
	@import 'utils';

	.menu-list__item {
		display: flex;
		flex-basis: 100%;
		flex-wrap: wrap;
		position: relative;
	}
</style>
