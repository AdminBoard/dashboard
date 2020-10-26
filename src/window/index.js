import { dismiss, open, fromRight } from './Dialog.svelte'

export const Dialog = {
    dismiss,
    open,
    fromRight,
}

export const window = {
    dialog: Dialog,
}

export default window