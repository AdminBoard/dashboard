<script>
    import { createEventDispatcher } from "svelte";

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

    .component {
        position: fixed;
        bottom: 0;
        right: 0;

        & .paging {
            margin: 0 8px 8px 0;
            background-color: transparentize(#eee, 0.1);
            box-shadow: 0 0 4px transparentize(#000, 0.3);
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
</style>

<div class="component">
    <div class="column right">
        <div class="row">
            {#if data != null && data.length > 0}
                <div class="paging rounded row">
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
</div>
