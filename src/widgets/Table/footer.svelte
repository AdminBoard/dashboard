<script>
    import { createEventDispatcher } from "svelte";

    export let pageParam;
    export let records;
    export let actions;

    let pages = [];
    let dispatch = createEventDispatcher();

    export function refreshPages() {
        if (pageParam == null) return;
        const page = pageParam.location;
        pages = [];
        for (let i = page - 1; i > page - 3 && i > 0; i--) {
            pages.unshift(i);
        }
        pages.push(pageParam.location);
        if (records.length == pageParam.length) {
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

    .components {
        & .actions,
        .paging {
            position: fixed;
            bottom: 0;
            margin: 8px;
            background-color: transparentize(#eee, 0.1);
            box-shadow: 0 0 4px transparentize(#000, 0.3);
        }
        & .actions {
            padding: 4px 8px;
        }
        & .paging {
            right: 0;
            flex: 0;
            & > div {
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 4px;
                background-color: #fff;
                &:hover {
                    box-shadow: 0 0 4px $col-secondary;
                    background-color: transparentize($col-secondary, 0.4);
                    color: $col-secondary-text;
                }
                &:active {
                    background-color: $col-secondary;
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

    .component {
        margin: 8px;
        background-color: #eee;
        box-shadow: 0 0 4px transparentize(#000, 0.5);
        position: fixed;
        bottom: 0;
        right: 0;

        & .paging-label {
            margin: 8px;
        }
    }
</style>

{#if actions != null || pageParam != null}
    <div class="component rounded row center">
        {#if actions != null}
            <div class="actions">
                {#each actions as action}<button>{action.label}</button>{/each}
            </div>
        {/if}

        {#if pageParam != null}
            <div class="row center">
                <div class="paging-label">Page:</div>
                {#each pages as page}
                    <button
                        class:current={page == pageParam.location}
                        on:click={() => changePage(page)}>
                        {page}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
{/if}

<!-- <div class="component">
    <div class="column">
        <div class="row">
            <div class="actions rounded"><button>Print</button></div>

            {#if records != null && records.length > 0 && pages.length > 0}
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
            {/if}
        </div>
    </div>
</div> -->
