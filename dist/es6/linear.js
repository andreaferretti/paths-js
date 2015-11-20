let linear = function([a, b], [c, d]) {
  let f = (x) =>
    c + (d - c) * (x - a) / (b - a)

  f.inverse = () => linear([c, d], [a, b])
  return f
}

export default linear