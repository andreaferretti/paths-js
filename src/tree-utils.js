let maxBy = (items = [], f) => {
  return items.reduce((m , i) => Math.max(m, f(i)), 0)
}

let treeHeight = (root) => {
  return 1 + maxBy(root.children, treeHeight)
}

let buildTree = (data, children, level = 0) => {
  let result = {
    item: data,
    level: level
  }
  let cs = children(data)
  if (cs && cs.length) {
    result.children = cs.map((c) =>
      buildTree(c, children, level + 1)
    )
  }
  return result
}

let setHeight = (root, level = 0, maxHeights = []) => {
  if (maxHeights[level] != null) {
    root.height = maxHeights[level] + 1
    maxHeights[level] += 1
  } else {
    maxHeights[level] = 0
    root.height = 0
  }
  for (let child of (root.children || [])) {
    setHeight(child, level + 1, maxHeights)
  }
  return maxHeights
}

// f is a function of (parent, child)
let collect = (root, f) => {
  let result = []
  for (let child of (root.children || [])) {
    result.push(f(root, child))
    result = result.concat(collect(child, f))
  }
  return result
}

export { treeHeight, buildTree, setHeight, collect }