<script>
    import { createEventDispatcher } from "svelte";

    export let columns = [];
    export let dismiss;

    let dispatch = createEventDispatcher();

    let selColumn;
    let value; //input value
    let selectionValue; //select value

    function click() {
        let val = value;
        if (selColumn.map != null) val = selectionValue;

        dispatch("select", { column: selColumn, value: val });
        if (dismiss != null) dismiss();

        value = "";
        selectionValue = "";
    }
</script>

<style lang="scss">
    .component {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > * + * {
            margin-left: 8px;
        }
    }
</style>

<div class="component">
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
                    <option value={key}>{selColumn.map[key]}</option>
                {/each}
            </select>
        {/if}
        <button on:click={click}>Ok</button>
    {/if}
</div>
