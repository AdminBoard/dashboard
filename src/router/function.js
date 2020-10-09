import { writable, readable } from "svelte/store"

const pageStore = writable()
let routeMap = new Map()
let activePage
let activePath = window.location.pathname

export const onChange = readable(null, (set) => {
    // pageStore.subscribe((page) => set(page))
})

//TODO using regex for path finding 
export const navigate = (path) => {
    // if (activePage == null || activePath != path) {
    //     let page = routeMap.get(path)
    //     if (page == null) {
    //         page = routeMap.get('*')
    //     }
    //     if (page == null) page = ErrNotFound
    //     activePage = page
    //     pageStore.set(activePage)
    //     history.pushState(null, "", path)
    // }
    // activePath = path
}

export const register = (path, component) => {
    // routeMap.set(path, component)
}