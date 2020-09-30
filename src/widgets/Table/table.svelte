<script>
    import { onMount } from "svelte";

    import { Post } from "../../Api.svelte";
    import Cell from "./cell.svelte";
    import Title from "./title.svelte";

    export let title;
    export let dataSource;
    export let params;
    export let page;

    let titleComponent;

    let filterParams = {};

    let visibleCols = [];
    let filterCols = [];

    let data;

    function reloadData() {
        if (dataSource == null || dataSource == "") return;
        let filters = {};
        for (const key in filterParams) {
            filters[key] = {
                value: filterParams[key].value,
                filter: filterParams[key].filter,
            };
        }
        page.save("filter", filterParams);
        Post(dataSource, { filters: filters })
            .then((resp) => {
                if (resp.status == 0) data = resp.data;
            })
            .catch((e) => console.log(e));
    }

    function init() {
        let filter = page.get("filter");
        if (filter != null) filterParams = JSON.parse(filter);

        params.columns.forEach((el) => {
            if (el.hidden == null || el.hidden == false) visibleCols.push(el);
            if (el.filter != null) filterCols.push(el);
        });
        visibleCols = visibleCols; //refresh view
    }
    onMount(() => {
        reloadData();
    });

    init();
</script>

<style lang="scss">
    @import "table";
</style>

<Title
    bind:this={titleComponent}
    caption={title}
    on:filterChange={reloadData}
    {filterParams}
    {filterCols} />
<table>
    {#if params != null}
        <tr>
            {#each visibleCols as col}
                <th>{col.label}</th>
            {/each}
        </tr>
        {#if data != null}
            {#each data as row, i}
                <tr
                    class:odd={i % 2 == 1}
                    class:tenth={(i + 1) % 10 == 0 && i > 0}>
                    {#each visibleCols as col}
                        <td
                            class:right={col.align == 'right'}
                            class:center={col.align == 'center'}>
                            <Cell
                                bind:value={row[col.id]}
                                format={col.format}
                                map={col.map} />
                        </td>
                    {/each}
                </tr>
            {/each}
        {/if}
    {/if}
</table>
