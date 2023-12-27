<script lang="ts">
import { defineComponent } from 'vue';
import SectionMenu from './SectionMenu.vue';

export default defineComponent({
	components: {
		SectionMenu
	},
	data() {
		return {
			title: this.$route.name !== '' ? this.$route.name : (this.$route.matched[1]?.name !== '' ? this.$route.matched[1]?.name : this.$route.matched[0]?.name),
			path: this.$route.path
		};
	}
});
</script>

<template>
	<main class="page">
		<h1>{{ title }}</h1>
		<!-- Nested route outlets -->
		<RouterView name="content" :key="path"></RouterView>
	</main>
	<SectionMenu/>
</template>

<style scoped lang="scss">
	.page {

	}
</style>
