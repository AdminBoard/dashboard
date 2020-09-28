<script>
    import { Post } from "../Api.svelte";

    export let dataSource;
    export let params;

    let visibleColumns = [];
    let data;

    function reload() {
        if (dataSource == null || dataSource == "") return;
        Post(dataSource)
            .then((resp) => {
                if (resp.status == 0) data = resp.data;
                console.log(data);
            })
            .catch((e) => console.log(e));
    }

    function processParams() {
        params.columns.forEach((el) => {
            if (el.hidden == null || el.hidden == false)
                visibleColumns.push(el);
        });
    }

    reload();
    processParams();
</script>

<style lang="scss">
    @import "../theme/color";

    table {
        margin: 8px;
        border-radius: 8px;
        flex: 1;
        border: none;
        border-collapse: collapse;

        & th {
            background-color: $primary-dark;
            color: $primary-dark-text;
            padding: 4px;
            &:first-child {
                border-top-left-radius: 4px;
            }
            &:last-child {
                border-top-right-radius: 4px;
            }
        }

        & td {
            white-space: break-spaces;
            border-left: 1px solid $primary;
            padding: 4px;
            font-size: 0.8em;
            border-bottom: 1px solid $primary-lite;

            &.right {
                text-align: right;
            }
            &.center {
                text-align: center;
            }

            &:last-child {
                border-right: 1px solid $primary;
            }
        }
        & tr:last-child td {
            border-bottom: 1px solid $primary;
        }
    }
</style>

<table>
    {#if params != null}
        <tr>
            {#each visibleColumns as col}
                <th>{col.label}</th>
            {/each}
        </tr>
        {#if data != null}
            {#each data as row}
                <tr>
                    {#each visibleColumns as col}
                        <td
                            class:right={col.align == 'right'}
                            class:center={col.align == 'center'}>
                            {row[col.id]}
                        </td>
                        <!-- <td>{col.id}</td> -->
                    {/each}
                </tr>
            {/each}
        {/if}
    {/if}
</table>
