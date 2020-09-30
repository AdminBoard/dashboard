<script>
    export let params;
</script>

<style lang="scss">
    @import "../theme/color";

    .topbar {
        font-size: 1.2em;
        background-color: $primary;
        color: $primary-text;
    }
</style>

<div class="topbar padding">
    {#if params != null}{params.caption}{/if}
</div>
