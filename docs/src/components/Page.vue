<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	data() {
		console.log(this.$route);
		return {
			title: this.$route.name,
			path: this.$route.path
		};
	}
});
</script>;

<template>
	<div class="page">
		<h1>{{ title }}</h1>
		<!-- Nested route outlets -->
		<RouterView :key="path"></RouterView>
		<RouterView name="content" :key="path"></RouterView>
	</div>
</template>;

<style scoped lang="scss">
	.page {

	}
</style>;
