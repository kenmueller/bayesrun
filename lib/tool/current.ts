import { writable } from 'svelte-local-storage-store'

import type Tool from '.'

const currentTool = writable<Tool>('tool', 'pointer')

export default currentTool
