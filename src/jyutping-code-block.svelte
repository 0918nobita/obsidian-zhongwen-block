<script lang="ts">
import { getJyutping } from './get-romanization';
import RomanizationCodeBlock from './romanization-code-block.svelte';

const { source, alwaysDisplayPinyin } = $props();
</script>

<RomanizationCodeBlock
    {source}
    {alwaysDisplayPinyin}
    lang="zh-HK"
    getRomanization={getJyutping}
/> 