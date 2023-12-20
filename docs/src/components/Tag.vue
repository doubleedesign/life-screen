<script lang="ts">
import { useSpecStore } from '../state/spec.ts';

export default {
	data() {
	},
	computed: {
		endpoints() {
			const spec = useSpecStore();
			return spec.endpointsForTag(this.$route.name as string);
		}
	}
};
</script>

<template>
    <section class="tag-content">
		<div class="tag-content__items">
			<div class="item" v-for="item in endpoints" :key="item.operation">
				<div class="item__endpoint">
					<div :class="['item__endpoint__operation', `item__endpoint__operation--${item.operation}`]">
						{{ item.operation }}
					</div>
					<div class="item__endpoint__path">
						{{ item.path }}
					</div>
					<div class="item__endpoint__summary">
						<p>{{ item.summary }}</p>
					</div>
				</div>
				<div v-if="item.parameters" class="item__parameters">
					<table>
						<caption>Parameters</caption>
						<tr v-for="parameter in item.parameters" :key="parameter.name">
							<th scope="row">{{ parameter.name }}</th>
							<td>{{ parameter.description }}</td>
						</tr>
					</table>
				</div>
				<div class="item__responses">
					<table>
						<caption>Responses</caption>
						<tr v-for="(response, code) in item.responses" :key="code">
							<th scope="row">{{ code }}</th>
							<td>{{ response.description }}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
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
