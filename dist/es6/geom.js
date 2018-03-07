let sq = (x) => x * x

let distPointToPoint = ([ax, ay], [bx, by]) =>
  Math.sqrt(sq(ax - bx) + sq(ay - by))


let distPointToParabol = (a, f) => {
  let p = distPointToPoint(a, f)

  return p==0 ? Infinity : sq(p) / (2 * Math.abs(a[1] - f[1]))
}

let circumCenter = (a, b, c)  => {
  let d = (a[0]-c[0])*(b[1]-c[1])-(b[0]-c[0])*(a[1]-c[1])

  if (d == 0) return [Infinity, Infinity]

  let xc = (((a[0]-c[0])*(a[0]+c[0])+(a[1]-c[1])*(a[1]+c[1]))/2*(b[1]-c[1])-((b[0]-c[0])*(b[0]+c[0])+(b[1]-c[1])*(b[1]+c[1]))/2*(a[1]-c[1]))/d
  let yc = (((b[0]-c[0])*(b[0]+c[0])+(b[1]-c[1])*(b[1]+c[1]))/2*(a[0]-c[0])-((a[0]-c[0])*(a[0]+c[0])+(a[1]-c[1])*(a[1]+c[1]))/2*(b[0]-c[0]))/d
  return [xc, yc]
}

let parabolsCrossX = (fa, fb, q) => {
  if(fa[1]===fb[1]) return [(fa[0]+fb[0])/2, (fa[0]+fb[0])/2]

  let s1=(fa[1]*fb[0]-fa[0]*fb[1]+fa[0]*q-fb[0]*q+Math.sqrt((fa[0]*fa[0]+fa[1]*fa[1]-2*fa[0]*fb[0]+fb[0]*fb[0]-2*fa[1]*fb[1]+fb[1]*fb[1])*(fa[1]*fb[1]-fa[1]*q-fb[1]*q+q*q)))/(fa[1]-fb[1])
  let s2=(fa[1]*fb[0]-fa[0]*fb[1]+fa[0]*q-fb[0]*q-Math.sqrt((fa[0]*fa[0]+fa[1]*fa[1]-2*fa[0]*fb[0]+fb[0]*fb[0]-2*fa[1]*fb[1]+fb[1]*fb[1])*(fa[1]*fb[1]-fa[1]*q-fb[1]*q+q*q)))/(fa[1]-fb[1])

  return (s1<s2) ? [s1,s2] : [s2, s1]
}

let doHalflinesCross = (sa, sb, approx = 1e-10) => { //sa, sb are Segment instance
  let dx = sb.ps[0] - sa.ps[0]
  let dy = sb.ps[1] - sa.ps[1]

  if (sa.m == Infinity) return sa.hp*(sb.m*dx-dy)<=approx && sb.vec[0]*dx<=approx
  if (sb.m == Infinity) return sb.hp*(sa.m*dx-dy)>=-approx && sa.vec[0]*dx>=-approx

  let det = sb.vec[0] * sa.vec[1] - sb.vec[1] * sa.vec[0]

  if (det===0) return false

  let u = (dy * sb.vec[0] - dx * sb.vec[1])/det
  let v = (dy * sa.vec[0] - dx * sa.vec[1])/det

  return (u>=-approx && v>=approx) || (u>=approx && v>=-approx)
}

let matrixTransform = (points, matrix) => {
  return points.map(point => {
    return {
      x: point.x * matrix[0] + point.y * matrix[2] + matrix[4],
      y: point.x * matrix[1] + point.y * matrix[3] + matrix[5]
    }
  })
}

let transformEllipse = (rx, ry, ax, m) => {
  const torad = Math.PI / 180
  const epsilon = 0.0000000001

  let c = Math.cos(ax * torad), s = Math.sin(ax * torad)
  let ma = [
    rx * (m[0]*c + m[2]*s),
    rx * (m[1]*c + m[3]*s),
    ry * (-m[0]*s + m[2]*c),
    ry * (-m[1]*s + m[3]*c)
  ]

  let J = ma[0]*ma[0] + ma[2]*ma[2],
    K = ma[1]*ma[1] + ma[3]*ma[3]
  
  let D = ((ma[0]-ma[3])*(ma[0]-ma[3]) + (ma[2]+ma[1])*(ma[2]+ma[1])) *
    ((ma[0]+ma[3])*(ma[0]+ma[3]) + (ma[2]-ma[1])*(ma[2]-ma[1]))

  let JK = (J + K) / 2
  
  if (D < epsilon * JK) {
    return {
      rx: Math.sqrt(JK),
      ry: Math.sqrt(JK),
      ax: 0,
      isDegenerate: false
    }
  }

  let L = ma[0]*ma[1] + ma[2]*ma[3]
  D = Math.sqrt(D)

  let l1 = JK + D/2,
    l2 = JK - D/2

  let newAx, newRx, newRy
  newAx = (Math.abs(L) < epsilon && Math.abs(l1 - K) < epsilon) ? 90
    : Math.atan(Math.abs(L) > Math.abs(l1 - K) ? (l1 - J) / L : L / (l1 - K)) * 180 / Math.PI

  if (newAx >= 0) {
    newRx = Math.sqrt(l1)
    newRy = Math.sqrt(l2)
  } else {
    newAx += 90;
    newRx = Math.sqrt(l2)
    newRy = Math.sqrt(l1)
  }

  return {
    rx: newRx,
    ry: newRy,
    ax: newAx,
    isDegenerate: (newRx < epsilon * newRy || newRy < epsilon * newRx)
  }
}

export default { distPointToPoint, distPointToParabol, circumCenter,
  parabolsCrossX, doHalflinesCross, matrixTransform, transformEllipse }