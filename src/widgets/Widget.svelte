<script>
    import Table from "./Table";

    export let content;
</script>

{#if content != null}
    {#if content.name == 'Table'}
        <Table dataSource={content.data_source} params={content.params} />
    {/if}
{/if}
