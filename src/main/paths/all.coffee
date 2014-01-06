define [
  './bezier'
  './linear'
  './ops'
  './path'
  './pie'
  './polygon'
  './radar'
  './sector'
  './semi-regular-polygon'
  './smooth-line'
  './stock'
], (Bezier, Linear, Ops, Path, Pie, Polygon, Radar, Sector, SemiRegularPolygon, SmoothLine, Stock)->

  window.paths =
    Bezier: Bezier
    Linear: Linear
    Ops: Ops
    Path: Path
    Pie: Pie
    Polygon: Polygon
    Radar: Radar
    Sector: Sector
    SemiRegularPolygon: SemiRegularPolygon
    SmoothLine: SmoothLine
    Stock: Stock
