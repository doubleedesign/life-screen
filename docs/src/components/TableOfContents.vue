<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'TableOfContents',
	props: {
		pageHeadings: Array as PropType<{ label: string, id: string }[]>
	},
	data() {
		return {
			title: this.$route.name !== '' ? this.$route.name : (this.$route.matched[1]?.name !== '' ? this.$route.matched[1]?.name : this.$route.matched[0]?.name),
			path: this.$route.path
		};
	},
	computed: {
		children: function() {
			return this.getChildren();
		}
	},
	methods: {
		getChildren() {
			const children = this.$route.matched[0]?.children;
			if (children) {
				return children.map((child) => {
					return {
						label: child.name,
						path: child.path
					};
				});
			}
		}
	}
});
</script>

<template>
	<section class="table-of-contents">
		<h2>Table of Contents</h2>
		<ul>
			<li v-for="heading in pageHeadings" :key="heading.id">
				<router-link :to="`#${heading.id}`">{{ heading.label }}</router-link>
			</li>
			<template v-for="child in children" :key="child.path">
				<li v-if="child.path !== ''" :key="child.path">
					<router-link :to="`${path}/${child.path}`">{{ child.label }}</router-link>
				</li>
			</template>
		</ul>
	</section>
</template>

<style scoped lang="scss">
	.table-of-contents {

	}
</style>
