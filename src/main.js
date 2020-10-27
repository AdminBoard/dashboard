import './style/_theme.scss'
import './style/_global.scss'
import './style/_tag.scss'

import App from './App.svelte'

import Widgets from './widgets'
import Table from "./widgets/Table"
import Label from "./widgets/Label"

import Router from "./router"
import Home from "./pages/Home.svelte"
import PageRenderer from "./pages/PageRenderer.svelte"
import Login from "./pages/Login.svelte"
import Dialog from './dialog'

const app = new App({
	target: document.body,
	props: {
	}
})
export default app

Widgets.register("Table", Table)
Widgets.register("Label", Label)

Router.register("/login", Login)
Router.register("/home", Home)
Router.register("*", PageRenderer)

export { Widgets, Dialog }


