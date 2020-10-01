<script>
    import { createEventDispatcher } from "svelte";
    import Filter from "./filter.svelte";
    import Menu from "./menu.svelte";

    export let caption;
    export let filterCols;
    export let filterParam;

    const dispatch = createEventDispatcher();
</script>

<style lang="scss">
    @import "../../theme/color";

    .title {
        position: fixed;
        width: 100%;
        display: flex;
        align-items: stretch;
        font-size: 1.2em;
        background-color: rgba($primary, 0.98);
        color: $primary-text;
        height: 42px;
        & .caption {
            display: flex;
            align-items: center;
            margin-right: 16px;
        }
    }
</style>

{#if caption != null}
    <div class="title">
        <div class="caption padding">{caption}</div>
        {#if filterCols}
            <Filter
                filters={filterParam}
                on:change={(ev) => dispatch('filterChange', ev.detail)}
                columns={filterCols} />
        {/if}
    </div>
{/if}
