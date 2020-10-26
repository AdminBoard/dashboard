import { dismiss, open } from '../src/window/Dialog.svelte'
import { confirm } from '../src/window/Confirm.svelte'

export const window = {
    page: { title: '' },

    confirm,
    open,
    dismiss,
}

export default window

