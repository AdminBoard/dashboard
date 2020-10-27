import Router from './router'
import Api from "./api"
import { writable, readable } from 'svelte/store'

let value = null
let status = writable(null) //null = not initialize, false = not login, true = login

function refreshSession() {
    setTimeout(() => {
        Api.get("/api/public?session").then((resp) => { })
        refreshSession()
    }, 10 * 60 * 1000)
}

const Session = {
    clear: () => { value = {} },

    value: () => { return value },

    isLogin: () => { return value != null && Object.keys(value).length > 0 },

    validate: () => {
        Api.get("/api/public?session").then((resp) => {
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
    },

    onChange: readable(null, (set) => {
        status.subscribe((state) => set(state))
    })
}

export default Session
