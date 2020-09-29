<script>
    import { Icon } from "@smui/common";
    export let icon;

    let show = false;
    let focus = false;

    function hide() {
        if (!focus) show = false;
    }
</script>

<style lang="scss">
    @import "../../theme/color";

    .icon {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 42px;
        &:hover {
            color: $secondary;
        }
    }
    .popover {
        background-color: $primary-dark;
        padding: 8px;
        margin-top: -4px;
        border-radius: 4px;
        font-size: 0.8em;
        position: absolute;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.1s, opacity 0.1s ease-out;
        transition-duration: 100ms;
        box-shadow: 0 0 8px $primary-dark;

        &.show {
            visibility: visible;
            opacity: 1;
        }
    }
</style>

<div>
    <div
        class="icon"
        class:show
        on:mouseover={() => (show = true)}
        on:mouseleave={() => (show = false)}>
        <Icon class="material-icons">{icon}</Icon>
    </div>
    <div
        class="popover"
        class:show={show || focus}
        tabindex="-1"
        on:mouseover={() => (show = true)}
        on:mouseleave={() => (show = false)}
        on:focus={() => (focus = true)}
        on:blur={() => (focus = false)}>
        <slot />
    </div>
</div>
