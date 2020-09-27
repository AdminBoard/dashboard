<script context="module">
  export async function Post(url, data) {
    const resp = await fetch(url, { method: "POST", body: data });
    const js = await resp.json();
    return js;
  }
</script>
