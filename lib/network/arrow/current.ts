import { writable } from 'svelte/store'

/** From ID */
const currentArrow = writable<number | null>(null)

export default currentArrow
