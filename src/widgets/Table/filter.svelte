<script>
    import { Icon } from "@smui/common";

    import { createEventDispatcher } from "svelte";
    import Menu from "./menu.svelte";

    const dispatch = createEventDispatcher();

    export let filters;
    export let columns;
    $: colsChange(columns);

    let selColumn;

    let key;
    let value;
    let selectionValue;

    let menuSearch;

    function colsChange() {
        if (selColumn == null && columns != null && columns.length > 0)
            selColumn = columns[0];

        value = "";
        if (selColumn != null) {
            key = selColumn.id;
            if (selColumn.filter == "map") value = selectionValue;
        }
    }

    function remove(key) {
        delete filters[key];
        filters = filters; //refresh view
        dispatch("change", filters);
    }

    function click() {
        let label = selColumn.label + ": ";
        if (selColumn.filter == "map") {
            value = selectionValue;
            label += selColumn.map[value];
        } else label += value;

        filters[key] = { label: label, value: value, filter: selColumn.filter };
        value = "";
        dispatch("change", filters);
        menuSearch.close();
    }
</script>

<style lang="scss">
    @import "../../theme/color";

    .filter {
        & select {
            outline: none;
        }

        & > * {
            margin: 4px;
        }
    }
    .chip {
        background-color: $primary;
        margin: 4px;
        border-radius: 16px;
        font-size: 0.8em;
        display: flex;
        padding-left: 6px;
        & .label {
            margin: 8px;
        }
        &:not(:last-child) {
            margin-right: 4px;
        }
        & :global(i) {
            padding: 4px;
            margin-right: 4px;
            color: $primary-dark;
            border-radius: 16px;
            align-self: center;
            cursor: pointer;
            font-size: 1em;
            border: 1px solid $primary;
            transition: color 0.1s ease-out;
            transition-duration: 100ms;
            &:hover {
                color: $primary-lite;
                border: 1px solid $primary-lite;
            }
        }
    }
</style>

{#if columns != null}
    <div class="row">
        <Menu bind:this={menuSearch} icon="search" tooltip="Filter">
            <div class="filter row center">
                <select bind:value={selColumn}>
                    {#each columns as col}
                        <option value={col}>
                            <div>{col.label}</div>
                        </option>
                    {/each}
                </select>
                {#if selColumn != null}
                    {#if selColumn.filter == 'number' || selColumn.filter == 'fulltext'}
                        <input bind:value type="text" />
                    {:else if selColumn.filter == 'map'}
                        <select bind:value={selectionValue}>
                            {#each Object.keys(selColumn.map) as key}
                                <option value={key}>
                                    {selColumn.map[key]}
                                </option>
                            {/each}
                        </select>
                    {/if}
                    <button on:click={click}>Ok</button>
                {/if}
            </div>
        </Menu>

        {#if filters != null}
            {#each Object.keys(filters) as key}
                <div class="chip">
                    <span class="label">{filters[key].label}</span>
                    <Icon class="material-icons" on:click={remove(key)}>
                        clear
                    </Icon>
                </div>
            {/each}
        {/if}
    </div>
{/if}
