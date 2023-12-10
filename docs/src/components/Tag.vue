<script lang="ts">
export default {
	props: {
		heading: String,
	}
};
</script>

<template>
    <section class="tag-content">
        <header class="tag-content__header">
            <h1>{{heading}}</h1>
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
