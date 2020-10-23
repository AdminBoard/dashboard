<script>
    export let mode = "window";
    export let nodrop = false;
    export let align = "center"; // left, center, right
    export let valign = "center"; // top, center, bottom

    let show = false;

    export function dismiss() {
        show = false;
    }
    export function open() {
        show = true;
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
            overflow: auto;
            z-index: 1;
            &:not(.nodrop) {
                background-color: transparentize(#000000, 0.5);
            }
            & div.row {
                height: 100%;
            }
            & .content {
                &.window {
                    padding: 8px;
                    box-shadow: 0 0 8px #000;
                    border-radius: 8px;
                    margin: 16px;
                    background-color: #fff;
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
</style>

<svelte:options accessors={true} />

<svelte:head>
    <style>
        body {
            overflow: hidden;
        }
    </style>
</svelte:head>

<div class="component" class:nodrop class:show>
    <div class="row {valign}">
        <div class="column {align}">
            <div class="content {mode}" class:show>
                <slot />
            </div>
        </div>
    </div>
</div>
