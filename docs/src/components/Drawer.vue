<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		position: String as PropType<'left' | 'right'>,
		open: Boolean,
		as: String as PropType<keyof HTMLElementTagNameMap>
	},
	data() {
		return {
			position: this.position ?? 'left',
			open: this.open ?? false,
			as: this.as ?? 'div',
		};
	},
	computed: {
	},
	methods: {}
});
</script>;

<template>
	<component :is="as" :class="['drawer',`drawer--${position}`, open && 'drawer--open']">
		<slot></slot>
	</component>
</template>


<style scoped lang="scss">
	.drawer {
		transition: width 0.3s ease-in-out;
		height: 100vh;
		position: sticky;
		top: 0;

		&--left {
		}

		&--right {
			order: 10;
		}

		&--open {
			width: 12rem;
			flex-basis: 12rem;
			min-width: 12rem;

			@container (min-width: 1000px) {
				width: 18rem;
				flex-basis: 18rem;
				min-width: 18rem;
			}
		}
	}
</style>;
