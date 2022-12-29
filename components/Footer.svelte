<script lang="ts">
	import ToolButton from './FooterTool.svelte'
	import PointerIcon from '$images/Pointer.svelte'
	import NodeIcon from '$images/Node.svelte'
	import ArrowIcon from '$images/Arrow.svelte'
	import DeleteIcon from '$images/Trash.svelte'
</script>

<footer>
	<ToolButton tool="pointer" keys={['1', 'a', 'j']}>
		<PointerIcon />
	</ToolButton>
	<ToolButton tool="node" keys={['2', 's', 'k']}>
		<NodeIcon />
	</ToolButton>
	<ToolButton tool="arrow" keys={['3', 'd', 'l']}>
		<ArrowIcon />
	</ToolButton>
	<ToolButton tool="delete" keys={['4', 'f', ';']}>
		<DeleteIcon />
	</ToolButton>
</footer>

<style lang="scss">
	footer {
		$spacing: 0.5rem;

		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 50%;
		bottom: 1rem;
		padding: $spacing;
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 0 20px 5px rgba(black, 0.1);
		transform: translateX(-50%);
		z-index: 100;

		> :global(button + button) {
			margin-left: $spacing;
		}
	}
</style>
