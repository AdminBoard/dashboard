<script context="module">
  export async function Post(url, data) {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const js = await resp.json();
    return js;
  }
  export async function Get(url) {
    const resp = await fetch(url, { method: "GET" });
    const js = await resp.json();
    return js;
  }
</script>

<script>
  import { stringify } from "querystring";
</script>
