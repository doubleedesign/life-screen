<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteRecordNormalized, RouteRecordRaw, RouteRecordName } from 'vue-router';
import MenuListLink from './MenuListLink.vue';
import MenuListItem from './MenuListItem.vue';

export default defineComponent({
	name: 'MenuListInteractive',
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
			openItemIds: [] as RouteRecordName[],
			resizeObserver: null as ResizeObserver | null,
			openHeight: 0
		};
	},
	methods: {
		toggleOpenItem(itemName: RouteRecordName) {
			const children = this.items.find(item => item.name === itemName)?.children;
			const openChildren = children?.map(child => child.name).filter(name => this.openItemIds.includes(name as RouteRecordName));

			// Close both item and open children
			const filterCurrent = this.openItemIds.filter(name => {
				return name !== itemName && !openChildren?.includes(name);
			});

			this.openItemIds = this.openItemIds.includes(itemName) ? filterCurrent : [...filterCurrent, itemName];
		},
		beforeEnter(el: Element) {
			(el as HTMLElement).style.height = '0';
		},
		enter(el: Element, done: EventListener | EventListenerObject) {
			(el as HTMLElement).style.height = el.scrollHeight + 'px';
			el.addEventListener('transitionend', done);
		},
		beforeLeave(el: Element) {
			(el as HTMLElement).style.height = el.scrollHeight + 'px';
		},
		leave(el: Element, done: EventListener | EventListenerObject) {
			(el as HTMLElement).style.height = '0';
			el.addEventListener('transitionend', done);
		}
	},
	watch: {
		$route(to) {
			this.openItemIds = to.matched.map((route: RouteRecordRaw) => route.name);
		}
	},
	mounted() {
		this.resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				const { height } = entry.contentRect;
				// TODO: Finish fixing the height of a submenu when a nested one is opened/closed
			}
		});

		this.resizeObserver.observe(this.$refs.resizableElement as Element);
	},
	unmounted() {
		this.resizeObserver?.disconnect();
	}
});
</script>

<template>
	<ul v-if="depth >= count" :class="['menu-list']" ref="resizableElement">
		<MenuListItem v-for="item in items" :key="item.name"
			:isExpanded="openItemIds.includes(<string | symbol>item.name)"
			:level="count"
		>
			<template #menu-list-item-link>
				<MenuListLink :item="item"
					:route-prefix="routePrefix"
					:isExpanded="openItemIds.includes(<string | symbol>item.name)"
					@click.prevent="toggleOpenItem(<string | symbol>item.name)"/>
			</template>
			<template #menu-list-item-submenu>
				<transition name="slide" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
					<MenuListInteractive v-if="item.children && item.children.length > 0"
						v-show="openItemIds.includes(<string | symbol>item.name)"
						:items="item.children"
						:depth="depth"
						:count="count + 1"
						:route-prefix="`${routePrefix && routePrefix + '/'}${item.path}`"
						:class="['menu-list__submenu', {'menu-list__submenu--open': openItemIds.includes(<string | symbol>item.name)}]"
					/>
				</transition>
			</template>
		</MenuListItem>
	</ul>
</template>

<style scoped lang="scss">
@import 'tokens';

.menu-list {
	margin: 0 0 1rem 0;
	padding: 0;
	list-style: none;
	width: 100%;
	border-radius: 0.25rem;
	overflow: hidden;

	&__item {
		overflow: hidden;

		&--expanded,
		&:first-of-type {
			border-top-left-radius: 0.25rem;
			border-top-right-radius: 0.25rem;
		}

		&:last-of-type {
			border-bottom-left-radius: 0.25rem;
			border-bottom-right-radius: 0.25rem;
		}

        &:not(:has(&__link)) {
            display: none;
        }

		&:has(&__link--current-section) {
			background: rgba(black, 0.10);
		}

		&:has(&__link--active) {
			background: rgba(black, 0.10);
		}

		&--level-1:has(> &__link--active) {
			> a {
				background: rgba(black, 0.2);
			}
		}

		&--level-1:not(&--expanded) {
			border-bottom-left-radius: 0.25rem;
			border-bottom-right-radius: 0.25rem;
		}
	}

	&__submenu {
		display: block !important;
		overflow: hidden;
		margin-bottom: 0;
		height: 0;
		transition: height 0.3s ease-in-out, opacity 0.3s ease;
		opacity: 0;

		&--open {
			background: rgba(black, 0.10);
			opacity: 1;
			transition: height 0.3s ease-in-out, opacity 0.3s 0.1s ease;
		}
	}
}
</style>
