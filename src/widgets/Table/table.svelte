<script>
    import { Post } from "../../Api.svelte";
    import Cell from "./cell.svelte";
    import Title from "./title.svelte";

    export let title;
    export let dataSource;
    export let params;

    let visibleColumns = [];
    let filteredColumns = [];
    let data;

    function reload() {
        if (dataSource == null || dataSource == "") return;
        Post(dataSource)
            .then((resp) => {
                if (resp.status == 0) data = resp.data;
            })
            .catch((e) => console.log(e));
    }

    function processParams() {
        params.columns.forEach((el) => {
            if (el.hidden == null || el.hidden == false)
                visibleColumns.push(el);
            if (el.filter != null) filteredColumns.push(el);
        });
    }

    reload();
    processParams();
</script>

<style lang="scss">
    @import "table";
</style>

<Title caption={title} bind:filteredColumns />
<table>
    {#if params != null}
        <tr>
            {#each visibleColumns as col}
                <th>{col.label}</th>
            {/each}
        </tr>
        {#if data != null}
            {#each data as row, i}
                <tr
                    class:odd={i % 2 == 1}
                    class:tenth={(i + 1) % 10 == 0 && i > 0}>
                    {#each visibleColumns as col}
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
