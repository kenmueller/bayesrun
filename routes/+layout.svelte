<script lang="ts">
	import type { LayoutData } from './$types'

	import MetaBase from '$components/Meta/Base.svelte'
	import PageTransition from '$components/Transition/Page.svelte'

	import '$styles/katex.less'

	export let data: LayoutData
</script>

<MetaBase />

<PageTransition key={data.path}>
	<slot />
</PageTransition>

<style lang="scss" global>
	*,
	::before,
	::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: font.$family;
		border: none;
		outline: none;
	}

	html,
	body,
	#root {
		height: 100%;
	}

	body {
		overflow: hidden;
	}

	#root {
		// Position the two pages on top of each other
		display: grid;
	}

	a {
		text-decoration: none;
	}

	button {
		cursor: pointer;
		background: none;

		&:disabled {
			cursor: default;
		}
	}

	[role='button'] {
		cursor: pointer;
	}

	svg {
		display: block;
	}
</style>
