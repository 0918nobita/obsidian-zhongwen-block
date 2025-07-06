<script lang="ts">
interface Props {
    origin: string;
    romanization: string;
}

const { origin, romanization }: Props = $props();
</script>

<ruby>{origin}<rt>{romanization}</rt></ruby>

<style scoped>
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
</style>
