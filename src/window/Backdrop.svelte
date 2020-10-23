<script>
    export let show = false;
    export let mode = "window";
    export let nodrop = false;
    export let align = "center"; // left, center, right
    export let valign = "center"; // top, center, bottom
</script>

<style lang="scss">
    .component {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        overflow: auto;
        z-index: 1;

        opacity: 0;
        visibility: hidden;
        &.show {
            opacity: 1;
            visibility: visible;
            transition: all 200ms ease-out;
        }

        &:not(.nodrop) {
            background-color: transparentize(#000000, $amount: 0.5);
        }
        & div.row {
            height: 100%;
        }
        & .content {
            text-align: left;
            &.window {
                padding: 8px;
                box-shadow: 0 0 8px #000;
                border-radius: 8px;
                margin: 16px;
                background-color: #fff;
            }
        }
    }
</style>

<svelte:head>
    <style>
        body {
            overflow: hidden;
        }
    </style>
</svelte:head>

<div class="component " class:nodrop class:show>
    <div class="row {valign}">
        <div class="column {align}">
            <div class="content {mode}">
                <slot />
            </div>
        </div>
    </div>
</div>
