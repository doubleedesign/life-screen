<script lang="ts">
import { mapState } from 'pinia';
import { useSpecStore } from '../state/store';
export default {
	name: 'Tag',
	data() {
		return {
		};
	},
	computed: {
		...mapState(useSpecStore, {
			//name: (store) => store.routes.find(route => route.path === this.$route.path)?.label
		}),
	},
};
</script>

<template>
    <section class="tag-content">
        <header class="tag-content__header">
            <h1>{{ name }}</h1>
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
