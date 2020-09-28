<script>
  import Ripple from "@smui/ripple";
  import { Link } from "../router";

  export let data = { caption: "", kind: "" };
</script>

<style lang="scss">
  @import "../theme/color";
  .menu {
    padding: 8px;
    border-radius: 8px;
    &.page {
      cursor: pointer;
      &:hover {
        background-color: $primary-dark;
      }
    }
  }
  :global(.menu a) {
    color: $primary-dark-text;
    text-decoration: none;
  }
</style>

{#if data.kind == 'page'}
  <div class="menu page" use:Ripple={{ ripple: true, color: 'secondary' }}>
    <Link href={data.path}>{data.caption}</Link>
  </div>
{:else if data.kind == 'group'}
  <div class="menu">{data.caption}</div>
{:else}{data.caption}{/if}
