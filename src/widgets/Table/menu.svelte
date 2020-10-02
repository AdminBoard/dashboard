<script>
    export let icon;
    export let tooltip;

    let show = false;
    let focus = false;

    export function close() {
        focus = false;
        show = false;
    }
</script>

<style lang="scss">
    @import "../../style/color";

    .icon {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 32px;
        margin: 4px;
        border-radius: 8px;
        padding: 0 4px;
        &.hover {
            background-color: lighten($color: $col-primary, $amount: 8);
        }
    }
    .tooltip {
        position: absolute;
        font-size: 0.75em;
        background-color: #fff;
        color: #333;
        border-radius: 4px;
        box-shadow: 0 0 4px #000;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0.1s, opacity 0.1s ease-out;
        transition-duration: 400ms;
        transition-delay: 500ms;
        &.show {
            transition-duration: 100ms;
            visibility: visible;
            opacity: 1;
            transition-delay: 0;
        }
    }
    .popover {
        background-color: #fff;
        box-shadow: 0 0 8px #000;
        margin-top: -4px;
        border-radius: 4px;
        font-size: 0.8em;
        position: absolute;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.1s, opacity 0.1s ease-out;
        transition-duration: 100ms;
        outline: none;

        &.show {
            visibility: visible;
            opacity: 1;
        }
    }
</style>

<svelte:body on:click={() => (focus = false)} />

<div>
    <div
        class="icon"
        class:hover={show || focus}
        on:mouseover={() => (show = true)}
        on:mouseleave={() => (show = false)}
        on:click|stopPropagation={() => (focus = true)}>
        <i class="material-icons">{icon}</i>
    </div>
    <div class="tooltip padding" class:show={show && !focus}>{tooltip}</div>
    <div
        class="popover padding"
        class:show={focus}
        tabindex="-1"
        on:click|stopPropagation
        on:blur={() => (focus = false)}>
        <slot />
    </div>
</div>
