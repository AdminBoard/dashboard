<script>
    import { get, pageByPath } from "../Api.svelte";
    import Router from "../router";
    import Widget from "../widgets/Widget.svelte";
    import { openContentPage } from "../Content.svelte";

    let path = window.location.pathname;

    let title;
    let widgets;

    pageByPath(path)
        .then((resp) => {
            if (resp.status == 0) {
                title = resp.data.title;
                widgets = resp.data.widgets;
            } else Router.navigate("/not-found");
        })
        .catch((e) => console.log(e));
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

<svelte:head>
    {#if title != null}
        <title>AB :: {title}</title>
    {/if}
</svelte:head>

{#if widgets != null}
    {#each widgets as line}
        <div class="line">
            {#each line as widget}
                <div class="widget">
                    <Widget
                        {title}
                        content={widget}
                        on:action={(ev) => openContentPage(ev.detail)} />
                </div>
            {/each}
        </div>
    {/each}
{/if}
