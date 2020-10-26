import Router from '../router'
import { dismiss, open, fromRight } from './Dialog.svelte'

export const Dialog = {
    dismiss,
    open,
    fromRight,
}

export const window = {
    dialog: Dialog,
    path: Router.pathname,
    page: { title: '' }
}

export default window