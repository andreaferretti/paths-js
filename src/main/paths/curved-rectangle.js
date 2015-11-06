import Path from './path'
import O from './ops'
import Connector from './connector'

export default function({topleft, topright, bottomleft, bottomright}) {
  let topCurve = Connector({start: topleft, end: topright}).path
  let bottomCurve  = Connector({start: bottomright, end: bottomleft}).path
  let path = topCurve.connect(bottomCurve).closepath()
  let centroid = O.average([topleft, topright, bottomleft, bottomright])

  return {
    path: path,
    centroid: centroid
  }
}