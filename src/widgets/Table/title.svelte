<script>
    import Menu from "./menu.svelte";

    export let caption;
    export let filteredColumns = [];
</script>

<style lang="scss">
    @import "../../theme/color";

    .title {
        display: flex;
        align-items: stretch;
        font-size: 1.2em;
        background-color: $primary;
        color: $primary-text;
        height: 42px;
        & .caption {
            padding: 8px;
            display: flex;
            align-items: center;
            margin-right: 16px;
        }
    }
</style>

{#if caption != null}
    <div class="title">
        <div class="caption">{caption}</div>
        <Menu icon="search">
            {#each filteredColumns as col}
                <div>{col}</div>
            {/each}
        </Menu>
    </div>
{/if}
