import type Position from '$lib/position'

export default interface Arrow<Point extends number | Position = number> {
	from: Point
	to: Point
}
