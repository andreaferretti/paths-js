define [
  './bar'
  './bezier'
  './connector'
  './graph'
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
  './waterfall'
], (Bar, Bezier, Connector, Graph, Linear, Ops, Path, Pie, Polygon, Radar, Rectangle, Sector, SemiRegularPolygon, SmoothLine, Stock, Tree, Waterfall)->

  window.paths =
    Bar: Bar
    Bezier: Bezier
    Connector: Connector
    Graph: Graph
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
    Waterfall: Waterfall
