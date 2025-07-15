export function defIfNotExists(tagName, element) {
  const current = customElements.get(tagName)
  if (current == null) {
    customElements.define(tagName, element)
    return
  }

  if (current === element) return

  console.warn(`Custom element ${tagName} has been defined before.`)
}
