define [
  './bar'
  './connector'
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
  './tree'
], (Bar, Bezier, Connector, Linear, Ops, Path, Pie, Polygon, Radar, Rectangle, Sector, SemiRegularPolygon, SmoothLine, Stock, Tree)->

  window.paths =
    Bar: Bar
    Bezier: Bezier
    Connector: Connector
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
    Tree: Tree