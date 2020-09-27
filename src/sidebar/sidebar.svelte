<script>
  import { Post } from "../Api.svelte";
  import Menu from "./menu.svelte";

  let menu = [];

  Post("/api?menu")
    .then((resp) => {
      if (resp.status == 0) menu = resp.data;
    })
    .catch((e) => console.log(e));
</script>

<style lang="scss">
  @import "../theme/color";

  .list {
    height: calc(100%-16px);
    // background-color: $primary-dark;
    color: #fff;
    padding: 8px;

    & .submenu {
      margin-left: 16px;
    }
  }
</style>

<div class="list">
  {#each menu as m}
    {#if m.kind == 'group'}
      <Menu bind:data={m} />
      <div class="submenu">
        {#each m.submenu as sm}
          <Menu bind:data={sm} />
        {/each}
      </div>
    {:else}
      <Menu bind:data={m} />
    {/if}
  {/each}
</div>
