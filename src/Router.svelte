<script context="module">
  import router from "page";
  import Home from "./Home.svelte";

  export function Page() {
    return page;
  }

  let page;

  router("/", () => router.redirect("/home"));
  router("/home", () => (page = Home));

  router.start();
</script>
