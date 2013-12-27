define [
  './linear'
  './ops'
  './path'
  './pie'
  './polygon'
  './radar'
  './sector'
  './stock'
], (Linear, Ops, Path, Pie, Polygon, Radar, Sector, Stock)->

  window.paths =
    Linear: Linear
    Ops: Ops
    Path: Path
    Pie: Pie
    Polygon: Polygon
    Radar: Radar
    Sector: Sector
    Stock: Stock
