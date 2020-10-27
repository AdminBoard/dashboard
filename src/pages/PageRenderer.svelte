<script>
    import { onDestroy } from "svelte";

    import { pageByPath } from "../Api.svelte";
    import Router from "../router";
    import Page from "../page";
    import Renderer from "../widgets/Renderer.svelte";
    import Dialog from "../dialog";
    import Session from "../../session";

    let widgets;

    onDestroy(() => {
        Dialog.dismiss();
    });

    pageByPath(Router.path())
        .then((resp) => {
            switch (resp.status) {
                case 0:
                    Page.title = resp.data.title;
                    widgets = resp.data.widgets;
                    break;
                case 401:
                    Session.clear();
                default:
                    Router.navigate("/not-found");
            }
        })
        .catch((e) => console.log(e));
</script>

<svelte:head>
    {#if Page.title != ''}
        <title>AB :: {Page.title}</title>
    {/if}
</svelte:head>

<main>
    {#if widgets != null}
        <Renderer {widgets} />
    {/if}
</main>
