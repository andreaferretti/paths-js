let linear = function([a, b], [c, d]) {
  let f = (x) => {
    return c + (d - c) * (x - a) / (b - a)
  }

  f.inverse = () => { return linear([c, d], [a, b]) }
  return f
};

export default linear;