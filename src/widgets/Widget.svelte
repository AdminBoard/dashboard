<script>
    import Table from "./Table";

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
    {/if}
{/if}
