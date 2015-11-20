import Rectangle from './rectangle'
import CurvedRectangle from './curved-rectangle'
import { sumBy, min, pairs, enhance } from './ops'


export default function({data, nodeaccessor, linkaccessor, width, height, gutter, rectWidth, compute}) {
  let id = (x) => x
  if (!nodeaccessor) { nodeaccessor = id }
  if (!linkaccessor) { linkaccessor = id }
  gutter = gutter || 10
  rectWidth = rectWidth || 10

  let links_ = data.links.map(linkaccessor)
  let nodes_ = data.nodes.map((level) => level.map(nodeaccessor))

  // Compute the spacing between groups of rectangles;
  // takes care of rects width
  let spacingGroups = (width - rectWidth) / (data.nodes.length - 1)
  let nameValues = {}

  // Initialize the information about nodes
  nodes_.reduce((a,b) => a.concat(b)).forEach((name) => {
    nameValues[name] = {
      value: 0,
      currentlyUsedIn: 0,
      currentlyUsedOut: 0
    }
  })

  for (let [name, val] of pairs(nameValues)) {
    let valsIn = sumBy(
      links_.filter((x) => x.end === name),
      (x) => x.weight
    )
    let valsOut = sumBy(
      links_.filter((x) => x.start === name),
      (x) => x.weight
    )
    val.value = Math.max(valsIn, valsOut)
  }

  // Find a suitable scale: it should take care of the maximum height
  // of stacked rectangles and gutters between them.
  // I did as follows: take the initial height and, for each group of
  // rectangles, compute how much space you have available, that is,
  // height - gutters; there are lengthOfGroup - 1 gutters.
  // Consider the ratios spaceForEachGroup / heightOfStackedRectangles
  // and take the minimum. Use this as scale factor.

  // Compute height of staked rectangles in a group
  let heightOfGroups = nodes_.map((group) => {
    return sumBy(group, (name) => nameValues[name].value)
  })

  // Compute the available height for each group (height - gutters)
  let spaceForEachGroup = nodes_.map((group) => {
    return height - (group.length - 1) * gutter
  })

  // Compute minimum ratio
  let scale = min(heightOfGroups.map((heightOfGroup, idx) => {
    return spaceForEachGroup[idx] / heightOfGroup
  }))

  for (let [name, val] of pairs(nameValues)) {
    val.scaledValue = scale * val.value
  }

  // Fill rectangles information: each rectangle
  // is stack on the previous one, with a gutter
  // The group of rectangles is centered in their own column
  let rectangles = []
  let nodeIdx = -1

  nodes_.forEach((group, idg) => {
    let hGroup = sumBy(group, (y) => nameValues[y].scaledValue) +
      (group.length - 1) * gutter
    let firstTop = (height - hGroup) / 2
    // Fake previous bottom
    let previousBottom = firstTop - gutter
    group.forEach((name, idn) => {
      let top = previousBottom + gutter
      let bottom = top + nameValues[name].scaledValue
      previousBottom = bottom
      let att = {
        top: top,
        bottom: bottom,
        left: rectWidth / 2 + idg * spacingGroups - rectWidth / 2,
        right: rectWidth / 2 + idg * spacingGroups + rectWidth / 2
      }
      nameValues[name].rectangleCoords = att
      nodeIdx += 1
      rectangles.push(enhance(compute, {
        curve: Rectangle(att),
        item: data.nodes[idg][idn],
        index: nodeIdx,
        group: idg
      }))
    })
  })

  let curvedRectangles = links_.map((link, i) => {
    let s = nameValues[link.start]
    let t = nameValues[link.end]
    let rectSource = s.rectangleCoords
    let rectTarget = t.rectangleCoords
    let scaledWeight = link.weight * scale
    let a = rectSource.top + s.currentlyUsedOut
    let b = rectTarget.top + t.currentlyUsedIn
    let curvedRect = {
      topleft: [rectSource.right, a],
      topright: [rectTarget.left, b],
      bottomleft: [rectSource.right, a + scaledWeight],
      bottomright: [rectTarget.left, b + scaledWeight]
    }
    s.currentlyUsedOut += scaledWeight
    t.currentlyUsedIn += scaledWeight

    return enhance(compute, {
      curve: CurvedRectangle(curvedRect),
      item: data.links[i],
      index: i
    })
  })

  return {
    curvedRectangles: curvedRectangles,
    rectangles: rectangles
  }
}