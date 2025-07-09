export class GroupBuilder {
  #groups = []

  clear = () => {
    this.#groups = []
    return this
  }

  #getGroupInstance = (group) => {
    const groupInstance = {
      group,
      addItem: (key, item) => {
        const data = { ...item, key }
        group.items.push(data)
        return groupInstance
      },
      clear: () => {
        group.items = []
        return groupInstance
      }
    }
    return groupInstance
  }

  addGroup = (key, label) => {
    const items = []
    const group = {
      key,
      label,
      items
    }
    this.#groups.push(group)

    return this.#getGroupInstance(group)
  }

  getGroup = (key) => {
    const group = this.#groups.find((group) => group.key === key)
    if (!group) throw new Error(`Group with key ${key} not found`)

    return this.#getGroupInstance(group)
  }

  build = () => {
    return this.#groups
  }
}
