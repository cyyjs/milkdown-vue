import {
  configureLinkTooltip,
  linkTooltipConfig,
  linkTooltipPlugin
} from '@milkdown/kit/component/link-tooltip'
import { commonmark, linkSchema } from '@milkdown/kit/preset/commonmark'
import copyIcon from '../icons/copy.svg?raw'
import editIcon from '../icons/edit.svg?raw'
import confirmIcon from '../icons/confirm.svg?raw'
import removeIcon from '../icons/remove.svg?raw'

export default (editor, config) => {
  editor
    // .config(crepeFeatureConfig(CrepeFeature.LinkTooltip))
    .config(configureLinkTooltip)
    .config((ctx) => {
      ctx.update(linkTooltipConfig.key, (prev) => ({
        ...prev,
        linkIcon: config?.linkIcon ?? copyIcon,
        editButton: config?.editButton ?? editIcon,
        removeButton: config?.removeButton ?? removeIcon,
        confirmButton: config?.confirmButton ?? confirmIcon,
        inputPlaceholder: config?.inputPlaceholder ?? '粘贴链接...',
        onCopyLink: config?.onCopy ?? (() => {})
      }))
    })
    .use(commonmark)
    .use(linkTooltipPlugin)
}
