<script>
  import { Link } from "../router";

  export let data = { caption: "", kind: "" };

  let className = "";
  export { className as class };

  export let expand = false;
</script>

<style lang="scss">
  @import "../style/color";
  .menu {
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid transparentize(#fff, 0.95);

    &.page {
      padding: 6px 8px;

      &:hover {
        box-shadow: 0 0 4px $col-secondary;
      }
      &:active {
        background-color: $col-secondary;
      }
    }

    &.group {
      & .title {
        padding: 6px 8px;
        flex: 1;
        text-align: left;
        &:hover {
          border-radius: 8px;
          box-shadow: 0 0 4px $col-secondary;
        }
      }
    }
    &.child {
      border: 2px solid transparentize(#fff, 0.95);
      margin: 2px 4px;
    }
  }
</style>

{#if data.kind == 'page'}
  <Link href={data.path}>
    <div class="menu page row center {className}">
      <div>{data.caption}</div>
    </div>
  </Link>
{:else if data.kind == 'group'}
  <div
    class="menu group column stretch"
    class:expand
    on:click|stopPropagation={() => (expand = !expand)}>
    <div class="row center">
      <div class="title row center">
        <div class="fill">{data.caption}</div>
        <i class="material-icons">
          {#if expand}keyboard_arrow_up{:else}keyboard_arrow_down{/if}
        </i>
      </div>
    </div>
    {#if expand}
      {#each data.submenu as m}
        <svelte:self bind:data={m} class="child" />
      {/each}
    {/if}
  </div>
{:else}{data.caption}{/if}
