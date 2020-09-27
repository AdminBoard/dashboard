<script>
  import { Page } from "./Router.svelte";
  import { session } from "./Session.svelte";
  import Sidebar from "./sidebar/component.svelte";

  import Drawer, {
    AppContent,
    Content,
    Header,
    Title,
    Subtitle,
    Scrim,
  } from "@smui/drawer";
</script>

{#if $session == null}
  loading...
{:else if $session.id == ''}
  <svelte:component this={Page()} />
{:else}
  <div class="drawer-container">
    <Drawer>
      <Content>
        <Sidebar />
      </Content>
    </Drawer>
    <AppContent class="app-content">
      <svelte:component this={Page()} />
    </AppContent>
  </div>
{/if}
