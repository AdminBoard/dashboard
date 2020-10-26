<script>
    import { onDestroy } from "svelte";

    import { pageByPath } from "../Api.svelte";
    import Router from "../router";
    import Widget from "../widgets/Widget.svelte";
    import { window } from "../window";

    let widgets;

    onDestroy(() => {
        window.dialog.dismiss();
    });

    pageByPath(window.path)
        .then((resp) => {
            if (resp.status == 0) {
                window.page.title = resp.data.title;
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
    {#if window.page.title != ''}
        <title>AB :: {window.page.title}</title>
    {/if}
</svelte:head>

<main>
    {#if widgets != null}
        {#each widgets as line}
            <div class="line">
                {#each line as widget}
                    <div class="widget">
                        <Widget {window} content={widget} />
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</main>
