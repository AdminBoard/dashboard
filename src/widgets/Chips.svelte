<script>
    import { createEventDispatcher } from "svelte";

    export let items = [];

    let dispatch = createEventDispatcher();
</script>

<style lang="scss">
    @import "../style/color";

    .container {
        & > div {
            height: 18px;
            padding: 4px 1px 4px 8px;
            border-radius: 16px;
            color: transparentize(#fff, 0.2);
            font-weight: normal;
            display: flex;
            flex-direction: row;
            align-items: center;
            border: 1px solid transparentize(#fff, 0.9);
            box-shadow: 0 0 4px transparentize(#000000, 0.7);
            & + div {
                margin-left: 4px;
            }
            cursor: default;
            & i {
                margin-left: 6px;
                cursor: pointer;
                color: transparentize(#fff, 0.9);
                border-radius: 16px;
                padding: 4px;
                font-size: 1em;
                box-shadow: 0 0 4px transparentize(#000000, 0.7);
            }
            &:hover {
                & i {
                    color: transparentize(#fff, 0.2);
                    box-shadow: 0 0 8px $col-secondary;
                }
            }
        }
    }
</style>

<div class="container row center">
    {#each items as item}
        <div>
            <div>{item.label}</div>
            <i
                class="material-icons"
                on:click={() => dispatch('delete', item)}>clear</i>
        </div>
    {/each}
</div>
