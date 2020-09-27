<script>
  import Ripple from "@smui/ripple";
  export let data = { caption: "", kind: "" };
  // export let caption;
</script>

<style lang="scss">
  @import "../theme/color";
  .menu {
    &.page {
      cursor: pointer;
      &:hover {
        background-color: $primary-dark;
      }
    }
    padding: 8px;
    border-radius: 8px;

    & a {
      color: $primary-dark-text;
      text-decoration: none;
    }
  }
</style>

{#if data.kind == 'page'}
  <div class="menu page" use:Ripple={{ ripple: true, color: 'secondary' }}>
    <a href={data.path}> {data.caption} </a>
  </div>
{:else if data.kind == 'group'}
  <div class="menu">{data.caption}</div>
{:else}{data.caption}{/if}
