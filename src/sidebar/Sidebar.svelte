<script>
  import { Post } from "../Api.svelte";
  import Menu from "./Menu.svelte";
  import { Link } from "../router";

  let menu = [];

  Post("/api?menu")
    .then((resp) => {
      if (resp.status == 0) menu = resp.data;
    })
    .catch((e) => console.log(e));
</script>

<style lang="scss">
  // .container {
  //   height: 100vh;
  //   width: 100%;
  //   position: fixed;
  //   background-color: var(--mdc-theme-primary);

  //   & .submenu {
  //     margin-left: 16px;
  //   }
  // }
</style>

<div class="container padding">
  <Link href="/home">Adminboard</Link>
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
