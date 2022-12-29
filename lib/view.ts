import { readable } from 'svelte/store'

import { browser } from '$app/environment'

export interface View {
	width: number
	height: number
}

const view = readable<View | null>(null, set => {
	if (!browser) return set(null)

	const setView = () => {
		set({
			width: window.innerWidth,
			height: window.innerHeight
		})
	}

	setView()
	window.addEventListener('resize', setView)

	return () => {
		window.removeEventListener('resize', setView)
	}
})

export default view
