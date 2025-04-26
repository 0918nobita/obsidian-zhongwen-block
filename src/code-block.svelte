<script lang="ts">
import { getPinyin } from './get-pinyin';
import { type Segment, splitSentenceIntoSegments } from './split-sentence';

const { source, alwaysDisplayPinyin } = $props();

let segments: Segment[] = $state([]);

$effect(() => {
    segments = splitSentenceIntoSegments(source.trim());
});
</script>

<div
    lang="zh-CN"
    class="container"
    data-always-display-pinyin={alwaysDisplayPinyin}
>
    {#each segments as segment}
        {#if segment.type === 'zh'}
            {#await getPinyin(segment.zhChars) then pinyinData}
                {#each pinyinData as { pinyin, origin: zhChar }}<ruby
                        >{zhChar}<rt>{pinyin}</rt></ruby
                    >{/each}{/await}
        {:else}
            {segment.nonZhChars}
        {/if}
    {/each}
</div>

<style>
    .container {
        font-family: 'Noto Sans SC', sans-serif;
        line-height: 2.8rem;
    }

    :global(.cm-preview-code-block) .container {
        margin-top: 0.5rem;
    }

    ruby {
        padding-left: 2px;
        padding-right: 2px;
    }

    rt {
        font-family: sans-serif;
        font-size: 0.8rem;
        transform: translateY(-0.4rem);
        user-select: none;
    }

    .container[data-always-display-pinyin='false'] rt {
        opacity: 0;
    }

    .container[data-always-display-pinyin='false']:hover rt {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
</style>
