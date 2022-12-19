<script lang="ts">
	import currentNetwork from '$lib/network/current'
	import readFile from '$lib/file/read'
	import errorFromValue from '$lib/error/from/value'
	import writeFile from '$lib/file/write'

	let name: string | null = null

	const newNetwork = () => {
		if (!confirm('This will overwrite the current network.')) return
		$currentNetwork = {}
	}

	const loadNetwork = async () => {
		try {
			const [file] = await readFile(['bayes'])

			$currentNetwork = JSON.parse(await file.text())
			name = file.name
		} catch (value) {
			console.error(value)
			alert(errorFromValue(value).message)
		}
	}

	const saveNetwork = () => {
		writeFile(name || 'Untitled.bayes', JSON.stringify($currentNetwork))
	}

	const unload = (event: BeforeUnloadEvent) => {
		event.preventDefault()

		return (event.returnValue =
			"Your changes will be lost if you don't save them.")
	}
</script>

<svelte:window on:beforeunload={unload} />

<nav>
	<h1>bayes.run</h1>
	<button on:click={newNetwork}>New</button>
	<button on:click={loadNetwork}>Load</button>
	<button on:click={saveNetwork}>Save</button>
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: flex-end;
		padding: 0.5rem 1rem;
	}

	h1 {
		margin: 0 0.5rem -0.16rem 0;
	}

	button {
		margin-left: 1rem;
		font-size: 1rem;
		color: colors.$blue;
		transition: opacity 0.3s;

		&:hover {
			opacity: 0.7;
		}
	}
</style>
