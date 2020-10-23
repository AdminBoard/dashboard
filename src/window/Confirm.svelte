<script context="module">
    import { writable } from "svelte/store";
    import Backdrop from "./Backdrop.svelte";

    const show = writable(false);
    const message = writable("");
    let resolveF;

    export async function confirm(msg) {
        return new Promise((resolve) => {
            message.set(msg);
            show.set(true);
            answer = resolve;
        });
    }
</script>

<script>
    function click(yes) {
        resolveF(yes);
        show.set(false);
    }
</script>

<style lang="scss">
    .component {
        min-width: 240px;

        & .message {
            padding: 8px 8px 16px 8px;
        }

        .buttons {
            & button {
                width: 80px;
            }
            & .separator {
                width: 16px;
            }
        }
    }
</style>

<Backdrop bind:show={$show}>
    <div class="component">
        <div class="message">{$message}</div>
        <div class="column center buttons">
            <div class="row">
                <button on:click={() => click(false)}>No</button>
                <div class="separator" />
                <button on:click={() => click(true)}>Yes</button>
            </div>
        </div>
    </div>
</Backdrop>
