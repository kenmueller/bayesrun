<script lang="ts">
	import type Cursor from '$lib/cursor'
	import cursorHandler from '$lib/cursor/handler'
	import view from '$lib/view'
	import center from '$lib/center'
	import currentNetwork from '$lib/network/current'
	import currentArrow from '$lib/network/arrow/current'
	import currentTool from '$lib/tool/current'
	import currentCursor from '$lib/cursor/current'
	import MetaImage from '$components/Meta/Image.svelte'
	import MetaTitle from '$components/Meta/Title.svelte'
	import MetaDescription from '$components/Meta/Description.svelte'
	import Header from '$components/Header.svelte'
	import Footer from '$components/Footer.svelte'
	import NodeElement from '$components/Node.svelte'
	import ArrowElement from '$components/Arrow.svelte'

	let originalCursor: Cursor | null = null
	let draggingCursor: Cursor | null = null

	$: didClick =
		originalCursor && draggingCursor
			? originalCursor.x === draggingCursor.x &&
			  originalCursor.y === draggingCursor.y
			: false

	const onCursorDown = cursorHandler(cursor => {
		originalCursor = draggingCursor = cursor
	})

	const onCursorMove = cursorHandler(cursor => {
		if (!draggingCursor) return

		$center = {
			x: $center.x + (cursor.x - draggingCursor.x),
			y: $center.y - (cursor.y - draggingCursor.y)
		}

		draggingCursor = cursor
	})

	const onCursorUp = cursorHandler(() => {
		switch ($currentTool) {
			case 'node':
				if (!(didClick && $currentCursor)) break

				$currentNetwork.nodes.push({
					name: `Variable #${$currentNetwork.nodes.length}`,
					element: null,
					x: $currentCursor.x,
					y: $currentCursor.y
				})
				$currentNetwork = { ...$currentNetwork }

				break
			case 'arrow':
				$currentArrow = null
				break
		}

		draggingCursor = null
	})
</script>

<svelte:body
	on:mousemove={onCursorMove}
	on:touchmove={onCursorMove}
	on:mouseup={onCursorUp}
	on:touchend={onCursorUp}
/>

<MetaImage />
<MetaTitle />
<MetaDescription />

<Header />
<main on:mousedown={onCursorDown} on:touchstart={onCursorDown}>
	<span class="x" style="--y: {$center.y}px;" />
	<span class="y" style="--x: {$center.x}px;" />
	{#each $currentNetwork.nodes as node, id}
		<NodeElement {id} {node} />
	{/each}
	{#if $view}
		<svg class="arrows" viewBox="0 0 {$view.width} {$view.height}">
			<defs>
				<marker
					id="arrow"
					viewBox="0 0 10 10"
					refX={5}
					refY={5}
					markerWidth={6}
					markerHeight={6}
					orient="auto-start-reverse"
				>
					<path d="M 0 0 L 10 5 L 0 10 z" />
				</marker>
			</defs>
			{#each $currentNetwork.arrows as arrow}
				<ArrowElement
					{arrow}
					from={$currentNetwork.nodes[arrow.from]}
					to={$currentNetwork.nodes[arrow.to]}
				/>
			{/each}
			{#if !($currentArrow === null || $currentCursor === null)}
				<ArrowElement
					from={$currentNetwork.nodes[$currentArrow]}
					to={$currentCursor}
				/>
			{/if}
		</svg>
	{/if}
</main>
<Footer />

<style lang="scss">
	main {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 0;
	}

	.x,
	.y {
		pointer-events: none;
		position: absolute;
		background: rgba(black, 0.1);
		z-index: 0;
	}

	.x {
		left: 0;
		right: 0;
		top: calc(50% - var(--y));
		height: 1px;
		transform: translateY(-50%);
	}

	.y {
		left: calc(50% + var(--x));
		top: 0;
		bottom: 0;
		width: 1px;
		transform: translateX(-50%);
	}

	.arrows {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 100;
	}
</style>
