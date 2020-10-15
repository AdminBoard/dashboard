<script>
    export let session;
    export let page;
    export let properties;
    export let data;
</script>

<style lang="scss">
    .component {
        text-align: left;
        margin: 8px;
        height: calc(100%-1em);
        max-width: 256px;
        min-width: 128px;
        & > div {
            &:first-child {
                z-index: 1;
                font-weight: 600;
                margin: 0 4px;
                & span {
                    background-color: #eee;
                    padding: 0 2px;
                }
            }
            &:last-child {
                border: 1px solid #ccc;
                border-radius: 8px;
                transform: translateY(calc(-1em+6px));
                padding: 12px 8px 8px 8px;
            }
        }
    }
</style>

<div class="component column">
    <div><span>{properties.label}</span></div>
    <div>{data[properties.id]}</div>
</div>
