<script context="module">
    import { writable } from "svelte/store";
    import { pageById } from "../Api.svelte";
    import Snackbar from "../snackbar/Snackbar.svelte";
    import { Widget } from "../widgets";

    import Modal from "./Modal.svelte";

    let widgets = writable([]);
    let data;
    let modal;

    export function open(action) {
        data = action.data;
        modal.open();

        if (action.page_id != null) {
            widgets.set([]);
            pageById(action.page_id)
                .then((resp) => {
                    widgets.set(resp.widgets);
                })
                .catch((e) => {
                    Snackbar.open(e);
                    modal.dismiss();
                });
            //     pageById(action.page_id)
            //         .then((resp) => {
            //             widgets.set(resp.widgets);
            //         })
            //         .catch((e) => console.log(e))
            //         .finally(() => loading.set(false));
        }

        // show.set(direction);
        // loading.set(true);
    }
    export function fromRight() {}
    export function dismiss() {}
</script>

<Modal bind:this={modal}>
    <div class="component">
        {#each $widgets as line}
            <div class="row">
                {#each line as widget}
                    <div class="fill">
                        <Widget {data} content={widget} />
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</Modal>

<!--<script context="module">
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
</script><script>
    import Widget from "../widgets/Widget.svelte";
</script><style lang="scss">
    .component {
        font-size: 0.9em;
        & .content {
            padding: 8px;
            text-align: left;
        }
    }

    @media screen {
        .component {
            position: relative;

            & .content {
                position: fixed;
                z-index: 1;
                box-shadow: 0 0 8px transparentize(#000000, 0.1);
                max-height: calc(100vh-60px);
                max-width: calc(100vw-60px);
                overflow-y: auto;
                top: 50%;
                background-color: #eee;

                &.center {
                    border-radius: 8px;
                    transform: translate(-50%, -50%);
                    left: 50%;
                    visibility: hidden;
                    opacity: 0;
                    transition: all 200ms ease-out;
                    &.show {
                        opacity: 1;
                        visibility: visible;
                        transition-duration: 500ms;
                    }
                }
                &.right {
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                    transform: translateY(-50%);
                    right: -100%;
                    transition: all 200ms ease-out;
                    &.show {
                        right: 0;
                        transition-duration: 500ms;
                    }
                }
                & .loading {
                    width: 100px;
                    height: 80px;
                }
            }
            & .background {
                background-color: transparentize(#000000, $amount: 0.3);
                position: fixed;
                z-index: 1;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                visibility: hidden;
                &.show {
                    transition: visibility 0.2s ease-out;
                    visibility: visible;
                }
            }
        }
    }
    @media print {
        .component {
            & .background {
                display: none;
            }
        }
        :global(.app.container > .sidebar) {
            display: none;
        }
        :global(.app.container > .content) {
            display: none;
        }
    }
</style><svelte:head>
    {#if $show != ''}<style>
            body {
                overflow: hidden;
            }
        </style>{/if}
</svelte:head>

<div class="component popup" on:click|stopPropagation>
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
</div> -->
