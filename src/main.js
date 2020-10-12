import './style/_theme.scss'
import './style/_global.scss'
import './style/_tag.scss'

import App from './App.svelte'
import Widgets from './widgets'

const app = new App({
	target: document.body,
	props: {
	}
})

export default app

export { Widgets } 