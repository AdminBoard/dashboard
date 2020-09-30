<script>
    import { onMount } from "svelte";
    import { formatDate, formatNumber, formatMap } from "./formatter";

    import { Post } from "../../Api.svelte";
    import Title from "./title.svelte";

    export let title;
    export let dataSource;
    export let params;
    export let page;

    let titleComponent;

    let filterParams = {};

    let visibleCols = [];
    let filterCols = [];

    let data = [];

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
                data = [];
                if (resp.status == 0) data = resp.data;
                console.log(data);
            })
            .catch((e) => console.log(e));
    }

    function formatCell(col, value) {
        if (value == "") return "";
        const format = col.format;
        if (format == "map") return formatMap(col.map, value);
        let command = format;
        let subcommand = "";
        let idx = command.indexOf(" ");
        if (idx >= 0) {
            command = format.substr(0, idx);
            subcommand = format.substr(idx + 1, format.length);
        }
        switch (command) {
            case "number":
                return formatNumber(value);
            case "date":
                return formatDate(format, value);
        }
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
        {#each data as row, i}
            <tr class:odd={i % 2 == 1} class:tenth={(i + 1) % 10 == 0 && i > 0}>
                {#each visibleCols as col}
                    <td
                        class:right={col.align == 'right'}
                        class:center={col.align == 'center'}>
                        {#if col.format != null}
                            {formatCell(col, row[col.id])}
                        {:else if row[col.id] != null}{row[col.id]}{/if}
                    </td>
                {/each}
            </tr>
        {/each}
    {/if}
</table>
