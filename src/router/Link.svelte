<script>
    import Router from "./index";
    export let href;
    export let className = "";
    export { className as class };

    function click() {
        Router.navigate(href);
    }
</script>

<a
    {href}
    on:click|preventDefault|stopPropagation={click}
    class={className}><slot /></a>
