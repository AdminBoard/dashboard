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

    &:not(.parent):active {
      background-color: $col-secondary;
    }

    &:not(.parent),
    .title {
      padding: 6px 8px;
    }
    &:not(.expand):hover {
      box-shadow: 0 0 4px $col-secondary;
    }
    border-radius: 8px;
    &:not(.child) {
      border: 2px solid transparentize(#fff, 0.95);
    }

    & .title {
      flex: 1;
      text-align: left;
    }

    & i {
      font-size: 1.2em;
    }
    & .children {
      padding: 0;
      margin-top: 8px;
    }
  }
</style>

{#if data.kind == 'page'}
  <Link href={data.path}>
    <div class="menu row center {className}">
      <div>{data.caption}</div>
    </div>
  </Link>
{:else if data.kind == 'group'}
  <div
    class="menu parent column stretch"
    class:expand
    on:click|stopPropagation={() => (expand = !expand)}>
    <div class="row center">
      <div class="title">{data.caption}</div>
      <i class="material-icons">
        {#if expand}keyboard_arrow_up{:else}keyboard_arrow_down{/if}
      </i>
    </div>
    {#if expand}
      <div class="children">
        {#each data.submenu as m}
          <svelte:self bind:data={m} class="child" />
        {/each}
      </div>
    {/if}
  </div>
{:else}{data.caption}{/if}
