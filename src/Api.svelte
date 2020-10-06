<script context="module">
  export async function post(url, data) {
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
  export async function get(url) {
    const resp = await fetch(url, { method: "GET" });
    const js = await resp.json();
    return js;
  }

  export async function pageByPath(path) {
    return get("/api?page=" + path);
  }

  export function pageById(id) {
    return new Promise((resolve, reject) => {
      get("/api?page_id=" + id)
        .then((resp) => {
          if (resp.status == 0) resolve(resp.data);
          else reject(resp);
        })
        .catch((e) => reject(e));
    });
  }
</script>

<script>
  import { resolve } from "path";
</script>
