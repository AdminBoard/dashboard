import './style/_theme.scss'
import './style/_global.scss'
import './style/_tag.scss'

import App from './App.svelte'
import Widgets from './widgets'
import { post, get } from './Api.svelte'

const app = new App({
	target: document.body,
	props: {
	}
})


const Api = {
	post: post,
	get: get,
}

export default app
export { Api, Widgets }

