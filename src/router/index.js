import Outlet from './Outlet.svelte'
import Link from './Link.svelte'
import ErrNotFound from "../pages/ErrNotFound.svelte"
import { register, navigate, activePath } from './function'

register('/not-found', ErrNotFound)

export { Outlet, Link }

export default {
    register: register,
    start: () => navigate(window.location.pathname),
    navigate: navigate,
    reload: () => window.location.reload(),
    path: () => activePath,

}
