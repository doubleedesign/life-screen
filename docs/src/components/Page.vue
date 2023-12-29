<script lang="ts">
import { defineComponent } from 'vue';
import SectionMenu from './SectionMenu.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import TableOfContents from './TableOfContents.vue';

export default defineComponent({
	components: {
		TableOfContents,
		Breadcrumbs,
		SectionMenu
	},
	data() {
		return {
			title: this.$route.name !== '' ? this.$route.name : (this.$route.matched[1]?.name !== '' ? this.$route.matched[1]?.name : this.$route.matched[0]?.name),
			path: this.$route.path,
			headings: [],
		};
	},
	computed: {
		isTopLevel: function() {
			return this.$route.path.split('/').length === 2;
		},
	},
	methods: {
		onMounted() {
			// @ts-ignore
			this.headings = this.getHeadings();
		},
		getHeadings() {
			const headings = document.querySelectorAll('.markdown-body h2');
			return Array.from(headings).map((heading) => {
				return {
					label: heading.textContent,
					id: heading.id
				};
			});
		},
	},
});
</script>

<template>
	<main class="page">
		<Breadcrumbs />
		<h1>{{ title }}</h1>
		<template v-if="isTopLevel">
			<TableOfContents :pageHeadings="headings"/>
		</template>
		<section class="page-content">
			<RouterView name="content" @vue:mounted="onMounted"/>
		</section>
	</main>
	<aside class="sidebar">
		<SectionMenu/>
	</aside>
</template>

<style scoped lang="scss">
</style>
