<script>
  import Router, { RouterOutlet } from "./router";
  import { session } from "./Session.svelte";
  import Sidebar from "./sidebar";
  import Home from "./pages/Home.svelte";
  import Page from "./pages/Page.svelte";

  Router.register("/home", Home);
  Router.register("*", Page);
  Router.start();
</script>

<style lang="scss">
  @import "style/color";
  .container {
    height: 100%;
  }
  .sidebar {
    width: 256px;
    position: fixed;
    height: 100%;
    background-color: darken($color: $col-primary, $amount: 12);
  }
  .content {
    flex: 1;
    margin-left: 256px;
  }
</style>

{#if $session == null}
  loading...
{:else}
  <div class="container row">
    <div class="sidebar primary-bg">
      <Sidebar />
    </div>
    <div class="content">
      <RouterOutlet />
    </div>
  </div>
{/if}
