<script context="module">
  let pageCache = {};

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
      const cache = pageCache[id];
      if (!cache) {
        get("/api?page_id=" + id)
          .then((resp) => {
            if (resp.status == 0) {
              pageCache[id] = resp.data;
              resolve(resp.data);
            } else reject(resp);
          })
          .catch((e) => reject(e));
      } else {
        resolve(cache);
      }
    });
  }
</script>
