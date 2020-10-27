import Router from './router'
import { get } from "./Api.svelte"
import { writable, readable } from 'svelte/store'

let value = null
let status = writable(null) //null = not initialize, false = not login, true = login

function refreshSession() {
    setTimeout(() => {
        get("/api/public?session").then((resp) => { })
        refreshSession()
    }, 10 * 60 * 1000)
}

export default {
    onChange: readable(null, (set) => {
        status.subscribe((state) => set(state))
    }),

    clear: () => { value = {} },

    value: () => { return value },

    isLogin: () => { return value != null && Object.keys(value).length > 0 },

    validate: () => {
        get("/api/public?session").then((resp) => {
            if (resp.status != 0 || resp.data == null) {
                status.set(false)
                Router.navigate("/login")
                clear()
            } else {
                status.set(true)
                value = resp.data
                Router.start()
                refreshSession()
            }
        })

    }
}