<script lang="ts">
import { getPinyin } from './get-romanization';
import RomanizationCodeBlock from './romanization-code-block.svelte';

const { source, alwaysDisplayPinyin } = $props();
</script>

<RomanizationCodeBlock
    {source}
    {alwaysDisplayPinyin}
    lang="zh-CN"
    getRomanization={getPinyin}
/> 