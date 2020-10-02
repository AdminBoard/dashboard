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

  function toggleExpand() {}

  init();
</script>

<style lang="scss">
  @import "../style/color";
  .title {
    background-color: darken($col-primary, 20);
    height: 76px;
    vertical-align: middle;
    font-size: 1.4em;

    &:hover {
      background-color: darken($col-primary, 10);
    }
  }
</style>

<div class="column stretch">
  <div class="title column stretch">
    <Link href="/home" class="fill row center">
      <div>Adminboard</div>
    </Link>
  </div>
  {#each menu as m}
    <Menu bind:data={m} bind:expand={expand[m.id]} />
  {/each}
</div>
