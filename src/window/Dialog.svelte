<script context="module">
    import { writable } from "svelte/store";
    import Api from "../api";
    import Snackbar from "../snackbar/Snackbar.svelte";
    import Renderer from "../widgets/Renderer.svelte";

    import Modal from "./Modal.svelte";

    let widgetStore = writable([]);
    let dataStore = writable(null);
    let modal;

    export function open(action) {
        dataStore.set(action.data);
        modal.open();

        if (action.page_id != null) {
            widgetStore.set([]);
            Api.pageById(action.page_id)
                .then((resp) => {
                    widgetStore.set(resp.widgets);
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
    let widgets;
    let data;
    widgetStore.subscribe((w) => (widgets = w));
    dataStore.subscribe((d) => (data = d));
</script>

<Modal bind:this={modal}>
    <div class="component">
        <Renderer {widgets} {data} />
    </div>
</Modal>
