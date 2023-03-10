import { writable } from 'svelte/store'

import type Position from '$lib/position'

const center = writable<Position>({ x: 0, y: 0 })

export default center
