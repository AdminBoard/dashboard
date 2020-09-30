<script>
    import { onMount } from "svelte";

    import { onChange } from "./index";

    onMount(() => {
        onChange.subscribe((page) => {
            if (currPage == page) unique = {};
            else currPage = page;
        });
    });
    let currPage;
    let unique;
</script>

{#key unique}
    <svelte:component this={currPage} />
{/key}
