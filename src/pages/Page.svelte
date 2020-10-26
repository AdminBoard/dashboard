<script>
    import { onDestroy } from "svelte";

    import { pageByPath } from "../Api.svelte";
    import Router from "../router";
    import Widget from "../widgets/Widget.svelte";
    import { window } from "../window";

    let widgets;

    let page = {
        title: null,
        path: Router.pathname,
    };

    onDestroy(() => {
        window.popup.dismiss();
    });

    pageByPath(page.path)
        .then((resp) => {
            if (resp.status == 0) {
                page.title = resp.data.title;
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
    {#if page.title != null}
        <title>AB :: {page.title}</title>
    {/if}
</svelte:head>

<main>
    {#if widgets != null}
        {#each widgets as line}
            <div class="line">
                {#each line as widget}
                    <div class="widget">
                        <Widget {page} {window} content={widget} />
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</main>
