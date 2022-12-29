<script lang="ts">
	import latex from '$lib/latex'
	import toRef from '$lib/ref/to'

	const latexRef = toRef(latex)

	export let code: string
	$: result = latexRef(code)
</script>

{#if result.error}
	<span class="error">{result.error.message}</span>
{:else}
	{@html result.value}
{/if}

<style lang="scss">
	.error {
		color: red;
	}
</style>
