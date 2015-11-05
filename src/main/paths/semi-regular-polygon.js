import Polygon from './polygon'
import O from './ops'

export default function({ center, radii }) {
  const angle = 2 * Math.PI / radii.length
  let points = radii.map((r, i) => {
    return O.plus(center, O.on_circle(r, i * angle))
  })

  return Polygon({
    points: points,
    closed: true
  })
}