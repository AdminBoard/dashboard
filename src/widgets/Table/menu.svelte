<script>
    import { Icon } from "@smui/common";
    import { onMount } from "svelte";
    export let icon;
    export let tooltip;

    let show = false;
    let focus = false;
</script>

<style lang="scss">
    @import "menu";
</style>

<svelte:body on:click={() => (focus = false)} />

<div class="container">
    <div
        class="icon"
        class:hover={show || focus}
        on:mouseover={() => (show = true)}
        on:mouseleave={() => (show = false)}
        on:click|stopPropagation={() => (focus = true)}>
        <Icon class="material-icons">{icon}</Icon>
    </div>
    <div class="tooltip" class:show={show && !focus}>{tooltip}</div>
    <div
        class="popover"
        class:show={focus}
        tabindex="-1"
        on:click|stopPropagation
        on:blur={() => (focus = false)}>
        <slot />
    </div>
</div>
