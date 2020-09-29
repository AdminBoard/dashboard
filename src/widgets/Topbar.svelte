<script>
    export let params;
</script>

<style lang="scss">
    @import "../theme/color";

    .topbar {
        padding: 8px;
        font-size: 1.2em;
        background-color: $primary;
        color: $primary-text;
    }
</style>

<div class="topbar">
    {#if params != null}{params.caption}{/if}
</div>
