<script>
    import { Get } from "../Api.svelte";
    import Router from "../router";

    let path = window.location.pathname;

    Get("/api?page=" + path)
        .then((resp) => {
            if (resp.status == 0) {
            } else {
                Router.navigate("/not-found");
            }
        })
        .catch((e) => console.log(e));

    console.log(path);
</script>
