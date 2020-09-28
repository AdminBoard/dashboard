<script>
    import Router from "./index";
    export let href;

    function click() {
        Router.navigate(href);
    }
</script>

<a {href} on:click|preventDefault={click}><slot /></a>
