<script>
    import { createEventDispatcher } from "svelte";
    import { getWidget } from "../widgets";

    export let content; //content of admin_page_widget
    export let data = null;

    let dispatch = createEventDispatcher();

    const prefs = {
        set: (key, value) => {
            sessionStorage.setItem(
                "widget." + content.id + "." + key,
                JSON.stringify(value)
            );
        },
        get: (key) => {
            return JSON.parse(
                sessionStorage.getItem("widget." + content.id + "." + key)
            );
        },
    };
</script>

{#if content != null}
    <svelte:component
        this={getWidget(content.name)}
        {prefs}
        {data}
        properties={content.properties}
        on:select={(ev) => dispatch('action', ev.detail)} />
{/if}
