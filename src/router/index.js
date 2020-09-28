import Router from './Router.svelte'
import Renderer from './Renderer.svelte'
import Link from './Link.svelte'
import Err404 from "../pages/err404.svelte"
import { writable, readable } from "svelte/store"


let routeMap = new Map()
let activePage
let activePath = window.location.pathname
const pageStore = writable()

const onChange = readable(null, (set) => {
    pageStore.subscribe((page) => set(page))
})

const navigate = (path) => {
    console.log(activePath, path)
    if (activePage == null || activePath != path) {
        let page = routeMap.get(path)
        if (page == null) page = Err404
        activePage = page
        pageStore.set(activePage)
        history.pushState(null, "", path)
    }
    activePath = path
}

export { Renderer, Link, onChange }

export default {
    register: (path, component) => {
        routeMap.set(path, component)
    },
    start: () => {
        navigate(window.location.pathname)
    },
    navigate: navigate,
}

