<script lang="ts">
    import Card from "@smui/card";
    import Textfield from "@smui/textfield";
    import Button, { Label } from "@smui/button";
    import HelperText from "@smui/textfield/helper-text/index";
    import snackbar from "$lib/snackbar";
    import { post } from "$lib/api";

    let server = { port: 8000 };

    let db = {
        host: "localhost",
        port: 3306,
        username: "",
        password: "",
        rpassword: "",
        name: "",
    };

    function submit() {
        post("/a/setup_config", { server: server, db: db }).then((resp) => {
            if (resp.status == 0) {
            } else snackbar.notify(resp.message);
        });
    }
</script>

<div class="container row vcenter center">
    <div class="content">
        <h1>Setup</h1>
        <Card variant="outlined" padded>
            <div class="title">Server</div>
            <Textfield bind:value={server.port} label="Port" class="port">
                <HelperText slot="helper" persistent>
                    Port this adminboard will running
                </HelperText>
            </Textfield>
        </Card>
        <Card variant="outlined" padded>
            <div class="title">Database</div>
            <div class="row">
                <Textfield bind:value={db.host} label="Hostname" />
                <Textfield bind:value={db.port} label="Port" class="port" />
            </div>
            <Textfield bind:value={db.username} label="Username" />
            <Textfield
                bind:value={db.password}
                type="password"
                label="Password"
            />
            <Textfield
                bind:value={db.rpassword}
                type="password"
                label="Repeat Password"
            />
            <Textfield bind:value={db.name} label="Name" />
            <Button on:click={submit} variant="raised">
                <Label>Continue</Label>
            </Button>
        </Card>
    </div>
</div>

<style lang="scss">
    @import "../../styles/flex";

    .container {
        min-height: 100vh;
    }
    .content {
        max-width: 800px;
        min-width: 480px;
        & .title {
            font-weight: bold;
            font-size: 1.1em;
        }

        & :global(.port) {
            width: 96px;
        }
    }
</style>
