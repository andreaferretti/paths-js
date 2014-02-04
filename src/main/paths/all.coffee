define [
  './bar'
  './bezier'
  './linear'
  './ops'
  './path'
  './pie'
  './polygon'
  './radar'
  './rectangle'
  './sector'
  './semi-regular-polygon'
  './smooth-line'
  './stock'
], (Bar, Bezier, Linear, Ops, Path, Pie, Polygon, Radar, Rectangle, Sector, SemiRegularPolygon, SmoothLine, Stock)->

  window.paths =
    Bar: Bar
    Bezier: Bezier
    Linear: Linear
    Ops: Ops
    Path: Path
    Pie: Pie
    Polygon: Polygon
    Radar: Radar
    Rectangle: Rectangle
    Sector: Sector
    SemiRegularPolygon: SemiRegularPolygon
    SmoothLine: SmoothLine
    Stock: Stock
