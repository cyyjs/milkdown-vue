export function isInCodeBlock(selection) {
  const type = selection.$from.parent.type
  return type.name === 'code_block'
}

export function isInList(selection) {
  const type = selection.$from.node(selection.$from.depth - 1)?.type
  return type?.name === 'list_item'
}
