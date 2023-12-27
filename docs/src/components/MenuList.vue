<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';

export default defineComponent({
	name: 'MenuList',
	props: {
		items: {
			type: Array as PropType<RouteRecordNormalized[] | RouteRecordRaw[]>,
			default: []
		},
		depth: {
			type: Number,
			default: 5
		},
		routePrefix: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			count: 0
		};
	},
	methods: {
		incrementCount() {
			this.count++;
		}
	},
	mounted() {
		this.incrementCount();
	},
});
</script>

<template>
	<ul v-if="depth >= count" class="menu-list">
		<li v-for="item in items" class="menu-list__item">
			<router-link :to="`${routePrefix && routePrefix + '/'}${item.path}`">{{item.name}}</router-link>
			<template v-if="item.children && item.children.length > 0">
				<MenuList :items="item.children"
						:depth="depth - count"
						:route-prefix="`${routePrefix && routePrefix + '/'}${item.path}`"
						class="menu-list__item__link"
				/>
			</template>
		</li>
	</ul>
</template>

<style scoped lang="scss">
	.menu-list {
		margin: 0 0 1rem 0;
		padding: 0;
		list-style: none;
		width: 100%;

		&__item {
			display: flex;
			flex-basis: 100%;
			flex-wrap: wrap;

			&__link {
				display: block;
			}
		}
	}
</style>
