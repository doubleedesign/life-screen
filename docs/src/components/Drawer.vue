<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import IconButton from './IconButton.vue';

export default defineComponent({
	components: { IconButton, FontAwesomeIcon },
	props: {
		position: String as PropType<'left' | 'right'>,
		open: Boolean,
		as: String as PropType<keyof HTMLElementTagNameMap>
	},
	data() {
		return {
			position: this.position ?? 'left',
			isOpen: this.open ?? false,
			as: this.as ?? 'div',
		};
	},
	computed: {
	},
	methods: {
		toggle() {
			this.isOpen = !this.isOpen;
		}
	}
});
</script>;

<template>
	<component :is="as" :class="['drawer',`drawer--${position}`, isOpen && 'drawer--open']">
		<div class="content-wrapper">
			<slot></slot>
		</div>
		<div :class="['toggle-wrapper']">
			<IconButton :action="toggle" :label="isOpen ? 'Close panel' : 'Open panel'">
				<font-awesome-icon :icon="['fas', 'arrow-right']" :class="['toggle-icon', isOpen ? 'toggle-icon--close' : 'toggle-icon--open']" />
			</IconButton>
		</div>
	</component>
</template>


<style scoped lang="scss">
	.drawer {
		height: 100vh;
		position: sticky;
		z-index: 100;
		top: 0;
		transition: all 0.3s ease;
		width: 12rem;
		transform: translateX(-10rem); // TODO: Put these values somewhere common
		box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.3);

		@container (min-width: 1100px) {
			width: 18rem;
			transform: translateX(-16rem);
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

			&--close {
				transform: rotate(-180deg);
			}
		}
	}
</style>;
