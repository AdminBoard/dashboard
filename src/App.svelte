<script>
  import Router, { Outlet } from "./router";
  import { get } from "./Api.svelte";
  import Sidebar from "./sidebar";
  import Home from "./pages/Home.svelte";
  import Page from "./pages/Page.svelte";
  import Login from "./pages/Login.svelte";
  import Popup from "./window/Popup.svelte";
  import Snackbar from "./snackbar/Snackbar.svelte";
  import Confirm from "./window/Confirm.svelte";

  import Widgets from "./widgets";
  import { window } from "./window";
  import Table from "./widgets/Table";
  import Label from "./widgets/Label";

  let session = null;

  Widgets.register("Table", Table);
  Widgets.register("Label", Label);

  Router.register("/login", Login);
  Router.register("/home", Home);
  Router.register("*", Page);

  function refreshSession() {
    setTimeout(() => {
      get("/api/public?session").then((resp) => {});
      refreshSession();
    }, 10 * 60 * 1000);
  }

  //check session
  get("/api/public?session").then((resp) => {
    if (resp.status != 0 || resp.data == null) {
      Router.navigate("/login");
    } else {
      session = resp.data;
      Router.start();
      refreshSession();
    }
  });
</script>

<style lang="scss">
  @import "style/color";
  .app.component {
    height: 100%;
  }
  aside {
    width: 256px;
    position: fixed;
    height: 100%;
    overflow-y: auto;
    background-color: darken($col-primary, 12);
  }
  .content {
    flex: 1;
    margin-left: 256px;
  }
</style>

{#if session == null}
  <Outlet />
{:else}
  <div class="app component row">
    <aside class="primary-bg">
      <Sidebar />
    </aside>
    <div class="content">
      <Outlet />
    </div>
  </div>
{/if}
<Popup {window} />
<Confirm />
<Snackbar />
