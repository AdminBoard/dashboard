<script>
    import { onMount } from "svelte";
    import Spinner from "../widgets/Spinner";

    import { onChange } from "./function";
    import Page from "../page";

    let activePage;
    let unique;
    let loading = true;

    onMount(() => {
        onChange.subscribe((page) => {
            Page.ready.set(false);
            if (activePage != page) activePage = page;
            else unique = {};
        });
    });

    Page.onReady.subscribe((state) => (loading = !state));
</script>

<style lang="scss">
    .loading {
        position: fixed;
        height: 100vh;
        width: calc(100vw - 256px);
        left: 256px;
        top: 0;
        background-color: #fff;
        justify-content: center;
        visibility: hidden;
        opacity: 0;
        z-index: 1;
        transition: all 400ms ease-out;
        &.show {
            visibility: visible;
            opacity: 1;
            transition: all 400ms ease-out;
        }
    }
    .content {
        opacity: 0;
        visibility: hidden;
        transform: translate(64px, 64px);
        transition: all 200ms ease-out;
        &.show {
            opacity: 1;
            visibility: visible;
            transform: none;
            transition: all 200ms ease-out;
        }
    }
</style>

{#key unique}
    <div class="content" class:show={!loading}>
        <svelte:component this={activePage} />
    </div>
{/key}
<div class="loading row center" class:show={loading}>
    <Spinner />
</div>
