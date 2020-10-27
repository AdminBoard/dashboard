<script>
  import { Outlet } from "./router";
  import Sidebar from "./sidebar";
  import Snackbar from "./snackbar/Snackbar.svelte";
  import Confirm from "./window/Confirm.svelte";
  import Session from "./session";
  import Dialog from "./window/Dialog.svelte";

  let state;
  Session.onChange.subscribe((s) => {
    state = s;
  });

  Session.validate();
</script>

<style lang="scss">
  @import "style/color";
  .app.component {
    height: 100vh;
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
    min-height: 100%;
    &.with-sidebar {
      margin-left: 256px;
    }
  }
</style>

{#if state == null}
  Loading...
{:else}
  <div class="app component row">
    {#if state}
      <aside class="primary-bg">
        <Sidebar />
      </aside>
    {/if}
    <div class="content" class:with-sidebar={state}>
      <Outlet />
    </div>
  </div>
{/if}
<Dialog />
<Confirm />
<Snackbar />
