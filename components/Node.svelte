<script lang="ts">
	import type Node from '$lib/network/node'
	import type Cursor from '$lib/cursor'
	import cursorHandler from '$lib/cursor/handler'
	import currentNetwork from '$lib/network/current'
	import currentArrow from '$lib/network/arrow/current'
	import center from '$lib/center'
	import currentTool from '$lib/tool/current'
	import Latex from '$components/Latex.svelte'

	export let id: number
	export let node: Node

	let element: HTMLDivElement | null = null

	$: if (element && node.element !== element) {
		$currentNetwork.nodes[id] = { ...node, element }
		$currentNetwork = { ...$currentNetwork }
	}

	let originalCursor: Cursor | null = null
	let draggingCursor: Cursor | null = null

	$: didClick =
		originalCursor && draggingCursor
			? originalCursor.x === draggingCursor.x &&
			  originalCursor.y === draggingCursor.y
			: false

	const onCursorDown = cursorHandler((cursor, event) => {
		event.stopPropagation()

		switch ($currentTool) {
			case 'arrow':
				$currentArrow = id
				break
			default:
				originalCursor = draggingCursor = cursor
		}
	})

	const onCursorMove = cursorHandler(cursor => {
		if (!draggingCursor) return

		$currentNetwork.nodes[id] = {
			...node,
			x: node.x + (cursor.x - draggingCursor.x),
			y: node.y - (cursor.y - draggingCursor.y)
		}

		$currentNetwork = { ...$currentNetwork }
		draggingCursor = cursor
	})

	const onCursorUp = cursorHandler(() => {
		switch ($currentTool) {
			case 'arrow': {
				if (
					$currentArrow === null ||
					$currentArrow === id ||
					$currentNetwork.arrows.some(
						({ from, to }) =>
							(from === $currentArrow && to === id) ||
							(from === id && to === $currentArrow)
					)
				) {
					$currentArrow = null
					break
				}

				$currentNetwork.arrows.push({ from: $currentArrow, to: id })
				$currentNetwork = { ...$currentNetwork }

				$currentArrow = null
				break
			}
			case 'delete': {
				if (!didClick) break

				$currentNetwork.nodes.splice(id, 1)
				$currentNetwork.arrows = $currentNetwork.arrows.filter(
					({ from, to }) => !(from === id || to === id)
				)

				$currentNetwork = { ...$currentNetwork }

				break
			}
			default: {
				if (!didClick) break
				// TODO: Show dropdown
			}
		}

		originalCursor = draggingCursor = null
	})
</script>

<svelte:body on:mousemove={onCursorMove} on:touchmove={onCursorMove} />

<div
	role="button"
	style="
		--x: {node.x}px;
		--y: {node.y}px;
		--center-x: {$center.x}px;
		--center-y: {$center.y}px;
	"
	bind:this={element}
	on:mousedown={onCursorDown}
	on:touchstart={onCursorDown}
	on:mouseup={onCursorUp}
	on:touchend={onCursorUp}
>
	<p>
		<Latex code={node.name} />
	</p>
</div>

<style lang="scss">
	div {
		position: absolute;
		left: calc(50% + var(--x) + var(--center-x));
		top: calc(50% - var(--y) - var(--center-y));
		padding: 0.5rem 1rem;
		border: 1px solid black;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		z-index: 200;
	}

	p {
		width: max-content;
		height: 1.44rem;
		user-select: none;
		touch-action: none;
	}
</style>
