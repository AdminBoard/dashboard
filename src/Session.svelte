<script context="module">
  import { writable } from "svelte/store";
  export const session = writable();

  fetch("/api/public?session", { method: "POST" })
    .then((resp) => resp.json())
    .then((resp) => session.set(resp.data));
</script>
