import {
  tableBlock,
  tableBlockConfig,
} from '@milkdown/kit/component/table-block'

// import { crepeFeatureConfig } from '../../core/slice'

import alignCenterIcon from '../../icons/align-center.svg?raw'
import alignLeftIcon from '../../icons/align-left.svg?raw'
import alignRightIcon from '../../icons/align-right.svg?raw'
import dragHandleIcon from '../../icons/drag-handle.svg?raw'
import plusIcon from '../../icons/plus.svg?raw'
import removeIcon from '../../icons/remove.svg?raw'

// import { CrepeFeature } from '../index'

export default (editor, config) => {
  editor
    // .config(crepeFeatureConfig(CrepeFeature.Table))
    .config((ctx) => {
      ctx.update(tableBlockConfig.key, (defaultConfig) => ({
        ...defaultConfig,
        renderButton: (renderType) => {
          switch (renderType) {
            case 'add_row':
              return config?.addRowIcon ?? plusIcon
            case 'add_col':
              return config?.addColIcon ?? plusIcon
            case 'delete_row':
              return config?.deleteRowIcon ?? removeIcon
            case 'delete_col':
              return config?.deleteColIcon ?? removeIcon
            case 'align_col_left':
              return config?.alignLeftIcon ?? alignLeftIcon
            case 'align_col_center':
              return config?.alignCenterIcon ?? alignCenterIcon
            case 'align_col_right':
              return config?.alignRightIcon ?? alignRightIcon
            case 'col_drag_handle':
              return config?.colDragHandleIcon ?? dragHandleIcon
            case 'row_drag_handle':
              return config?.rowDragHandleIcon ?? dragHandleIcon
          }
        },
      }))
    })
    .use(tableBlock)
}
