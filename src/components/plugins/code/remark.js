import { $remark } from '@milkdown/kit/utils'
import remarkMath from 'remark-math'
import { visit } from 'unist-util-visit'

export const remarkMathPlugin = $remark('remarkMath', () => remarkMath)

function visitMathBlock(ast) {
  return visit(
    ast,
    'math',
    (
      node,
      index,
      parent
    ) => {
      const { value } = node
      const newNode = {
        type: 'code',
        lang: 'LaTeX',
        value,
      }
      parent.children.splice(index, 1, newNode)
    }
  )
}

/// Turn math block into code block with language LaTeX.
export const remarkMathBlockPlugin = $remark('remarkMathBlock', () => () => visitMathBlock)