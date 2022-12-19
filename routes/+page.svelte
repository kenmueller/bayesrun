<script lang="ts">
	import currentNetwork from '$lib/network/current'
	import currentNetworkName from '$lib/network/current/name'
	import MetaImage from '$components/Meta/Image.svelte'
	import MetaTitle from '$components/Meta/Title.svelte'
	import MetaDescription from '$components/Meta/Description.svelte'
	import Toolbar from '$components/Toolbar.svelte'
</script>

<MetaImage />
<MetaTitle />
<MetaDescription />

<div>
	<Toolbar />
	<main>
		<p>{JSON.stringify($currentNetworkName)}</p>
		<p>{JSON.stringify($currentNetwork)}</p>
	</main>
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
	}
</style>
