<script context="module">
    import { writable } from "svelte/store";
    import { pageById } from "../Api.svelte";

    let show = writable(false);
    let loading = writable(true);
    let widgets = writable([]);
    let data;

    export function fromRight(action) {
        loading.set(true);
        show.set(true);
        data = action.data;

        console.log(action);
        if (action.page_id != null) {
            pageById(action.page_id)
                .then((resp) => {
                    widgets.set(resp.widgets);
                })
                .catch((e) => console.log(e))
                .finally(() => loading.set(false));
        }
    }

    export function dismiss() {
        loading.set(false);
        show.set(false);
    }
</script>

<script>
    import Widget from "../widgets/Widget.svelte";
</script>

<style lang="scss">
    .component {
        font-size: 0.9em;
        position: relative;
        & > div {
            max-height: calc(100%-60px);
            padding: 16px;
            overflow-y: auto;
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
                transition-duration: 500ms;
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
                <div class="row">
                    {#each line as widget}
                        <div class="fill">
                            <Widget {data} content={widget} />
                        </div>
                    {/each}
                </div>
            {/each}
        {/if}
    </div>
</div>
