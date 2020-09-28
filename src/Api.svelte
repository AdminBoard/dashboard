<script context="module">
  export async function Post(url, data) {
    const resp = await fetch(url, { method: "POST", body: data });
    const js = await resp.json();
    return js;
  }
  export async function Get(url) {
    const resp = await fetch(url, { method: "GET" });
    const js = await resp.json();
    return js;
  }
</script>
