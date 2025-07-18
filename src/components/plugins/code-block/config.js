import { $ctx } from '@milkdown/kit/utils'

import { withMeta } from '../__internal__/meta'

export const defaultConfig = {
  extensions: [],
  languages: [],
  expandIcon: '⬇',
  searchIcon: '🔍',
  clearSearchIcon: '⌫',
  searchPlaceholder: 'Search language',
  noResultText: 'No result',
  copyText: 'Copy',
  copyIcon: '📋',
  onCopy: () => {},
  renderLanguage: (language) => language,
  renderPreview: () => null,
  previewToggleButton: (previewOnlyMode) => (previewOnlyMode ? 'Edit' : 'Hide'),
  previewLabel: 'Preview'
}

export const codeBlockConfig = $ctx(defaultConfig, 'codeBlockConfigCtx')

withMeta(codeBlockConfig, {
  displayName: 'Config<code-block>',
  group: 'CodeBlock'
})
