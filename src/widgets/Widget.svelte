<script>
    import Table from "./Table";
    import Topbar from "./Topbar.svelte";

    export let content;
</script>

{#if content != null}
    {#if content.name == 'Table'}
        <Table dataSource={content.data_source} params={content.params} />
    {:else if content.name == 'Topbar'}
        <Topbar params={content.params} />
    {/if}
{/if}
