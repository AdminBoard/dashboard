<script>
  import { Link } from "../router";

  export let data = { caption: "", kind: "" };

  export let expand = false;
  export { clazz as class };
  let clazz;
</script>

<style lang="scss">
  @import "../style/color";
  .menu {
    cursor: pointer;
    border-radius: 8px;
    padding: 8px;
    transition: all 200ms ease-out;
    margin: 0 8px;

    &:hover {
      background-color: darken($col-secondary, 10);
    }
    &:active {
      background-color: lighten($col-secondary, 10);
    }
    &.child {
      padding-left: 16px;
    }
  }

  .group {
    border: 1px solid transparentize(#fff, 0.9);
    margin: 0 8px;
    border-radius: 8px;
    & .menu {
      margin: 0;
    }
  }
  .children {
    height: 0;
    overflow: hidden;

    &.expand {
      height: auto;
    }
  }
</style>

{#if data.kind == 'page'}
  <div class="menu {clazz}">
    <Link href={data.path}>
      <div class="label">{data.caption}</div>
    </Link>
  </div>
{:else if data.kind == 'group'}
  <div class="group">
    <div
      class="menu row center"
      on:click|stopPropagation={() => (expand = !expand)}>
      <div class="label">{data.caption}</div>
      <div class="fill" />
      <i class="material-icons">
        {#if expand}keyboard_arrow_up{:else}keyboard_arrow_down{/if}
      </i>
    </div>
    <div class="children" class:expand>
      {#each data.submenu as m}
        <svelte:self bind:data={m} class="child" />
      {/each}
    </div>
  </div>
{:else}{data.caption}{/if}
