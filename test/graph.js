import Graph from '../dist/node/graph.js'
import expect from 'expect.js'
import { range } from '../dist/node/ops.js'


let randomGraph = (n, density) => {
  let nodes = range(0, n + 1)
  let links = []
  for (let i of range(0, n)) {
    for (let j of range(i + 1, n)) {
      if (Math.random() < density) {
        links.push({
          start: i,
          end: j,
          weight: 3 + 5 * Math.random()
        })
      }
    }
  }

  return { nodes, links }
}

describe('the graph chart', () => {
  let r = randomGraph(10, 0.25)
  let graph = Graph({
    data: r,
    width: 450,
    height: 400,
    attraction: 7,
    repulsion: 20
  })

  it('should return a chart with nodes and links in the right number', () => {
    expect(graph.nodes).to.have.length(r.nodes.length)
    expect(graph.curves).to.have.length(r.links.length)
  })

  it('should evolve under tick', () => {
    let g1 = graph.tick()
    expect(g1.nodes).to.have.length(r.nodes.length)
    expect(g1.curves).to.have.length(r.links.length)
  })
})