<script>
    import { createEventDispatcher } from "svelte";

    import Chips from "../Chips.svelte";

    import Filter from "./filter.svelte";

    import Menu from "./menu.svelte";

    export let sticky;
    export let color;
    export let title;
    export let columns;
    export let filterCols;
    export let filterParam;
    export let sortParam;

    let dispatch = createEventDispatcher();
    let selectedFilters = [];

    function addFilterLabel(col, value) {
        selectedFilters = selectedFilters.filter((el) => el.id != col.id);
        filterParam[col.id] = { value: value, filter: col.filter };
        let label = col.label + ": ";
        if (col.map == null) label += value;
        else label += col.map[value];
        selectedFilters = [...selectedFilters, { id: col.id, label: label }];
    }

    function addFilter(ev) {
        const col = ev.detail.column;
        const val = ev.detail.value;
        addFilterLabel(col, val);
        dispatch("reload");
    }

    function deleteFilter(ev) {
        const item = ev.detail;
        delete filterParam[item.id];
    }

    function sort(col) {
        if (col.id != sortParam.active) {
            sortParam = { active: col.id, direction: "asc" };
        } else {
            if (sortParam.direction == "asc") sortParam.direction = "desc";
            else sortParam = {};
        }
        dispatch("reload");
    }
</script>

<style lang="scss">
    @import "../../style/color";

    thead {
        &.sticky {
            top: 0;
            & th,
            td {
                position: sticky;
                text-align: center;
            }
        }

        & th,
        td {
            height: 32px;
            background-color: #ddd;
        }

        & th {
            top: 0;
            height: 42px;
            z-index: 1;
            &.primary {
                background-color: $col-primary;
                color: $col-primary-text;
            }
        }

        & td {
            &:not(.notitle) {
                top: 43px;
            }
            &.notitle {
                top: 0;
            }
            &.primary {
                background-color: lighten($col-primary, 3);
                text-shadow: 0 0 4px #000;
                color: $col-primary-text;
            }

            & i {
                font-size: 1em;
            }

            & .sort {
                cursor: pointer;
                &:hover {
                    text-shadow: 0 0 8px $col-secondary;
                }
            }
        }
    }
</style>

<thead class:sticky class:primary={color == 'primary'}>
    {#if title != null}
        <tr>
            <th colspan={columns.length} class:primary={color == 'primary'}>
                <div class="row center">
                    <div class="caption padding">{title}</div>
                    <Menu let:dismiss icon="search">
                        <Filter
                            columns={filterCols}
                            {dismiss}
                            on:select={addFilter} />
                    </Menu>
                    <Chips
                        bind:items={selectedFilters}
                        on:delete={deleteFilter} />
                </div>
            </th>
        </tr>
    {/if}
    <tr>
        {#each columns as col}
            <td
                class:notitle={title == null}
                class:primary={color == 'primary'}>
                {#if col.sortable}
                    <span class="sort" on:click={sort(col)}>
                        {col.label}
                        {#if col.id == sortParam.active}
                            <i class="material-icons">
                                {#if sortParam.direction == 'asc'}
                                    keyboard_arrow_down
                                {:else}keyboard_arrow_up{/if}
                            </i>
                        {/if}
                    </span>
                {:else}{col.label}{/if}
            </td>
        {/each}
    </tr>
</thead>
