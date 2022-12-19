<script lang="ts">
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
		<h1>bayes.run</h1>
	</main>
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
	}
</style>
