import { writable } from 'svelte/store'

import type Network from '.'

const currentNetwork = writable<Network>({})

export default currentNetwork
