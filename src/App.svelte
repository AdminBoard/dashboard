<script>
  import Router, { RouterOutlet } from "./router";
  import { Get } from "./Api.svelte";
  import Sidebar from "./sidebar";
  import Home from "./pages/Home.svelte";
  import Page from "./pages/Page.svelte";
  import Login from "./pages/Login.svelte";

  let session = null;
  let refresh;

  Router.register("/login", Login);
  Router.register("/home", Home);
  Router.register("*", Page);

  //check session
  Get("/api/public?session").then((resp) => {
    if (resp.status != 0 || resp.data == null) {
      Router.navigate("/login");
    } else {
      session = resp.data;
      Router.start();
      refresh = setInterval(() => {
        Get("/api/public?session");
      }, 1 * 60 * 1000);
    }
  });
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
    background-color: darken($col-primary, 12);
  }
  .content {
    flex: 1;
    margin-left: 256px;
  }
</style>

{#if session == null}
  <RouterOutlet />
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
