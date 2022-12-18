import type { WebAppManifest } from 'web-app-manifest'

import type { RequestHandler } from './$types'

import errorFromValue from '$lib/error/from/value'

import touch from '$images/touch.png'
import mask from '$images/mask.png'

const manifest: WebAppManifest = {
	dir: 'ltr',
	lang: 'en-US',
	scope: '/',
	start_url: '/',
	name: 'bayes.run',
	short_name: 'bayes.run',
	description: 'Run your Bayesian networks',
	display: 'standalone',
	theme_color: 'white',
	background_color: 'white',
	categories: ['education', 'productivity', 'utilities'],
	icons: [
		{ src: touch, sizes: '180x180' },
		{ src: mask, sizes: '512x512', purpose: 'monochrome maskable' }
	]
}

let data: string | null = null

export const GET: RequestHandler = () => {
	try {
		return new Response((data ??= JSON.stringify(manifest)), {
			headers: {
				'cache-control': 'no-cache',
				'content-type': 'application/manifest+json'
			}
		})
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return new Response(message, { status: code })
	}
}
