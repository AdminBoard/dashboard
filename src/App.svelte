<script>
  import Router, { Renderer, onChange } from "./router";
  import { session } from "./Session.svelte";
  import Sidebar from "./sidebar";
  import Drawer, { AppContent, Content } from "@smui/drawer";
  import Home from "./pages/Home.svelte";

  console.log(Router);

  Router.register("/home", Home);
  Router.start();
</script>

{#if $session == null}
  loading...
{:else}
  <div class="drawer-container">
    <Drawer>
      <Content>
        <Sidebar />
      </Content>
    </Drawer>
    <AppContent>
      <Renderer />
    </AppContent>
  </div>
{/if}
