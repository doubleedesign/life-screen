<script lang="ts">
import { useSpecStore } from '../state/store';
import { useRoute } from 'vue-router';

export default {
	data() {
		const spec = useSpecStore();
		return {
			title: spec.routes.find(item => item.path === useRoute().path)?.label,
			route: useRoute().path
		};
	}
};
</script>

<template>
    <section class="tag-content">
        <header class="tag-content__header">
            <h1>{{ title }}</h1>
        </header>
    </section>
</template>

<style scoped lang="scss">
    .tag-content {
        &__header {
            h1 {
                font-size: 1.5rem;
            }
        }
    }
</style>
