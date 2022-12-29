import { writable } from 'svelte-local-storage-store'

import type Network from '..'

const currentNetwork = writable<Network>('network', { nodes: [], arrows: [] })

export default currentNetwork
