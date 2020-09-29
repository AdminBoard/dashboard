<script>
    import { Icon } from "@smui/common";
    import { onMount } from "svelte";
    export let icon;
    export let tooltip;

    let show = false;
    let focus = false;
    let popoverContainer;

    function hide() {
        if (!focus) show = false;
    }

    function popover() {
        focus = true;
        setTimeout(() => {
            popoverContainer.focus();
        }, 200);
    }
</script>

<style lang="scss">
    @import "menu";
</style>

<div class="container">
    <div
        class="icon"
        class:hover={show || focus}
        on:mouseover={() => (show = true)}
        on:mouseleave={() => (show = false)}
        on:click={popover}>
        <Icon class="material-icons">{icon}</Icon>
    </div>
    <div class="tooltip" class:show={show && !focus}>{tooltip}</div>
    <div
        bind:this={popoverContainer}
        class="popover"
        class:show={focus}
        tabindex="-1"
        on:blur={() => (focus = false)}>
        <slot />
    </div>
</div>
