<script>
    export let caption;
</script>

<style lang="scss">
    @import "../../theme/color";

    .title {
        padding: 8px;
        font-size: 1.2em;
        background-color: $primary;
        color: $primary-text;
    }
</style>

{#if caption != null}
    <div class="title">{caption}</div>
{/if}
