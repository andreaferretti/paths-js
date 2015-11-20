import Polygon from './polygon'
import { plus, onCircle } from './ops'

export default function({ center, radii }) {
  const angle = 2 * Math.PI / radii.length
  let points = radii.map((r, i) => plus(center, onCircle(r, i * angle)))

  return Polygon({
    points: points,
    closed: true
  })
}