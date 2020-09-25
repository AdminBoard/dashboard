<script>
  import { onMount } from "svelte";

  import { Page } from "./Router.svelte";
  import { isLogin } from "./Auth.svelte";

  import Drawer, {
    AppContent,
    Content,
    Header,
    Title,
    Subtitle,
    Scrim,
  } from "@smui/drawer";
</script>

{#if isLogin() === true}
  <Drawer variant="modal" open="true">
    <Content>Menu here</Content>
  </Drawer>
  <AppContent>
    <svelte:component this={Page()} />
  </AppContent>
{:else if isLogin() === false}
  <svelte:component this={Page()} />
{:else}Loading...{/if}
