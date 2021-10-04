<script lang="ts">
    import Card, { Content } from "@smui/card";
    import Textfield from "@smui/textfield/Textfield.svelte";
    import Button from "@smui/button";

    var username = "";
    var password = "";
</script>

<div class="form">
    <Card>
        <Content>
            <div class="col">
                <Textfield bind:value={username} label="Username" />
            </div>
            <div class="col">
                <Textfield
                    type="password"
                    bind:value={username}
                    label="Password"
                />
            </div>
            <div class="col button">
                <Button>Login</Button>
            </div>
        </Content>
    </Card>
</div>

<style lang="scss">
    .form {
        width: 320px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .col {
        margin: 8px 16px;
    }
</style>
