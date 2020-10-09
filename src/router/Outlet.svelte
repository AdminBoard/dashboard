<script>
    import { onMount } from "svelte";

    import { onChange } from "./function";

    onMount(() => {
        onChange.subscribe((page) => {
            if (activePage != page) activePage = page;
            else unique = {};
        });
    });

    let activePage;
    let unique;
</script>

{#key unique}
    <svelte:component this={activePage} />
{/key}
