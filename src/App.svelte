<script>
  import { Router, Route } from "svelte-routing";
  import { session } from "./Session.svelte";
  import Sidebar from "./sidebar";
  import Home from "./pages/Home.svelte";
  import PageRenderer from "./pages/PageRenderer.svelte";
  import Drawer, { AppContent, Content } from "@smui/drawer";

  export let url = "";
</script>

{#if $session == null}
  loading...
{:else}
  <Router {url}>
    <div class="drawer-container">
      <Drawer>
        <Content>
          <Sidebar />
        </Content>
      </Drawer>
      <AppContent class="app-content">
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <PageRenderer />
        </Route>
      </AppContent>
    </div>
  </Router>
{/if}
