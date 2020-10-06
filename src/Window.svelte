<script context="module">
    import { writable } from "svelte/store";
    let show = writable(false);
    let shown = false;

    show.subscribe((s) => (shown = s));

    function dismiss() {
        if (!shown) return;
        document.body.classList.remove("modal");
        show.set(false);
    }

    export function peekPage(id) {
        document.body.classList.add("modal");
        show.set(true);
    }
</script>

<script>
</script>

<style lang="scss">
    .component {
        position: fixed;
        top: 0;
        border: 1px solid red;
        height: calc(100vh-2px);
        width: calc(100%-2px);
        visibility: hidden;
        z-index: 1;
        &.show {
            visibility: visible;
        }
    }
</style>

<div class="component" class:show={$show} on:click|stopPropagation={dismiss}>
    test
</div>
