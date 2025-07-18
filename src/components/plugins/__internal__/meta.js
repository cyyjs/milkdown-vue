export function withMeta(plugin, meta) {
  Object.assign(plugin, {
    meta: {
      package: '@milkdown/components',
      ...meta
    }
  })

  return plugin
}
