<script>
    import { createEventDispatcher } from "svelte";

    import Router from "./index";
    export let href;

    let dispatch = createEventDispatcher();

    function click() {
        Router.navigate(href);
        dispatch("click", href);
    }
</script>

<a
    {href}
    on:click|preventDefault|stopPropagation={click}
    class="fill"><slot /></a>
