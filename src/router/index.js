import RouterOutlet from './RouterOutlet.svelte'
import Link from './Link.svelte'
import ErrNotFound from "../pages/ErrNotFound.svelte"
import { register, navigate } from './function'

register('/not-found', ErrNotFound)

export { RouterOutlet, Link }

export default {
    register: register,
    start: () => navigate(window.location.pathname),
    navigate: navigate,
    reload: () => window.location.reload()

}

