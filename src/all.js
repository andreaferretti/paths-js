import Bar from './bar'
import Bezier from './bezier'
import Connector from './connector'
import CurvedRectangle from './curved-rectangle'
import Graph from './graph'
import Linear from './linear'
import Path from './path'
import Pie from './pie'
import Polygon from './polygon'
import Radar from './radar'
import Rectangle from './rectangle'
import Sankey from './sankey'
import Sector from './sector'
import SemiRegularPolygon from './semi-regular-polygon'
import SmoothLine from './smooth-line'
import Stack from './stack'
import Stock from './stock'
import Tree from './tree'
import Voronoi from './voronoi'
import Waterfall from './waterfall'

(function() {
  "use strict"

  var global = (1,eval)('this')

  global.Paths = {
    Bar,
    Bezier,
    Connector,
    CurvedRectangle,
    Graph,
    Linear,
    Path,
    Pie,
    Polygon,
    Radar,
    Rectangle,
    Sankey,
    Sector,
    SemiRegularPolygon,
    SmoothLine,
    Stack,
    Stock,
    Tree,
    Voronoi,
    Waterfall
  }
}())