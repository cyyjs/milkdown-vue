import { toggleLinkCommand } from '@milkdown/kit/component/link-tooltip'
import { commandsCtx } from '@milkdown/kit/core'
import {
  emphasisSchema,
  inlineCodeSchema,
  isMarkSelectedCommand,
  isNodeSelectedCommand,
  linkSchema,
  strongSchema,
  blockquoteSchema,
  toggleEmphasisCommand,
  toggleInlineCodeCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand
} from '@milkdown/kit/preset/commonmark'
import { strikethroughSchema, toggleStrikethroughCommand } from '@milkdown/kit/preset/gfm'
import { GroupBuilder } from '../../utils/group-builder'
import { toggleLatexCommand } from '../code/command'
import { mathInlineSchema } from '../code/inline-latex'

export function getGroups(config, ctx) {
  const groupBuilder = new GroupBuilder()
  groupBuilder
    .addGroup('formatting', 'Formatting')
    .addItem('bold', {
      icon: config?.boldIcon ?? 'bold',
      active: (ctx) => {
        const commands = ctx.get(commandsCtx)
        return commands.call(isMarkSelectedCommand.key, strongSchema.type(ctx))
      },
      onRun: (ctx) => {
        const commands = ctx.get(commandsCtx)
        commands.call(toggleStrongCommand.key)
      }
    })
    .addItem('italic', {
      icon: config?.italicIcon ?? 'italic',
      active: (ctx) => {
        const commands = ctx.get(commandsCtx)
        return commands.call(isMarkSelectedCommand.key, emphasisSchema.type(ctx))
      },
      onRun: (ctx) => {
        const commands = ctx.get(commandsCtx)
        commands.call(toggleEmphasisCommand.key)
      }
    })
    .addItem('strikethrough', {
      icon: config?.strikethroughIcon ?? 'strikethrough',
      active: (ctx) => {
        const commands = ctx.get(commandsCtx)
        return commands.call(isMarkSelectedCommand.key, strikethroughSchema.type(ctx))
      },
      onRun: (ctx) => {
        const commands = ctx.get(commandsCtx)
        commands.call(toggleStrikethroughCommand.key)
      }
    })

  const functionGroup = groupBuilder.addGroup('function', 'Function')
  functionGroup.addItem('blockquote', {
    icon: config?.blockquoteIcon ?? 'quote',
    active: (ctx) => {
      const commands = ctx.get(commandsCtx)
      return commands.call(isNodeSelectedCommand.key, blockquoteSchema.type(ctx))
    },
    onRun: (ctx) => {
      const commands = ctx.get(commandsCtx)
      commands.call(wrapInBlockquoteCommand.key)
    }
  })
  functionGroup.addItem('code', {
    icon: config?.codeIcon ?? 'code',
    active: (ctx) => {
      const commands = ctx.get(commandsCtx)
      return commands.call(isMarkSelectedCommand.key, inlineCodeSchema.type(ctx))
    },
    onRun: (ctx) => {
      const commands = ctx.get(commandsCtx)
      commands.call(toggleInlineCodeCommand.key)
    }
  })

  functionGroup.addItem('latex', {
    icon: config?.latexIcon ?? 'functions',
    active: (ctx) => {
      const commands = ctx.get(commandsCtx)
      return commands.call(isNodeSelectedCommand.key, mathInlineSchema.type(ctx))
    },
    onRun: (ctx) => {
      const commands = ctx.get(commandsCtx)
      commands.call(toggleLatexCommand.key)
    }
  })
  functionGroup.addItem('link', {
    icon: config?.linkIcon ?? 'link',
    active: (ctx) => {
      const commands = ctx.get(commandsCtx)
      return commands.call(isMarkSelectedCommand.key, linkSchema.type(ctx))
    },
    onRun: (ctx) => {
      const commands = ctx.get(commandsCtx)
      commands.call(toggleLinkCommand.key)
    }
  })

  config?.buildToolbar?.(groupBuilder)

  return groupBuilder.build()
}
