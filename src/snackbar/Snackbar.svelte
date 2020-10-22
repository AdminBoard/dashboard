<script context="module">
    import { writable } from "svelte/store";

    let message = writable("");
    let show = writable(false);
    let timeout;

    export function openSnackbar(msg) {
        message.set(msg);
        show.set(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            show.set(false);
        }, 2000);
    }
</script>

<style lang="scss">
    @import "../style/color";

    .component {
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 0 8px #000;
        background-color: #444;
        color: invert($color: $col-primary-bg);
        color: $col-primary-bg;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        bottom: 0;
        transition: all 400ms ease-out;
        &.show {
            opacity: 1;
            bottom: 16px;
            transition: all 300ms ease-out;
        }
    }
</style>

<div class="component" class:show={$show}>{$message}</div>
