<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { pageState } from '../state/page';
import IconButton from './IconButton.vue';

export default defineComponent({
	components: { IconButton },
	props: {
		position: String as PropType<'left' | 'right'>,
		as: String as PropType<keyof HTMLElementTagNameMap>
	},
	data() {
		return {
			element: this.as ?? 'div',
		};
	},
	computed: {
		isOpen() {
			return  pageState.drawerOpen;
		}
	},
	methods: {
		toggle() {
			pageState.drawerOpen = !pageState.drawerOpen;
		}
	}
});
</script>;

<template>
	<component :is="element" :class="['drawer',`drawer--${position}`, isOpen && 'drawer--open']">
		<div class="content-wrapper">
			<slot></slot>
		</div>
		<div :class="['toggle-wrapper']">
			<IconButton :action="toggle" :label="isOpen ? 'Close panel' : 'Open panel'">
				<span :class="['pi', 'pi-angle-left', 'toggle-icon', isOpen ? 'toggle-icon--close' : 'toggle-icon--open']"></span>
			</IconButton>
		</div>
	</component>
</template>


<style scoped lang="scss">
	@import 'tokens';

	.drawer {
		height: 100vh;
		position: fixed;
		z-index: 100;
		top: 0;
		transition: all 0.3s ease;
		width: map-get($drawer, 'open');
		transform: translateX(-(calc(map-get($drawer, 'open') - map-get($drawer, 'closed'))));
		box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.3);

		@container (min-width: 1100px) {
			width: map-get($drawer, 'openLg');
			transform: translateX(-(calc(map-get($drawer, 'openLg') - map-get($drawer, 'closed'))));
		}

		.content-wrapper {
			width: 100%;
			height: 100%;
		}

		&--open {
			transform: translateX(0);
			box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.5);
		}

		&--left {
		}

		&--right {
			order: 10;
		}
	}

	.toggle-wrapper {
		width: 2rem;
		height: 2rem;
		position: absolute;
		bottom: 2rem;
		right: -1rem;

		.toggle-icon {
			transition: all 0.3s ease;
			transform-origin: center;
			display: block;
			line-height: 1;

			&--close {
				transform: rotate(-180deg);
			}
		}
	}
</style>;
