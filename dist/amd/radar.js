(function() {
  define(['./polygon', './ops'], function(Polygon, O) {
    var collect_keys, global_max, key_accessor;
    collect_keys = function(objects) {
      var key, keys, keysets, o, object, _i, _j, _len, _len1, _ref;
      keys = [];
      keysets = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = objects.length; _i < _len; _i++) {
          o = objects[_i];
          _results.push(Object.keys(o));
        }
        return _results;
      })();
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        _ref = Object.keys(object);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          key = _ref[_j];
          if (keys.indexOf(key) === -1) {
            keys.push(key);
          }
        }
      }
      return keys;
    };
    key_accessor = function(keys) {
      var a, key, _fn, _i, _len;
      a = {};
      _fn = function(k) {
        return a[k] = function(o) {
          return o[k];
        };
      };
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        _fn(key);
      }
      return a;
    };
    global_max = function(data, accessor) {
      var keys, maxs;
      keys = Object.keys(accessor);
      maxs = data.map(function(d) {
        var vals;
        vals = keys.map(function(k) {
          return accessor[k](d);
        });
        return O.max(vals);
      });
      return O.max(maxs);
    };
    return function(_arg) {
      var accessor, angle, center, colors, data, i, keys, max, polygons, r, sides;
      data = _arg.data, accessor = _arg.accessor, center = _arg.center, r = _arg.r, max = _arg.max, colors = _arg.colors;
      if (accessor == null) {
        accessor = key_accessor(collect_keys(data));
      }
      keys = Object.keys(accessor);
      sides = keys.length;
      angle = 2 * Math.PI / sides;
      i = -1;
      if (max == null) {
        max = global_max(data, accessor);
      }
      polygons = data.map(function(d) {
        var points, _i, _ref, _results;
        i += 1;
        points = (function() {
          _results = [];
          for (var _i = 0, _ref = sides - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this).map(function(n) {
          var key;
          key = keys[n];
          return O.plus(center, O.on_circle(r * accessor[key](d) / max, n * angle));
        });
        return {
          polygon: Polygon({
            points: points,
            closed: true
          }),
          item: d,
          color: colors(i)
        };
      });
      return {
        polygons: polygons
      };
    };
  });

}).call(this);
