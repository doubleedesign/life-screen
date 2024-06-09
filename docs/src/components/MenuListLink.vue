<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';

export default defineComponent({
	name: 'MenuListLink',
	props: {
		item: {
			type: Object as PropType<RouteRecordNormalized | RouteRecordRaw>,
			default: {}
		},
		routePrefix: {
			type: String,
			default: ''
		},
		isExpanded: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			content: 'MenuListLink component',
		};
	},
	computed: {},
	methods: {}
});
</script>

<template>
	<router-link :to="`${routePrefix && routePrefix + '/'}${item.path}`"
		:class="['menu-list__item__link', {'menu-list__item__link--expanded': isExpanded}]"
		active-class="menu-list__item__link--current-section"
		exact-active-class="menu-list__item__link--active"
		v-if="item.name"
	>
		<span>{{ item.name }}</span>
		<span class="pi pi-angle-right expand-icon" v-if="item.children && item.children.length > 0"></span>
	</router-link>
</template>

<style scoped lang="scss">
	@import 'tokens';
	@import 'utils';

	.menu-list__item__link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		flex-basis: 100%;
		padding: 0.5rem 0.5rem 0.5rem 0.75rem;
		color: inherit;
		text-decoration: none;
		line-height: 1.4;
		transition: all 0.2s ease;

		.expand-icon {
			transition: transform 0.3s ease;
		}

		&--expanded {
			.expand-icon {
				transform: rotate(90deg);
			}
		}

		&--active {
			span:not(.expand-icon) {
				text-decoration: underline;
			}
		}
	}
</style>
