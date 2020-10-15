<script>
    import { onMount } from "svelte";
    import { formatDate, formatNumber, formatMap } from "./formatter";
    import { post } from "../../Api.svelte";
    import { Popup } from "../../window";

    import Header from "./header.svelte";
    import Footer from "./footer.svelte";

    export let session;
    export let page;

    export let properties;
    export let data;

    let filterParam = {};
    let sortParam = {};
    let pageParam = { location: 1, length: 100 };
    let actions = [];

    let visibleCols = [];
    let filterCols = [];
    let footer;

    let selectable = 0; // 0 = not selectable, 1 = single, 2 = multiple
    let selectedIndex = {};

    let records = [];
    let loading = false;

    function reload() {
        const dataSource = properties.data_source;

        if (dataSource == null) return;

        session.set("filters", filterParam);
        session.set("sort", sortParam);

        loading = true;

        const params = {
            filters: filterParam,
            sort: sortParam,
            page: pageParam,
        };

        if (dataSource.params != null) {
            const split = dataSource.params.split(",");
            if (data != null) {
                split.forEach((el) => {
                    params[el.trim()] = data[el.trim()];
                });
            }
        }

        post(properties.data_source.path, params)
            .then((resp) => {
                if (resp.status == 0) {
                    records =
                        resp.data == null || resp.data.items == null
                            ? []
                            : resp.data.items;
                    if (footer != null) footer.refreshPages();
                }
            })
            .finally(() => (loading = false));
    }

    function select(ev, item, index) {
        if (properties.columns == null) return;
        switch (selectable) {
            case 1:
                selectItem(item, index);
                break;
            case 2:
                if (ev.ctrlKey) {
                    if (selectedIndex[index]) selectedIndex[index] = null;
                    else selectedIndex[index] = true;
                } else if (ev.shiftKey) {
                    //TODO click table row when shift key pressed
                    // selectedIndex[index] = true;
                } else {
                    selectItem(item, index);
                }
                break;
        }
    }

    //doubleclick
    function selectItem(item, index) {
        if (selectedIndex[index] != null) {
            const data = {};
            for (const [key, val] of Object.entries(item)) {
                const col = properties.columns.filter((col) => col.id == key);
                if (col.length == 1) {
                    data[key] = formatCell(col[0], val);
                } else data[key] = val;
            }
            const action = Object.assign({}, properties.select);
            action.data = data;
            Popup.fromRight(action);
        }
        selectedIndex = {};
        selectedIndex[index] = true;
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

    function loadFromSession(name) {
        let val = session.get(name);
        if (val != null) return val;
        if (properties[name] != null) return properties[name];
        return null;
    }

    function init() {
        properties.columns.forEach((el) => {
            if (el.hidden == null || el.hidden == false) visibleCols.push(el);
            if (el.filter != null) filterCols.push(el);
        });

        let val = loadFromSession("filters");
        if (val == null)
            filterParam = properties.filters != null ? properties.filters : {};
        else filterParam = val;

        val = loadFromSession("sort");
        sortParam = val == null ? {} : val;
        pageParam = loadFromSession("page");
        selectable = properties.select == null ? 0 : 1;

        if (properties.multiple) selectable = 2;
        actions = properties.actions;

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
        &.selectable {
            & tr {
                cursor: pointer;
                &:hover {
                    background-color: lighten($col-primary, 40);
                }
                &.selected {
                    background-color: lighten($col-secondary, 30);
                    &:hover {
                        background-color: lighten($col-secondary, 35);
                    }
                }
                &:active {
                    background-color: lighten($col-secondary, 40);
                }
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

<div class="loading-container" class:notitle={page.title == null}>
    <div class="loading secondary-bg rounded" class:hide={!loading}>
        Loading...
    </div>
</div>

<div class="component">
    <table>
        {#if properties != null}
            <Header
                {page}
                columns={visibleCols}
                {filterCols}
                bind:filterParam
                bind:sortParam
                sticky={properties.sticky}
                color={properties.color}
                on:reload={reload} />
            <tbody class:selectable={selectable > 0}>
                {#each records as item, i}
                    <tr
                        on:contextmenu|preventDefault={(ev) => select(ev, item, i)}
                        class:odd={i % 2 == 1}
                        on:click|stopPropagation={(ev) => select(ev, item, i)}
                        class:selected={selectedIndex[i] != null}>
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
    <Footer
        bind:this={footer}
        bind:records
        bind:actions
        bind:pageParam
        on:reload={reload} />
</div>
