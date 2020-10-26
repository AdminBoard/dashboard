<script>
    import Widget from "./Widget.svelte";

    export let widgets = [];
    export let data = null;
</script>

<style lang="scss">
    .line {
        align-items: stretch;
        display: flex;
        & .widget {
            flex: 1;
        }
    }
</style>

{#each widgets as line}
    <div class="line">
        {#each line as widget}
            <div class="widget">
                <Widget content={widget} {data} />
            </div>
        {/each}
    </div>
{/each}
