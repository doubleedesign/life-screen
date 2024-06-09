<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteRecordNormalized, RouteRecordRaw, RouteRecordName } from 'vue-router';
import MenuListLink from './MenuListLink.vue';
import MenuListItem from './MenuListItem.vue';

export default defineComponent({
	name: 'MenuList',
	components: { MenuListItem, MenuListLink },
	props: {
		items: {
			type: Array as PropType<RouteRecordNormalized[] | RouteRecordRaw[]>,
			default: []
		},
		depth: {
			type: Number,
			default: 3
		},
		count: {
			type: Number,
			default: 1
		},
		routePrefix: {
			type: String,
			default: ''
		},
	},
	data() {
		return {
			openItemId: '' as RouteRecordName | null
		};
	},
});
</script>

<template>
	<ul v-if="depth >= count" class="menu-list">
		<MenuListItem v-for="item in items" :key="item.name" :isExpanded="true" :level="count">
			<template #menu-list-item-link>
				<MenuListLink :item="item" :route-prefix="routePrefix" :isExpanded="true"/>
			</template>
			<template #menu-list-item-submenu>
				<MenuList v-if="item.children && item.children.length > 0"
					:items="item.children"
					:depth="depth"
					:count="count + 1"
					:route-prefix="`${routePrefix && routePrefix + '/'}${item.path}`"
					:class="['menu-list__submenu']"
				/>
			</template>
		</MenuListItem>
	</ul>
</template>

<style scoped lang="scss">
	@import 'tokens';
	@import 'utils';

	.menu-list {
		width: 100%;
		list-style: none;
		padding: 0;

		&__submenu {
			.menu-list__item {
				border-radius: 0;
			}
		}
	}
</style>
