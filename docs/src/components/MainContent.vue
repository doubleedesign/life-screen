<script lang="ts">
import { defineComponent } from 'vue';
import { pageState } from '../state/page';
export default defineComponent({
	name: 'MainContent',
	computed: {
		fullwidth() {
			return !pageState.drawerOpen;
		}
	}
});
</script>

<template>
	<div :class="['page-content', fullwidth && 'page-content--fullwidth']">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
	@import 'tokens';

	.page-content {
		scroll-behavior: smooth;
		transition: all 0.3s ease;
		flex-grow: 1;
		padding: 1rem 1rem 1rem calc(map-get($drawer, 'open') + 1rem);
		overflow-y: scroll;

		@container wrapper (min-width: 1100px) {
			padding-left: calc(map-get($drawer, 'openLg') + 2rem);
			padding-right: 2rem;
		}

		&--fullwidth {
			padding: 1rem 1rem 1rem calc(map-get($drawer, 'closed') + 1rem);

			@container wrapper (min-width: 1100px) {
				padding-left: calc(map-get($drawer, 'closed') + 2rem);
				padding-right: 2rem;
			}
		}
	}
</style>
