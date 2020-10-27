import { readable, writable } from 'svelte/store'

const ready = writable(false)

export default {
    title: '',
    ready,
    onReady: readable(null, (set) => {
        ready.subscribe((state) => set(state))
    }),
}