<script>
    import { onMount } from "svelte";
    import { formatDate, formatNumber, formatMap } from "./formatter";

    import { Post } from "../../Api.svelte";
    import Header from "./header.svelte";
    import Footer from "./footer.svelte";

    export let title;
    export let dataSource;
    export let params;
    export let storage;

    let filterParam = {};
    let sortParam = {};
    let pageParam = { location: 1, length: 100 };

    let visibleCols = [];
    let filterCols = [];
    let footer;

    let data = [];
    let loading = false;

    function reload() {
        if (dataSource == null || dataSource == "") return;

        storage.save("filter", filterParam);
        storage.save("sort", sortParam);

        loading = true;
        Post(dataSource, {
            filters: filterParam,
            sort: sortParam,
            page: pageParam,
        })
            .then((resp) => {
                if (resp.status == 0) {
                    data = resp.data.items == null ? [] : resp.data.items;
                    footer.refreshPages();
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
        footer.refreshPages();
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
    @import "table";
</style>

<div class="loading-container" class:notitle={title == null}>
    <div class="loading secondary-bg rounded" class:hide={!loading}>
        Loading...
    </div>
</div>

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
    {/if}
    <Footer
        bind:data
        bind:this={footer}
        bind:pageParam
        columnLength={visibleCols.length}
        on:reload={reload} />
</table>
