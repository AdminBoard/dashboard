<script>
    import { post } from "../Api.svelte";
    import sha1 from "crypto-js/sha1";
    import hex from "crypto-js/enc-hex";
    import Router from "../router";
    import Snackbar from "../snackbar";

    let username = "";
    let password = "";

    let loading = false;

    function click() {
        let u = username.trim();
        let p = password.trim();
        if (u == "" || p == "") return;
        loading = true;
        const hashUser = sha1(u).toString(hex);
        const hashPass = sha1(p).toString(hex);

        let signature = sha1(hashUser + hashPass).toString(hex);
        let time = Math.round(Date.now() / 1000);
        signature = sha1(signature + time).toString(hex);

        post("/api/public?login", {
            username: u,
            signature: signature,
            time: time,
        })
            .then((resp) => {
                if (resp.status == 0) {
                    sessionStorage.clear();
                    localStorage.clear();
                    Router.navigate("/home");
                    Router.reload();
                } else Snackbar.open(resp.message);
            })
            .catch((e) => Snackbar.open(e))
            .finally(() => (loading = false));
    }
</script>

<style lang="scss">
    @import "../style/color";

    main {
        height: 100vh;
        width: 100vw;
        background-color: darken($col-primary, 20);
    }
    .form {
        box-shadow: 0 0 8px 8px transparentize(#000000, 0.8);
        background-color: darken($col-primary-text, 10);
        color: #444;
        font-weight: 600;

        & .title {
            color: darken($col-primary, 10);
            text-shadow: 0 0 8px transparentize(#000000, 0.8);
            font-size: 1.2em;
            font-weight: bold;
        }

        & > div {
            margin: 8px 0;
        }
        & input {
            font-size: 1em;
            font-weight: bold;
            color: #333;
            width: 240px;
            margin: 2px 4px;
        }
        & button {
            width: 100px;
        }
    }
</style>

<main class="row center">
    <div class="column center">
        <div class="form column stretch rounded">
            <div class="title">Adminboard</div>
            <table>
                <tr>
                    <td>Username</td>
                    <td>
                        :
                        <input
                            type="text"
                            bind:value={username}
                            disabled={loading} />
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        :
                        <input
                            type="password"
                            bind:value={password}
                            disabled={loading} />
                    </td>
                </tr>
            </table>
            <div>
                <button
                    class="primary"
                    on:click={click}
                    disabled={loading}>Login</button>
            </div>
        </div>
    </div>
</main>
