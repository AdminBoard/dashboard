<script>
  import { Post } from "../Api.svelte";
  import Menu from "./Menu.svelte";
  import { Link } from "../router";

  let menu = [];

  let expand = {};
  $: localStorage.setItem("expand", JSON.stringify(expand));

  function init() {
    const ex = localStorage.getItem("expand");
    if (ex != null) expand = JSON.parse(ex);

    Post("/api?menu")
      .then((resp) => {
        if (resp.status == 0) menu = resp.data;
      })
      .catch((e) => console.log(e));
  }

  init();
</script>

<style lang="scss">
  @import "../style/color";

  .menus {
    padding: 8px;

    & > .item {
      margin-top: 8px;
    }
  }
  .title {
    background-color: darken($col-primary, 20);
    height: 60px;
    padding: 8px;
    vertical-align: middle;
    font-size: 1.4em;

    & .caption {
      height: 100%;
    }

    &:hover {
      background-color: darken($col-primary, 10);
    }
  }
</style>

<div class="sidebar column stretch">
  <div class="title column stretch">
    <Link href="/home">
      <div class="caption row center">
        <div>Adminboard</div>
      </div>
    </Link>
  </div>
  <div class="menus column stretch">
    {#each menu as m}
      <div class="item">
        <Menu bind:data={m} bind:expand={expand[m.id]} />
      </div>
    {/each}
  </div>
</div>
