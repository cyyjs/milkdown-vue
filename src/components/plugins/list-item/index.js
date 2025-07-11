import {
  listItemBlockComponent,
  listItemBlockConfig
} from '@milkdown/kit/component/list-item-block'

import bulletIcon from '../../icons/bullet.svg?raw'
import checkBoxCheckedIcon from '../../icons/check-box-checked.svg?raw'
import checkBoxUncheckedIcon from '../../icons/check-box-unchecked.svg?raw'

function configureListItem(ctx, config) {
  ctx.set(listItemBlockConfig.key, {
    renderLabel: ({ label, listType, checked }) => {
      if (checked == null) {
        if (listType === 'bullet') return config?.bulletIcon ?? bulletIcon
        return label
      }

      if (checked) return config?.checkBoxCheckedIcon ?? checkBoxCheckedIcon

      return config?.checkBoxUncheckedIcon ?? checkBoxUncheckedIcon
    }
  })
}

export default (editor, config) => {
  editor.config((ctx) => configureListItem(ctx, config)).use(listItemBlockComponent)
}
