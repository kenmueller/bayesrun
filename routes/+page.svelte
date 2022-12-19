<script lang="ts">
	import currentNetwork from '$lib/network/current'
	import currentNetworkName from '$lib/network/current/name'
	import MetaImage from '$components/Meta/Image.svelte'
	import MetaTitle from '$components/Meta/Title.svelte'
	import MetaDescription from '$components/Meta/Description.svelte'
	import Header from '$components/Header.svelte'
	import Footer from '$components/Footer.svelte'
</script>

<MetaImage />
<MetaTitle />
<MetaDescription />

<Header />
<main>
	<p>{JSON.stringify($currentNetworkName)}</p>
	<p>{JSON.stringify($currentNetwork)}</p>
</main>
<Footer />

<style lang="scss">
</style>
