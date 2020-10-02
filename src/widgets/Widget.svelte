<script>
    import Table from "./Table";

    export let title;
    export let content;

    const storage = {
        save: (key, value) => {
            localStorage.setItem(
                "widget." + content.id + "." + key,
                JSON.stringify(value)
            );
        },
        get: (key) => {
            console.log("widget." + content.id + "." + key);
            return JSON.parse(
                localStorage.getItem("widget." + content.id + "." + key)
            );
        },
    };
</script>

{#if content != null}
    {#if content.name == 'Table'}
        <Table
            {title}
            dataSource={content.data_source}
            params={content.params}
            {storage} />
    {/if}
{/if}
