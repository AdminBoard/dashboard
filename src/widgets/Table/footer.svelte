<script>
    import { createEventDispatcher } from "svelte";
    import { Popup } from "../../window";

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

    function actionClick(action) {
        switch (action.command) {
            case "openPage":
                Popup.slideRight(action);

                break;
        }
    }
</script>

<style lang="scss">
    @import "../../style/color";

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
                {#each actions as action}
                    <button
                        on:click={() => actionClick(action)}>{action.label}</button>
                {/each}
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
