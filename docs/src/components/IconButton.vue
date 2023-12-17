<script lang="ts">
import { defineComponent } from 'vue';
import Tooltip from './Tooltip.vue';

export default defineComponent({
	components: { Tooltip },
	props: {
		action: Function,
		label: String
	},
	data() {
		return {
			tooltipActive: false
		};
	},
	methods: {
		showTooltip() {
			this.tooltipActive = true;
		},
		hideTooltip() {
			setTimeout(() => {
				this.tooltipActive = false;
			}, 400);
		}
	}
});
</script>

<template>
	<Tooltip :label="label" :active="tooltipActive">
		<button :aria-label="label" class="icon-button" tabindex="0"
				v-on:click="action ? action() : null"
				v-on:mouseenter="showTooltip()"
				v-on:mouseleave="hideTooltip()"
				v-on:focus="showTooltip()"
				v-on:blur="hideTooltip()"
		>
			<slot></slot>
		</button>
	</Tooltip>
</template>

<style scoped lang="scss">
	.icon-button {
		cursor: pointer;
		transition: all 0.3s ease;
		display: inline-block;
		appearance: none;
		border: 0;
		background: white;
		box-shadow: 0 0 0.25rem 0 rgba(0,0,0,0.25);
		font-size: 1rem;
		height: 2rem;
		width: 2rem;
		border-radius: 2rem;
		padding: 0;

		&:hover, &:focus-visible, &:active {
			box-shadow: 0 0 0.25rem 0 rgba(0,0,0,0.5);
		}
	}
</style>
