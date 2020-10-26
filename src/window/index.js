import { dismiss, open, fromRight } from './Popup.svelte'

export const Popup = {
    dismiss,
    open,
    fromRight,
}

export const window = {
    popup: Popup,
}

export default window