import { writable, readable } from "svelte/store"

export let activePath = null

const pageStore = writable()
let routeMap = new Map()

export const onChange = readable(null, (set) => {
    pageStore.subscribe((page) => set(page))
})

//TODO using regex for path finding 
export const navigate = (path) => {
    if (activePath != path) {
        activePath = path
        let page = routeMap.get(path)
        if (page == null) {
            page = routeMap.get('*')
        }
        if (page == null) page = ErrNotFound

        history.pushState(null, "", path)
        pageStore.set(page)
    }
}

export const register = (path, component) => {
    routeMap.set(path, component)
}