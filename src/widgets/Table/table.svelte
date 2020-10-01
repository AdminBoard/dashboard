<script>
    import { Icon } from "@smui/common";

    import { onMount } from "svelte";
    import { formatDate, formatNumber, formatMap } from "./formatter";

    import { Post } from "../../Api.svelte";
    import Title from "./title.svelte";

    export let title;
    export let dataSource;
    export let params;
    export let page;

    let filterParam = {};
    let sortParam;

    let visibleCols = [];
    let filterCols = [];

    let data = [];
    let loading = false;

    function reloadData() {
        if (dataSource == null || dataSource == "") return;
        let filters = {};
        for (const key in filterParam) {
            filters[key] = {
                value: filterParam[key].value,
                filter: filterParam[key].filter,
            };
        }
        page.save("filter", filterParam);

        loading = true;
        Post(dataSource, { filters: filters, sort: sortParam })
            .then((resp) => {
                if (resp.status == 0)
                    data = resp.data.items == null ? [] : resp.data.items;
            })
            .catch((e) => console.log(e))
            .finally(() => (loading = false));
    }

    function formatCell(col, value) {
        if (col.map != null) return formatMap(col.map, value);

        if (value == "") return "";
        const format = col.format;

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
                return formatDate(subcommand, value);
        }
    }

    function sort(col) {
        if (sortParam == null || col.id != sortParam.active) {
            sortParam = { active: col.id, direction: "asc" };
        } else {
            if (sortParam.direction == "asc") sortParam.direction = "desc";
            else sortParam = null;
        }
        reloadData();
    }

    function init() {
        let filter = page.get("filter");
        if (filter != null) filterParam = JSON.parse(filter);

        if (params.sort != null) sortParam = params.sort;

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
    caption={title}
    on:filterChange={reloadData}
    {filterParam}
    {filterCols} />

{#if title != null}
    <div class="title-placeholder" />
{/if}

<table>
    {#if params != null}
        <tr>
            {#each visibleCols as col}
                <th>
                    {#if col.sortable}
                        <span class="sort" on:click={sort(col)}>
                            {col.label}
                            {#if sortParam != null && col.id == sortParam.active}
                                <Icon class="material-icons">
                                    {#if sortParam.direction == 'asc'}
                                        keyboard_arrow_down
                                    {:else}keyboard_arrow_up{/if}
                                </Icon>
                            {/if}
                        </span>
                    {:else}{col.label}{/if}
                </th>
            {/each}
        </tr>
        {#each data as row, i}
            <tr class:odd={i % 2 == 1} class:tenth={(i + 1) % 10 == 0 && i > 0}>
                {#each visibleCols as col}
                    <td
                        class:right={col.align == 'right'}
                        class:center={col.align == 'center'}>
                        {#if col.format != null || col.map != null}
                            {formatCell(col, row[col.id])}
                        {:else if row[col.id] != null}{row[col.id]}{/if}
                    </td>
                {/each}
            </tr>
        {/each}
    {/if}
</table>
<div class="loading-container">
    {#if title != null}
        <div class="title-placeholder" />
    {/if}
    <div class="loading" class:hide={!loading}>Loading...</div>
</div>
