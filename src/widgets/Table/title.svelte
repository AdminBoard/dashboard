<script>
    import Menu from "./menu.svelte";
    import Select, { Option } from "@smui/select";

    export let caption;
    export let filteredColumns = [];
    console.log(filteredColumns);
</script>

<style lang="scss">
    @import "../../theme/color";

    .title {
        display: flex;
        align-items: stretch;
        font-size: 1.2em;
        background-color: $primary;
        color: $primary-text;
        height: 42px;
        & .caption {
            padding: 8px;
            display: flex;
            align-items: center;
            margin-right: 16px;
        }
    }
</style>

{#if caption != null}
    <div class="title">
        <div class="caption">{caption}</div>
        <Menu icon="search" tooltip="Filter">
            <Select>
                {#each filteredColumns as col}
                    <Option>
                        <div>{col.label}</div>
                    </Option>
                {/each}
            </Select>
        </Menu>
    </div>
{/if}
