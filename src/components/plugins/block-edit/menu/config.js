import { imageBlockSchema } from '@milkdown/kit/component/image-block'
import { commandsCtx, editorViewCtx } from '@milkdown/kit/core'
import {
  addBlockTypeCommand,
  blockquoteSchema,
  bulletListSchema,
  clearTextInCurrentBlockCommand,
  codeBlockSchema,
  headingSchema,
  hrSchema,
  listItemSchema,
  orderedListSchema,
  paragraphSchema,
  selectTextNearPosCommand,
  setBlockTypeCommand,
  wrapInBlockTypeCommand,
} from '@milkdown/kit/preset/commonmark'
import { createTable  } from '@milkdown/kit/preset/gfm'

import icons from '../../../icons'

import { GroupBuilder } from '../../../utils/group-builder'

const headings = [
  { key: 'h1', label: '标题一', icon: icons.h1Icon },
  { key: 'h2', label: '标题二', icon: icons.h2Icon },
  { key: 'h3', label: '标题三', icon: icons.h3Icon },
  { key: 'h4', label: '标题四', icon: icons.h4Icon },
  { key: 'h5', label: '标题五', icon: icons.h5Icon },
  { key: 'h6', label: '标题六', icon: icons.h6Icon }
]
export function getGroups(filter, config, ctx) {
  const isLatexEnabled = true
  const isImageBlockEnabled = true
  const isTableEnabled = true

  const groupBuilder = new GroupBuilder()

  if (config?.textGroup !== null) {
    const textGroup = groupBuilder.addGroup('text', config?.textGroup?.label ?? '文本')
    if (config?.textGroup?.text !== null) {
      textGroup.addItem('text', {
        label: config?.textGroup?.text?.label ?? '正文',
        icon: config?.textGroup?.text?.icon ?? icons.textIcon,
        shortcut: 'text',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const paragraph = paragraphSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(setBlockTypeCommand.key, {
            nodeType: paragraph
          })
        }
      })
    }
    headings.forEach((item, index) => {
      if (config?.textGroup?.[item.key] !== null) {
        textGroup.addItem(item.key, {
          label: config?.textGroup?.[item.key]?.label ?? item.label,
          icon: config?.textGroup?.[item.key]?.icon ?? item.icon,
          shortcut: item.key,
          onRun: (ctx) => {
            const commands = ctx.get(commandsCtx)
            const heading = headingSchema.type(ctx)
            commands.call(clearTextInCurrentBlockCommand.key)
            commands.call(setBlockTypeCommand.key, {
              nodeType: heading,
              attrs: {
                level: index + 1
              }
            })
          }
        })
      }
    })

    if (config?.textGroup?.quote !== null) {
      textGroup.addItem('quote', {
        label: config?.textGroup?.quote?.label ?? '引用',
        icon: config?.textGroup?.quote?.icon ?? icons.quoteIcon,
        shortcut: 'quote',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const blockquote = blockquoteSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(wrapInBlockTypeCommand.key, {
            nodeType: blockquote
          })
        }
      })
    }

    if (config?.textGroup?.divider !== null) {
      textGroup.addItem('divider', {
        label: config?.textGroup?.divider?.label ?? '分割线',
        icon: config?.textGroup?.divider?.icon ?? icons.dividerIcon,
        shortcut: 'divider',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const hr = hrSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(addBlockTypeCommand.key, {
            nodeType: hr
          })
        }
      })
    }
  }

  if (config?.listGroup !== null) {
    const listGroup = groupBuilder.addGroup('list', config?.listGroup?.label ?? '列表')
    if (config?.listGroup?.bulletList !== null) {
      listGroup.addItem('bullet-list', {
        label: config?.listGroup?.bulletList?.label ?? '项目列表',
        icon: config?.listGroup?.bulletList?.icon ?? icons.bulletListIcon,
        shortcut: 'bullet-list',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const bulletList = bulletListSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(wrapInBlockTypeCommand.key, {
            nodeType: bulletList
          })
        }
      })
    }

    if (config?.listGroup?.orderedList !== null) {
      listGroup.addItem('ordered-list', {
        label: config?.listGroup?.orderedList?.label ?? '编号列表',
        icon: config?.listGroup?.orderedList?.icon ?? icons.orderedListIcon,
        shortcut: 'ordered-list',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const orderedList = orderedListSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(wrapInBlockTypeCommand.key, {
            nodeType: orderedList
          })
        }
      })
    }

    if (config?.listGroup?.taskList !== null) {
      listGroup.addItem('task-list', {
        label: config?.listGroup?.taskList?.label ?? '待办列表',
        icon: config?.listGroup?.taskList?.icon ?? icons.todoListIcon,
        shortcut: 'task-list',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const listItem = listItemSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(wrapInBlockTypeCommand.key, {
            nodeType: listItem,
            attrs: { checked: false }
          })
        }
      })
    }
  }

  if (config?.advancedGroup !== null) {
    const advancedGroup = groupBuilder.addGroup('advanced', config?.advancedGroup?.label ?? '高级')

    if (config?.advancedGroup?.image !== null && isImageBlockEnabled) {
      advancedGroup.addItem('image', {
        label: config?.advancedGroup?.image?.label ?? '图片',
        icon: config?.advancedGroup?.image?.icon ?? icons.imageIcon,
        shortcut: 'image',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const imageBlock = imageBlockSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(addBlockTypeCommand.key, {
            nodeType: imageBlock
          })
        }
      })
    }

    if (config?.advancedGroup?.codeBlock !== null) {
      advancedGroup.addItem('code', {
        label: config?.advancedGroup?.codeBlock?.label ?? '代码块',
        icon: config?.advancedGroup?.codeBlock?.icon ?? icons.codeIcon,
        shortcut: 'code',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const codeBlock = codeBlockSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(setBlockTypeCommand.key, {
            nodeType: codeBlock
          })
        }
      })
    }

    if (config?.advancedGroup?.table !== null && isTableEnabled) {
      advancedGroup.addItem('table', {
        label: config?.advancedGroup?.table?.label ?? '表格',
        icon: config?.advancedGroup?.table?.icon ?? icons.tableIcon,
        shortcut: 'table',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const view = ctx.get(editorViewCtx)

          commands.call(clearTextInCurrentBlockCommand.key)

          // record the position before the table is inserted
          const { from } = view.state.selection
          commands.call(addBlockTypeCommand.key, {
            nodeType: createTable(ctx, 3, 3)
          })

          commands.call(selectTextNearPosCommand.key, {
            pos: from
          })
        }
      })
    }

    if (config?.advancedGroup?.math !== null && isLatexEnabled) {
      advancedGroup.addItem('math', {
        label: config?.advancedGroup?.math?.label ?? '数学公式',
        icon: config?.advancedGroup?.math?.icon ?? icons.functionsIcon,
        shortcut: 'math',
        onRun: (ctx) => {
          const commands = ctx.get(commandsCtx)
          const codeBlock = codeBlockSchema.type(ctx)

          commands.call(clearTextInCurrentBlockCommand.key)
          commands.call(addBlockTypeCommand.key, {
            nodeType: codeBlock,
            attrs: { language: 'LaTex' }
          })
        }
      })
    }
  }

  config?.buildMenu?.(groupBuilder)

  let groups = groupBuilder.build()

  if (filter) {
    groups = groups
      .map((group) => {
        const items = group.items.filter((item) => {
          return (
            item.label.toLowerCase().includes(filter.toLowerCase()) ||
            item.shortcut?.toLowerCase().includes(filter.toLowerCase())
          )
        })

        return {
          ...group,
          items
        }
      })
      .filter((group) => group.items.length > 0)
  }

  const items = groups.flatMap((groups) => groups.items)
  items.forEach((item, index) => {
    Object.assign(item, { index })
  })

  groups.reduce((acc, group) => {
    const end = acc + group.items.length
    Object.assign(group, {
      range: [acc, end]
    })
    return end
  }, 0)
  return {
    groups,
    size: items.length
  }
}
