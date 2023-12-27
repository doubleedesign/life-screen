<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TemplateName',
	props: {},
	data() {
		return {
			content: 'TemplateName component',
		};
	},
	computed: {},
	methods: {}
});
</script>

<template>
	<div class="template-name">
		{{ content }}
	</div>
</template>

<style scoped lang="scss">
.template-name {

}
</style>
