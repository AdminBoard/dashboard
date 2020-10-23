<script>
    export let mode = "window";
    export let nodrop = false;
    export let align = "center"; // left, center, right
    export let valign = "center"; // top, center, bottom
    export let modal = false;

    let show = false;
    let shake = false;
    let timeout;

    export function dismiss() {
        show = false;
    }
    export function open() {
        show = true;
    }

    function dismissBg() {
        if (modal) {
            shake = true;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                shake = false;
            }, 500);
        } else dismiss();
    }
</script>

<style lang="scss">
    @media screen {
        .component {
            width: 100vw;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            overflow: auto;
            z-index: 1;
            &:not(.nodrop) {
                background-color: transparentize(#000000, 0.5);
            }
            &.center {
                align-items: center;
            }
            & .content {
                &.window {
                    max-height: calc(100vh - 32px);
                    max-width: calc(100vw - 32px);
                    overflow: auto;
                    padding: 8px;
                    box-shadow: 0 0 8px #000;
                    border-radius: 8px;
                    background-color: #fff;
                }
                &.shake {
                    animation: shake 500ms ease-out;
                    transform: translateX(0);
                }
            }
        }
    }
    @media print {
        :global(.app.component .sidebar) {
            display: none;
        }
        :global(.app.component .content) {
            display: none;
        }
        .component {
            & .column {
                align-items: flex-start;
            }
        }
    }

    .component {
        opacity: 0;
        visibility: hidden;
        &.show {
            opacity: 1;
            visibility: visible;
            transition: all 200ms ease-out;
        }
        & .content {
            text-align: left;
            &.window {
                padding: 8px;
                background-color: #fff;
            }
        }
    }

    @keyframes shake {
        10%,
        90% {
            transform: translateX(-1px);
        }

        20%,
        80% {
            transform: translateX(2px);
        }

        30%,
        50%,
        70% {
            transform: translateX(-4px);
        }

        40%,
        60% {
            transform: translateX(4px);
        }
    }
</style>

<svelte:options accessors={true} />

<svelte:head>
    {#if show}
        <style>
            body {
                overflow: hidden;
            }
        </style>
    {/if}
</svelte:head>

<div class="component {valign}" class:nodrop class:show on:click={dismissBg}>
    <div class="column {align}">
        <div
            class="content {mode}"
            class:shake
            class:show
            on:click|stopPropagation>
            <slot />
        </div>
    </div>
</div>
