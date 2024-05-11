<script lang="ts">
    import { onMount } from 'svelte';

    import { type Segment, splitSentenceIntoSegments } from './split-sentence';

    import * as styles from './style.css';

    export let source: string;

    let segments: Segment[] = [];

    onMount(() => {
        segments = splitSentenceIntoSegments(source.trim());
    });
</script>

<div lang="zh-CN" class={styles.container}>
    <div aria-hidden="true" class={styles.pinyinLine}>
        <!-- hidden blocks -->
    </div>
    <div class={styles.zhCharLine}>
        {#each segments as segment}
            {#if segment.type === 'zh'}
                <!-- zh blocks -->
                {segment.zhChars}
            {:else}
                <span class={styles.visibleNonZhBlock}>{segment.nonZhChars}</span>
            {/if}
        {/each}
    </div>
</div>
