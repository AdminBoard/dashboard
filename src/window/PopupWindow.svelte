<script context="module">
    import { writable } from "svelte/store";
    import { pageById } from "../Api.svelte";

    let _show = writable("");
    let _loading = writable(true);
    let _widgets = writable([]);
    let data;

    export function fromRight(action) {
        _loading.set(true);
        _show.set("right");
        data = action.data;

        if (action.page_id != null) {
            pageById(action.page_id)
                .then((resp) => {
                    _widgets.set(resp.widgets);
                })
                .catch((e) => console.log(e))
                .finally(() => _loading.set(false));
        }
    }

    export function show(action) {
        _show.set("center");
        _loading.set(true);
    }

    export function dismiss() {
        _loading.set(false);
        _show.set("");
    }
</script>

<script>
    import Widget from "../widgets/Widget.svelte";
</script>

<style lang="scss">
    .component {
        font-size: 0.9em;
        position: relative;
        & .content {
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
            & .loading {
                width: 100px;
                height: 80px;
            }
        }
        & .background {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            position: fixed;
            background-color: transparentize(#000000, $amount: 0.3);
            z-index: 1;
            visibility: hidden;
            &.show {
                transition: visibility 0.2s ease-out;
                visibility: visible;
            }
        }
    }
</style>

<svelte:head>
    {#if $_show != ''}
        <style>
            body {
                overflow: hidden;
            }
        </style>
    {/if}
</svelte:head>

<div class="component" on:click|stopPropagation>
    <div class="background" on:click={dismiss} class:show={$_show != ''} />
    <div class="content" class:show={$_show != ''}>
        {#if $_loading}
            <div class="loading rounded row center">Loading...</div>
        {:else}
            {#each $_widgets as line}
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
