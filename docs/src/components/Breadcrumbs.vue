<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Breadcrumbs',
	data() {
		return {
			items: this.$route.matched.filter((route) => route.path !== this.$route.path),
			title: this.$route.name !== '' ? this.$route.name : (this.$route.matched[1]?.name !== '' ? this.$route.matched[1]?.name : this.$route.matched[0]?.name),
		};
	}
});
</script>

<template>
	<nav class="breadcrumbs">
		<ul class="breadcrumbs-list">
			<li class="breadcrumbs-list__item">
				<router-link to="/" class="breadcrumbs-list__item__link" aria-label="Home">
					<span class="pi pi-home"></span>
					<span class="pi pi-angle-right"></span>
				</router-link>
			</li>
			<li class="breadcrumbs-list__item" v-for="item in items" :key="item.path">
				<router-link :to="item.path" class="breadcrumbs-list__item__link">{{ item.name }}</router-link>
				<span class="pi pi-angle-right"></span>
			</li>
			<li class="breadcrumbs-list__item">
				<span class="breadcrumbs-list__item__link">{{ title }}</span>
			</li>
		</ul>
	</nav>
</template>

<style scoped lang="scss">
.breadcrumbs-list {
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;

	&__item {
		display: inline-flex;

		&__link {
			display: block;
		}
	}
}
</style>
