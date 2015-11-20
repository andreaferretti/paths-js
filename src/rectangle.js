import Polygon from './polygon'

export default function({left, right, top, bottom}) {
  return Polygon({
    points: [
        [right, top],
        [right, bottom],
        [left, bottom],
        [left, top]
      ],
    closed: true
  })
}
