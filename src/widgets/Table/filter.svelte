<script>
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
    @import "../../style/color";
    .filter {
        & select {
            outline: none;
        }

        & > * {
            margin: 4px;
        }
    }
    .chip {
        background-color: darken($col-primary, 12);
        margin: 4px;
        border-radius: 16px;
        align-items: center;
        font-size: 0.9em;
        display: flex;
        padding-left: 6px;
        cursor: default;
        & .label {
            margin: 8px 4px 8px 8px;
        }
        &:not(:last-child) {
            margin-right: 4px;
        }
        &:hover {
            & i {
                box-shadow: 0 0 2px $col-secondary;
            }
        }
        & i {
            font-size: 1em;
            color: #999;
            font-weight: bold;
            cursor: pointer;
            padding: 4px;
            border-radius: 16px;
            margin-right: 4px;
            border: 1px solid transparent;
            &:hover {
                border: 1px solid $col-secondary;
                background-color: lighten($col-secondary, 10);
                color: $col-secondary-text;
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
                    <i class="material-icons" on:click={remove(key)}>clear</i>
                </div>
            {/each}
        {/if}
    </div>
{/if}
