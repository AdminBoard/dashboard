<script context="module">
    import { writable } from "svelte/store";
    import Widget from "./widgets/Widget.svelte";
    import { pageById } from "./Api.svelte";

    let show = writable(false);
    let loading = writable(true);
    let widgets = writable([]);
    let data;

    export function openContentPage(action) {
        loading.set(true);
        show.set(true);
        data = action.data;

        pageById(action.action.page_id)
            .then((resp) => {
                widgets.set(resp.widgets);
            })
            .catch((e) => console.log(e))
            .finally(() => loading.set(false));
    }
    function dismiss() {
        loading.set(false);
        show.set(false);
    }
</script>

<style lang="scss">
    .component {
        font-size: 0.9em;
        & > div {
            display: table;
            padding: 16px;
            overflow-y: auto;
            margin-top: 8px;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            box-shadow: 0 0 8px transparentize(#000000, 0.1);
            position: fixed;
            top: 50%;
            right: -100%;
            transform: translateY(-50%);
            z-index: 1;
            background-color: #eee;
            transition: right 0.2s ease-out;
            &.show {
                right: 0;
            }
            & > .line {
                display: table-row;
                & > .col {
                    display: table-cell;
                    vertical-align: top;
                }
            }
        }
        .loading {
            width: 100px;
            height: 80px;
        }
    }
</style>

<svelte:body on:click={dismiss} />

<div class="component" on:click|stopPropagation>
    <div class:show={$show}>
        {#if $loading}
            <div class="loading rounded row center">Loading...</div>
        {:else}
            {#each $widgets as line}
                <div class="line">
                    {#each line as widget}
                        <div class="col">
                            <Widget {data} content={widget} />
                        </div>
                    {/each}
                </div>
            {/each}
        {/if}
    </div>
</div>
