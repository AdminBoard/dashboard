<script>
    import { createEventDispatcher } from "svelte";

    import Table from "./Table";

    export let title = null;
    export let content; //content of admin_page_widget
    export let data = null;

    let dispatch = createEventDispatcher();

    const storage = {
        save: (key, value) => {
            localStorage.setItem(
                "widget." + content.id + "." + key,
                JSON.stringify(value)
            );
        },
        get: (key) => {
            return JSON.parse(
                localStorage.getItem("widget." + content.id + "." + key)
            );
        },
    };
    console.log(content, data);
</script>

<style lang="scss">
    .label {
        text-align: left;
        margin: 8px;
        height: calc(100%-1em);
        max-width: 256px;
        min-width: 128px;
        & > div {
            &:first-child {
                z-index: 1;
                font-weight: 600;
                margin: 0 4px;
                & span {
                    background-color: #eee;
                    padding: 0 2px;
                }
            }
            &:last-child {
                border: 1px solid #ccc;
                border-radius: 8px;
                transform: translateY(calc(-1em+6px));
                padding: 12px 8px 8px 8px;
            }
        }
    }
</style>

{#if content != null}
    {#if content.name == 'Table'}
        <Table
            {title}
            dataSource={content.data_source}
            params={content.params}
            selectable={content.params.select != null}
            on:select={(ev) => dispatch('action', ev.detail)}
            {storage} />
    {:else if content.name == 'Label'}
        <div class="label column">
            <div><span>{content.params.label}</span></div>
            <div>{data[content.params.id]}</div>
        </div>
    {/if}
{/if}
