<script>
  import Router, { RouterOutlet, onChange } from "./router";
  import { session } from "./Session.svelte";
  import Sidebar from "./sidebar";
  import Drawer, { AppContent, Content } from "@smui/drawer";
  import Home from "./pages/Home.svelte";
  import Page from "./pages/Page.svelte";

  Router.register("/home", Home);
  Router.register("*", Page);
  Router.start();
</script>

<style lang="scss">
  @import "theme/color";
  :global(body) {
    background-color: $primary-dark;
  }
  :global(.drawer-container .content) {
    flex: 1;
    background-color: $primary-lite;
  }
</style>

{#if $session == null}
  loading...
{:else}
  <div class="drawer-container">
    <Drawer>
      <Content>
        <Sidebar />
      </Content>
    </Drawer>
    <AppContent class="content">
      <RouterOutlet />
    </AppContent>
  </div>
{/if}
