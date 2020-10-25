<script>
  import { post } from "../Api.svelte";
  import Menu from "./Menu.svelte";
  import { Link } from "../router";

  let menu = [];

  let expand = {};
  $: localStorage.setItem("expand", JSON.stringify(expand));

  function init() {
    const ex = localStorage.getItem("expand");
    if (ex != null) expand = JSON.parse(ex);

    post("/api?menu")
      .then((resp) => {
        if (resp.status == 0) menu = resp.data;
      })
      .catch((e) => console.log(e));
  }

  init();
</script>

<style lang="scss">
  @import "../style/color";
  nav#sidebar {
    & ul {
      margin: 0;
      padding: 0;
      list-style-type: none;

      & li {
        margin: 0;
        padding: 0;

        &.header {
          background-color: darken($col-primary, 20);
          height: 60px;
          vertical-align: middle;
          font-size: 1.4em;
          align-items: center;
          margin-bottom: 8px;

          & div {
            padding: 8px;
          }
        }
      }
    }
  }
</style>

<nav id="sidebar">
  <ul>
    <li class="header row">
      <Link href="/home">
        <div>Adminboard</div>
      </Link>
    </li>
    {#each menu as m}
      <li>
        <Menu bind:data={m} bind:expand={expand[m.id]} />
      </li>
    {/each}
  </ul>
</nav>
