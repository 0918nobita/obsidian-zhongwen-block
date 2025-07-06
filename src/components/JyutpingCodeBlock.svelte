<script lang="ts">
import { getJyutping } from '../get-romanization';
import { type Segment, splitIntoSegmentsPerLine } from '../split-sentence';
import NonZhText from './NonZhText.svelte';
import TextLine from './TextLine.svelte';
import ZhText from './ZhText.svelte';

interface Props {
    source: string;
    alwaysDisplayPinyin: boolean;
}

const { source, alwaysDisplayPinyin }: Props = $props();

let segmentsPerLine: Segment[][] = $state([]);

$effect(() => {
    segmentsPerLine = splitIntoSegmentsPerLine(source.trim());
});
</script>

<div lang="zh-HK" data-always-display-pinyin={alwaysDisplayPinyin}>
    {#each segmentsPerLine as segments}
        <TextLine>
            {#each segments as segment}
                {#if segment.type === 'zh'}
                    {#await getJyutping(segment.zhChars) then zhChars}
                        <ZhText {zhChars} />
                    {/await}
                {:else}
                    <NonZhText text={segment.nonZhChars} />
                {/if}
            {/each}
        </TextLine>
    {/each}
</div>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        font-family: 'Noto Sans SC', sans-serif;
    }

    :global(.cm-preview-code-block) div {
        margin-top: 0.5rem;
    }

    div[data-always-display-pinyin='false'] :global(rt) {
        opacity: 0;
    }

    div[data-always-display-pinyin='false']:hover :global(rt) {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
</style>
