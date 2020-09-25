<script context="module">
  import router from "page";
  import Home from "./Home.svelte";

  let page;

  export function Page() {
    return page;
  }

  router("/", () => router.redirect("/home"));
  router("/home", () => (page = Home));

  router.start();
</script>
