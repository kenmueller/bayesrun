import { writable } from 'svelte-local-storage-store'

const currentNetworkName = writable<string | null>('network-name', null)

export default currentNetworkName
