<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Tooltip',
	props: {
		label: String,
		active: Boolean
	},
	data() {
		return {
			active: this.active ?? false, // passed in and controlled by the parent component
			visible: false, // whether the tooltip should be in the DOM
			status: 'inactive', // append to CSS class to use for transition
		};
	},
	watch: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		active(isActive, wasActive) {
			this.update(isActive);
		}
	},
	methods: {
		update(active: boolean) {
			active ? this.status = 'active' : this.status = 'inactive';

			// If making active, add to the DOM immediately but pause for animation
			if(active) {
				this.visible = true;
				this.status = 'inactive';
				setTimeout(() => {
					this.status = 'active';
				}, 200);
			}
			else {
				// If making inactive, allow time for CSS transition before removing from the DOM
				this.status = 'inactive';
				setTimeout(() => {
					this.visible = false;
				}, 400);
			}
		}
	}
});
</script>

<template>
	<div class="tooltipped">
		<slot></slot>
		<div v-if="visible" role="tooltip" :class="['tooltip',`tooltip--${status}`]" popover>
			<span class="tooltip__content">{{label}}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.tooltipped {
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
}
.tooltip {
	position: absolute;
	top: 0;
	left: 100%;
	min-width: 10rem;
	padding-left: 0.5rem;
	height: 100%;
	display: flex;
	align-items: center;
	transition: all 0.2s ease;
	transform: translateX(-0.5rem);

	&:before {
		content: '';
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0.4rem 0.4rem 0.4rem 0;
		border-color: transparent #222 transparent transparent;
		transform: rotate(0deg);
	}

	&--active {
		opacity: 1;
		transform: translateX(0);
	}

	&--inactive {
		opacity: 0;
	}

	&__content {
		background: #222;
		color: white;
		padding: 0.25rem 0.75rem;
		font-size: 0.8rem;
		line-height: 1.5;
		text-align: center;
		border-radius: 0.125rem;
	}
}
</style>
