<script context="module">
    import { writable } from "svelte/store";
    import { pageById } from "../Api.svelte";

    let show = writable("");
    let loading = writable(true);
    let widgets = writable([]);
    let data;

    export function fromRight(action) {
        openPopup(action, "right");
    }

    export function open(action) {
        openPopup(action, "center");
    }

    function openPopup(action, direction) {
        show.set(direction);
        loading.set(true);
        data = action.data;

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
        show.set("");
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
            max-height: calc(100vh-60px);
            max-width: calc(100vw-60px);
            padding: 16px;
            overflow-y: auto;
            box-shadow: 0 0 8px transparentize(#000000, 0.1);
            position: fixed;
            top: 50%;

            &.center {
                border-radius: 8px;
                visibility: hidden;
                left: 50%;
                transform: translate(-50%, -50%);
                &.show {
                    visibility: visible;
                    transition-duration: 500ms;
                }
            }
            &.right {
                transform: translateY(-50%);
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                right: -100%;
                transition: right 0.2s ease-out;
                &.show {
                    right: 0;
                    transition-duration: 500ms;
                }
            }
            z-index: 1;
            background-color: #eee;
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
    {#if $show != ''}
        <style>
            body {
                overflow: hidden;
            }
        </style>
    {/if}
</svelte:head>

<div class="component" on:click|stopPropagation>
    <div class="background" on:click={dismiss} class:show={$show != ''} />

    {#if $show == 'right'}
        <div class="content right" class:show={$show != ''}>
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
    {:else if $show == 'center'}
        center
        <div class="content center" class:show={$show != ''}>
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
    {/if}
</div>
