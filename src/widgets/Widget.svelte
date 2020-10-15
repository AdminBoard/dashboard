<script context="module">
    let widgetMap = {};

    export function register(name, widget) {
        widgetMap[name] = widget;
    }
</script>

<script>
    import { createEventDispatcher } from "svelte";

    export let page = { title: null };
    export let content; //content of admin_page_widget
    export let data = null;

    let dispatch = createEventDispatcher();

    const session = {
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
        this={widgetMap[content.name]}
        {session}
        {page}
        {data}
        properties={content.properties}
        on:select={(ev) => dispatch('action', ev.detail)} />
{/if}
