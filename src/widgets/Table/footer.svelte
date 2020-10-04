<script>
    import { createEventDispatcher } from "svelte";

    export let columnLength;
    export let pageParam;
    export let data;

    let pages = [];
    let dispatch = createEventDispatcher();

    export function refreshPages() {
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

    function changePage(page) {
        pageParam.location = page;
        dispatch("reload");
    }
</script>

<style lang="scss">
    @import "../../style/color";

    tfoot {
        & td {
            padding: 8px;
            position: sticky;
            bottom: 0;
            // background-color: transparentize(#ccc, 0.1);
            // box-shadow: 0 0 4px transparentize(#000000, $amount: 0.8);
        }
        // & .content {
        //     background-color: #eee;
        //     padding: 8px;
        //     box-shadow: 0 0 4px #000;
        //     display: inherit;
        // }
        // & .page > div {
        //     cursor: pointer;
        //     padding: 4px 8px;
        //     border-radius: 4px;
        //     &:hover {
        //         box-shadow: 0 0 4px $col-secondary;
        //     }
        //     &.current {
        //         box-shadow: 0 0 4px $col-primary;
        //     }
        //     &:first-child {
        //         margin-left: 8px;
        //     }
        // }
        .paging {
            background-color: #ccc;
            flex: 0;
            & > div {
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 4px;
                background-color: #eee;
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
    }
</style>

<tfoot>
    <tr>
        <td colspan={columnLength}>
            <div class="row center">
                <div class="fill">&nbsp;</div>
                <div class="fill">&nbsp;</div>
                <div class="paging rounded row center">
                    Page:
                    {#each pages as page}
                        <div
                            class:current={page == pageParam.location}
                            on:click={() => changePage(page)}>
                            {page}
                        </div>
                    {/each}
                </div>
            </div>
        </td>
    </tr>
</tfoot>
