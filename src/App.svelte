<script>
  import { Outlet } from "./router";
  import Sidebar from "./sidebar";
  import Snackbar from "./snackbar/Snackbar.svelte";
  import Confirm from "./window/Confirm.svelte";
  import Session from "./session";
  import Dialog from "./window/Dialog.svelte";
  import Renderer from "./widgets/Renderer.svelte";

  let state;
  Session.onChange.subscribe((s) => {
    state = s;
  });

  Session.validate();
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

{#if state}
  <div class="app component row">
    <aside class="primary-bg">
      <Sidebar />
    </aside>
    <div class="content">
      <Outlet />
    </div>
  </div>
{:else if state === false}
  here
  <Outlet />
{:else}Loading...{/if}
<Dialog />
<Confirm />
<Snackbar />
