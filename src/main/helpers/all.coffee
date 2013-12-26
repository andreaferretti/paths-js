define [
  '../amd/linear'
  '../amd/ops'
  '../amd/path'
  '../amd/pie'
  '../amd/polygon'
  '../amd/radar'
  '../amd/sector'
  '../amd/stock'
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
