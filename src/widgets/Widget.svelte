<script>
    import Table from "./Table";
    import Topbar from "./Topbar.svelte";

    export let title;
    export let content;
    export let page;
</script>

{#if content != null}
    {#if content.name == 'Table'}
        <Table
            {title}
            dataSource={content.data_source}
            params={content.params}
            {page} />
        <!-- {:else if content.name == 'Topbar'}
        <Topbar params={content.params} /> -->
    {/if}
{/if}
