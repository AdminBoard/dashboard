<script>
    import { onMount } from "svelte";
    import { formatDate, formatNumber, formatMap } from "./formatter";

    import { Post } from "../../Api.svelte";
    import Filter from "./filter.svelte";
    import Link from "../../router/Link.svelte";

    export let title;
    export let dataSource;
    export let params;
    export let storage;

    let filterParam = {};
    let sortParam = {};
    let pageParam = { location: 1, length: 100 };
    let pages = [];

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
        storage.save("filter", filterParam);
        storage.save("sort", sortParam);

        loading = true;
        Post(dataSource, { filters: filters, sort: sortParam, page: pageParam })
            .then((resp) => {
                if (resp.status == 0) {
                    data = resp.data.items == null ? [] : resp.data.items;
                    refreshPages();
                }
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
        if (col.id != sortParam.active) {
            sortParam = { active: col.id, direction: "asc" };
        } else {
            if (sortParam.direction == "asc") sortParam.direction = "desc";
            else sortParam = {};
        }
        reloadData();
    }

    function pageChange(page) {
        pageParam.location = page;
        reloadData();
    }

    function loadFromStorage(name) {
        let val = storage.get(name);
        if (val != null) return val;
        if (params[name] != null) return params[name];
        return null;
    }

    function refreshPages() {
        const page = pageParam.location;
        pages = [];
        for (let i = page - 1; i > page - 3 && i > 0; i--) {
            pages.unshift(i);
        }
        pages.push(pageParam.location);
        if (data.length == pageParam.length) {
            for (let i = page + 1; i < page + 3; i++) {
                pages.push(i);
            }
        }
        pages = pages; //refresh view
    }

    function init() {
        let val = loadFromStorage("filter");
        filterParam = val == null ? {} : val;
        val = loadFromStorage("sort");
        sortParam = val == null ? {} : val;
        pageParam = loadFromStorage("page");
        refreshPages();
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
    @import "../../style/color";

    table {
        font-size: 0.9em;
        width: 100%;
    }
    thead {
        &.sticky {
            top: 0;
            & th,
            td {
                position: sticky;
                text-align: center;
            }
        }

        & th,
        td {
            height: 32px;
        }

        & th {
            top: 0;
            height: 42px;
            background-color: $col-primary;
            z-index: 1;
        }

        & td {
            background-color: lighten($col-primary, 3);
            text-shadow: 0 0 8px #000;

            &:not(.notitle) {
                top: 43px;
            }
            &.notitle {
                top: 0;
            }

            & i {
                font-size: 1em;
            }

            & .sort {
                cursor: pointer;
                &:hover {
                    text-shadow: 0 0 8px $col-secondary;
                }
            }
        }
    }
    tbody {
        & tr {
            &.odd {
                background-color: lighten($col-primary, 48);
            }
        }
        & td {
            white-space: pre;
            vertical-align: top;
            border-bottom: 1px solid #e0e0e0;
            padding: 4px;

            & + td {
                border-left: 1px solid #ccc;
            }
        }
    }
    tfoot {
        & td {
            position: sticky;
            bottom: 0;
            padding: 8px 16px;
        }
        & .content {
            background-color: #eee;
            padding: 8px;
            box-shadow: 0 0 4px #000;
            display: inherit;
        }
        & .page > div {
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            &:hover {
                box-shadow: 0 0 4px $col-secondary;
            }
            &.current {
                box-shadow: 0 0 4px $col-primary;
            }
            &:first-child {
                margin-left: 8px;
            }
        }
    }
    .loading-container {
        z-index: 1;
        position: fixed;
        right: 16px;
        &.notitle {
            top: 24px;
        }
        &:not(.notitle) {
            top: 66px;
        }
        & .loading {
            box-shadow: 0 0 8px #000;
            opacity: 1;
            transition: opacity 0.1s ease-out;
            transition-duration: 100ms;
            &.hide {
                opacity: 0;
                transition-duration: 500ms;
            }
        }
    }
</style>

<div class="loading-container" class:notitle={title == null}>
    <div class="loading secondary-bg rounded" class:hide={!loading}>
        Loading...
    </div>
</div>

<table>
    {#if params != null}
        <thead class="primary-bg" class:sticky={params.sticky}>
            {#if title != null}
                <tr>
                    <th colspan={visibleCols.length}>
                        <div class="row center">
                            <div class="caption padding">{title}</div>
                            {#if filterCols}
                                <Filter
                                    filters={filterParam}
                                    on:change={reloadData}
                                    columns={filterCols} />
                            {/if}
                        </div>
                    </th>
                </tr>
            {/if}
            <tr>
                {#each visibleCols as col}
                    <td class:notitle={title == null}>
                        {#if col.sortable}
                            <span class="sort" on:click={sort(col)}>
                                {col.label}
                                {#if col.id == sortParam.active}
                                    <i class="material-icons">
                                        {#if sortParam.direction == 'asc'}
                                            keyboard_arrow_down
                                        {:else}keyboard_arrow_up{/if}
                                    </i>
                                {/if}
                            </span>
                        {:else}{col.label}{/if}
                    </td>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data as row, i}
                <tr class:odd={i % 2 == 1}>
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
        </tbody>
        {#if pageParam != null}
            <tfoot>
                <tr>
                    <td colspan={visibleCols.length}>
                        <div class="column right">
                            <div class="page content rounded row center">
                                Page:
                                {#each pages as page}
                                    <div
                                        on:click={() => pageChange(page)}
                                        class:current={page == pageParam.location}>
                                        {page}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        {/if}
    {/if}
</table>
