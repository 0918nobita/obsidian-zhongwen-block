<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
    children: Snippet;
}

const { children }: Props = $props();
</script>

<div>
    {@render children()}
</div>

<style scoped>
    div {
        display: inline-flex;
        align-items: flex-end;
        flex-wrap: wrap;
    }
</style>
