<script lang="ts">
import { useSpecStore } from '../state/spec.ts';
import { useRoute } from 'vue-router';
import flatMap from 'lodash/flatMap';

export default {
	data() {
		const spec = useSpecStore();
		const route = spec.routes.find(item => item.path === useRoute().path);
		return {
			title: route?.label ?? '',
			route: useRoute().path
		};
	},
	computed: {
		endpoints() {
			const spec = useSpecStore();
			const result = flatMap(spec.endpointsForTag(this.title).map(item => {
				return Object.entries(item).map(([operation, details]) => {
					return {
						operation: operation,
						...details
					};
				});
			}));

			console.log(result);
			return result;
		}
	}
};
</script>

<template>
    <section class="tag-content">
        <header class="tag-content__header">
            <h1>{{ title }}</h1>
			<div v-for="item in endpoints">
				<span>{{ item.operation }}</span>
			</div>
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
