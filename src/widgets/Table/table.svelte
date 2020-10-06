<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { formatDate, formatNumber, formatMap } from "./formatter";

    import { post } from "../../Api.svelte";
    import Header from "./header.svelte";
    import Footer from "./footer.svelte";

    export let title;
    export let dataSource;
    export let params;
    export let storage;
    export let selectable = false;

    let filterParam = {};
    let sortParam = {};
    let pageParam = { location: 1, length: 100 };

    let visibleCols = [];
    let filterCols = [];
    let footer;

    let data = [];
    let cellLabels = [];
    let loading = false;

    let dispatch = createEventDispatcher();

    function reload() {
        if (dataSource == null || dataSource == "") return;

        storage.save("filter", filterParam);
        storage.save("sort", sortParam);

        loading = true;
        post(dataSource, {
            filters: filterParam,
            sort: sortParam,
            page: pageParam,
        })
            .then((resp) => {
                if (resp.status == 0) {
                    data = resp.data.items == null ? [] : resp.data.items;
                    if (footer != null) footer.refreshPages();
                }
            })
            .catch((e) => console.log(e))
            .finally(() => (loading = false));
    }

    function selectItem(item) {
        if (!selectable) return;
        if (params.columns == null) return;
        const data = {};
        for (const [key, val] of Object.entries(item)) {
            const col = params.columns.filter((col) => col.id == key);
            if (col.length == 1) {
                data[key] = formatCell(col[0], val);
            } else data[key] = val;
        }
        dispatch("select", { action: params.select, data: data });
    }

    function formatCell(col, value) {
        if (col.map != null) return formatMap(col.map, value);

        if (value == "") return "";
        else if (col.format == null) return value;

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

    function loadFromStorage(name) {
        let val = storage.get(name);
        if (val != null) return val;
        if (params[name] != null) return params[name];
        return null;
    }

    function init() {
        let val = loadFromStorage("filter");
        filterParam = val == null ? {} : val;
        val = loadFromStorage("sort");
        sortParam = val == null ? {} : val;
        pageParam = loadFromStorage("page");
        params.columns.forEach((el) => {
            if (el.hidden == null || el.hidden == false) visibleCols.push(el);
            if (el.filter != null) {
                filterCols.push(el);
                const param = filterParam[el.id];
                if (param != null) addFilterLabel(el, param.value);
            }
        });
        visibleCols = visibleCols; //refresh view
        reload();
    }
    onMount(() => {
        init();
    });
</script>

<style lang="scss">
    @import "../../style/color";

    .component {
        position: relative;
    }

    table {
        font-size: 0.9em;
        width: 100%;
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
        &.selectable tr:hover {
            cursor: pointer;
            background-color: lighten($col-primary, 40);
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

<div class="component">
    <table>
        {#if params != null}
            <Header
                {title}
                columns={visibleCols}
                {filterCols}
                bind:filterParam
                bind:sortParam
                sticky={params.sticky}
                on:reload={reload} />
            <tbody class:selectable>
                {#each data as item, i}
                    <tr
                        class:odd={i % 2 == 1}
                        on:click|stopPropagation={() => selectItem(item)}>
                        {#each visibleCols as col}
                            <td
                                class:right={col.align == 'right'}
                                class:center={col.align == 'center'}>
                                {#if col.format != null || col.map != null}
                                    {formatCell(col, item[col.id])}
                                {:else if item[col.id] != null}
                                    {item[col.id]}
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        {/if}
    </table>
    <Footer bind:data bind:this={footer} bind:pageParam on:reload={reload} />
</div>
