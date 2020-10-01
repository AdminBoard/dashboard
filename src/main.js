import './style/theme.scss'
import './style/_global.scss'
import './style/_tag.scss'

import App from './App.svelte'

const app = new App({
	target: document.body,
	props: {
	}
})

export default app