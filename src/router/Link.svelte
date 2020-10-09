<script>
    import { createEventDispatcher } from "svelte";
    import { navigate} from '/function';

    export let href;

    let dispatch = createEventDispatcher();

    function click() {
        navigate(href);
        dispatch("click", href);
    }
</script>

<a
    {href}
    on:click|preventDefault|stopPropagation={click}
    class="fill"><slot /></a>
