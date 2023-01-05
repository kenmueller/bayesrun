<script lang="ts">
	import type Position from '$lib/position'
	import type Node from '$lib/network/node'
	import type Arrow from '$lib/network/arrow'
	import currentNetwork from '$lib/network/current'
	import view from '$lib/view'
	import center from '$lib/center'
	import currentTool from '$lib/tool/current'
	import cursorHandler from '$lib/cursor/handler'

	export let arrow: Arrow<number> | null = null
	export let from: Node
	export let to: Node | Position

	$: dx = to.x - from.x
	$: dy = to.y - from.y

	$: angle = Math.atan2(-dy, dx)

	$: fromSize = from.element && {
		width: from.element.clientWidth,
		height: from.element.clientHeight
	}

	$: toSize =
		'element' in to
			? to.element && {
					width: to.element.clientWidth,
					height: to.element.clientHeight
			  }
			: { width: 0, height: 0 }

	$: a = $view &&
		fromSize && {
			x:
				$view.width / 2 +
				from.x +
				$center.x +
				(fromSize.width / 2) * Math.cos(angle),
			y:
				$view.height / 2 -
				from.y -
				$center.y +
				(fromSize.height / 2) * Math.sin(angle)
		}

	$: b = $view &&
		toSize && {
			x:
				$view.width / 2 +
				to.x +
				$center.x +
				(toSize.width / 2) * Math.cos(angle + Math.PI),
			y:
				$view.height / 2 -
				to.y -
				$center.y +
				(toSize.height / 2) * Math.sin(angle + Math.PI)
		}

	const onCursorUp = cursorHandler(() => {
		switch ($currentTool) {
			case 'delete':
				$currentNetwork.arrows = $currentNetwork.arrows.filter(
					({ from, to }) => !(arrow && arrow.from === from && arrow.to === to)
				)
				$currentNetwork = { ...$currentNetwork }

				break
		}
	})
</script>

{#if a && b}
	<line
		x1={a.x}
		y1={a.y}
		x2={b.x}
		y2={b.y}
		stroke="black"
		stroke-width={2}
		marker-end="url(#arrow)"
	/>
	{#if arrow}
		<line
			x1={a.x}
			y1={a.y}
			x2={b.x}
			y2={b.y}
			stroke="blue"
			stroke-width={20}
			opacity={0}
			on:mouseup={onCursorUp}
			on:touchend={onCursorUp}
		/>
	{/if}
{/if}
