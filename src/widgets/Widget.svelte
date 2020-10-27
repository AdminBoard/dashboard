<script>
    import { createEventDispatcher } from "svelte";
    import { getWidget } from "../widgets";

    export let content; //content of admin_page_widget
    export let data = null;

    let dispatch = createEventDispatcher();
</script>

{#if content != null}
    <svelte:component
        this={getWidget(content.name)}
        {data}
        properties={content.properties}
        on:select={(ev) => dispatch('action', ev.detail)} />
{/if}
