<script lang="ts">
interface Props {
    text: string;
}

const { text }: Props = $props();
</script>

<span>{text}</span>

<style scoped>
    span {
        display: inline-block;
        padding-left: 1px;
        padding-right: 1px;
    }
</style>
