<script>
    import { formatDate, formatNumber, formatMap } from "./formatter";
    export let value;
    export let label = value;
    export let format;
    export let map;

    function parseLabel() {
        if (value == null) {
            label = "";
        } else if (format != null && format != "") {
            let command = format;
            let subcommand = "";
            let idx = format.indexOf(" ");
            if (idx >= 0) {
                command = format.substr(0, idx);
                subcommand = format.substr(idx + 1, format.length);
            }
            switch (command) {
                case "number":
                    label = formatNumber(value);
                    break;
                case "date":
                    label = formatDate(value, subcommand);
                    break;
            }
        } else if (map != null) label = formatMap(value, map);
    }

    parseLabel();
</script>

{label}
