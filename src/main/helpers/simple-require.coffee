cache = {}

window.define ?= (name, deps, body) ->
  modules = deps.map (d) ->
    if cache.hasOwnProperty(d)
      cache[d]
    else
      if d.slice(0, 2) == './' then cache[d.slice(2)] else null
  result = body.apply(null, modules)
  cache[name] = result
