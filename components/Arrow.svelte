<script lang="ts">
	import type Position from '$lib/position'
	import type Arrow from '$lib/network/arrow'
	import currentNetwork from '$lib/network/current'
	import view from '$lib/view'
	import center from '$lib/center'
	import currentTool from '$lib/tool/current'
	import cursorHandler from '$lib/cursor/handler'

	export let arrow: Arrow<number> | null = null
	export let position: Arrow<Position>

	export let padding = true

	$: radius = 0 //(padding ? 50 : 0) + 5

	$: distance = Math.sqrt(
		(position.to.x - position.from.x) ** 2 +
			(position.to.y - position.from.y) ** 2
	)

	$: from = $view && {
		x: $view.width / 2 + position.from.x + $center.x,
		y: $view.height / 2 - position.from.y - $center.y
	}

	$: to = $view && {
		x: $view.width / 2 + position.to.x + $center.x,
		y: $view.height / 2 - position.to.y - $center.y
	}

	$: toPadding = {
		x: ((position.to.x - position.from.x) * radius) / distance,
		y: ((position.to.y - position.from.y) * radius) / distance
	}

	$: toWithPadding = to && {
		x: to.x - toPadding.x,
		y: to.y + toPadding.y
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

{#if from && to && toWithPadding}
	<line
		x1={from.x}
		y1={from.y}
		x2={toWithPadding.x}
		y2={toWithPadding.y}
		stroke="black"
		stroke-width={2}
		marker-end="url(#arrow)"
	/>
	<line
		x1={from.x}
		y1={from.y}
		x2={to.x}
		y2={to.y}
		stroke="blue"
		stroke-width={20}
		opacity={0}
		on:mouseup={onCursorUp}
		on:touchend={onCursorUp}
	/>
{/if}
