import Connector from './connector'
import Linear from './linear'
import { range } from './ops'
import { buildTree, setHeight, treeHeight, collect } from './tree-utils'


export default function({ data, width, height, children, tension }) {
  if (!children) { children = (x) => x.children }
  let tree = buildTree(data, children)
  let levels = treeHeight(tree)
  let maxHeights = setHeight(tree)
  let hspace = width / (levels - 1)
  let hscale = Linear([0, levels - 1], [0, width])
  let vscales = range(0, levels).map((level) => {
    let availableHeight = Math.sqrt(level / (levels - 1)) * height
    let top = (height - availableHeight) / 2
    let bottom = top + availableHeight
    let maxHeight = (level > 0) ?
      maxHeights[level] + maxHeights[level-1] : maxHeights[level]
    if (maxHeight === 0) {
      return (x) => height / 2
    } else {
      return Linear([0, maxHeight], [top, bottom])
    }
  })

  let position = (node) => {
    let level = node.level
    let vscale = vscales[level]
    return [hscale(level), vscale(node.height_)]
  }

  let i = -1
  let connectors = collect(tree, (parent, child) => {
    i += 1
    child.height_ = child.height + parent.height
    return {
      connector: Connector({
          start: position(parent),
          end: position(child),
          tension: tension
        }),
      index: i,
      item: {
        start: parent.item,
        end: child.item
      }
    }
  })
  let childNodes = collect(tree, (parent, child) =>
    ({
      point: position(child),
      item: child.item
    })
  )
  let rootNode = {
    point: position(tree),
    item: tree.item
  }

  return {
    curves: connectors,
    nodes: [rootNode].concat(childNodes)
  }
}