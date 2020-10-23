<script context="module">
    import { writable } from "svelte/store";
    import Modal from "./Modal.svelte";

    const message = writable("");
    let resolveF;
    let modal;

    export function confirm(msg) {
        console.log("confirm", msg);
        return new Promise((resolve) => {
            modal.open();
            message.set(msg);
            resolveF = resolve;
        });
    }
</script>

<script>
    function click(yes) {
        resolveF(yes);
        modal.dismiss();
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

<Modal bind:this={modal} modal>
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
</Modal>
