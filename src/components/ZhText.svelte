<script lang="ts">
import type { RomanizationData } from '../get-romanization';
import RubyText from './RubyText.svelte';

interface Props {
    zhChars: RomanizationData[];
}

const { zhChars }: Props = $props();
</script>

{#each zhChars as { romanization, origin }}
    <RubyText {origin} {romanization} />
{/each}
