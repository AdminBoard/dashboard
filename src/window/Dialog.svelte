<script context="module">
    import { writable } from "svelte/store";
    import { pageById } from "../Api.svelte";
    import Snackbar from "../snackbar/Snackbar.svelte";
    import Widget from "../widgets/Widget.svelte";

    import Modal from "./Modal.svelte";

    let widgets = writable([]);
    let data;
    let modal;

    export function open(action) {
        data = action.data;
        modal.open();

        if (action.page_id != null) {
            widgets.set([]);
            pageById(action.page_id)
                .then((resp) => {
                    widgets.set(resp.widgets);
                })
                .catch((e) => {
                    Snackbar.open(e);
                    modal.dismiss();
                });
        }
    }
    export function fromRight() {}
    export function dismiss() {}
</script>

<script>
    export let window;
</script>

<Modal bind:this={modal}>
    <div class="component">
        {#each $widgets as line}
            <div class="row">
                {#each line as widget}
                    <div class="fill">
                        <Widget {window} {data} content={widget} />
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</Modal>
