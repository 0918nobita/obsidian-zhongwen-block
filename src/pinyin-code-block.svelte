<script lang="ts">
import { getPinyin, type RomanizationData } from './get-romanization';
import { type Segment, splitIntoSegmentsPerLine } from './split-sentence';

const { source, alwaysDisplayPinyin } = $props();

let segmentsPerLine: Segment[][] = $state([]);

$effect(() => {
    segmentsPerLine = splitIntoSegmentsPerLine(source.trim());
});
</script>

<div
    lang="zh-CN"
    class="container"
    data-always-display-pinyin={alwaysDisplayPinyin}
>
    {#each segmentsPerLine as segments}
        <div class="line">
            {#each segments as segment}
                {#if segment.type === 'zh'}
                    {#await getPinyin(segment.zhChars) then RomanizationData}
                        {#each romanizationData as { romanization, origin }}
                            <ruby>{origin}<rt>{romanization}</rt></ruby>
                        {/each}
                    {/await}
                {:else}
                    <span class="non-zh-text">{segment.nonZhChars}</span>
                {/if}
            {/each}
        </div>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        font-family: 'Noto Sans SC', sans-serif;
    }

    :global(.cm-preview-code-block) .container {
        margin-top: 0.5rem;
    }

    .line {
        display: inline-flex;
        align-items: flex-end;
        flex-wrap: wrap;
    }

    ruby {
        display: inline-flex;
        flex-direction: column-reverse;
        padding-left: 1px;
        padding-right: 1px;
        align-items: center;
    }

    rt {
        font-family: sans-serif;
        font-size: 0.8rem;
        user-select: none;
    }

    .container[data-always-display-pinyin='false'] rt {
        opacity: 0;
    }

    .container[data-always-display-pinyin='false']:hover rt {
        opacity: 1;
        transition: opacity 0.3s ease;
    }

    .non-zh-text {
        display: inline-block;
        padding-left: 1px;
        padding-right: 1px;
    }
</style>
