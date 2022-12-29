import type Node from './node'
import type Arrow from './arrow'

export default interface Network {
	nodes: Node[]
	arrows: Arrow[]
}
