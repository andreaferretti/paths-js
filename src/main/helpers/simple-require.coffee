cache = {}

window.define ?= (name, deps, body) ->
  modules = deps.map (d) -> cache[d]
  result = body.apply(null, modules)
  cache[name] = result
