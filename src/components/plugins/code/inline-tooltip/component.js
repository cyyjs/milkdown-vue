import { Icon } from '@milkdown/kit/component'
import { defineComponent, h } from 'vue'
import inlineEditConfirm from '../../../icons/confirm.svg?raw'

export const LatexTooltip = defineComponent({
  props: {
    config: {
      type: Object,
      required: true
    },
    innerView: {
      type: Object,
      required: true
    },
    updateValue: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const innerViewRef = (el) => {
      if (!el || !(el instanceof HTMLElement)) return
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }
      if (props.innerView.value) {
        el.appendChild(props.innerView.value.dom)
      }
    }
    const onUpdate = (e) => {
      e.preventDefault()
      props.updateValue.value()
    }

    return () => {
      return h(
        'div',
        {
          class: 'container'
        },
        [
          props.innerView && h('div', { ref: innerViewRef }),
          h(
            'button',
            {
              onPointerdown: onUpdate
            },
            [h(Icon, { icon: inlineEditConfirm })]
          )
        ]
      )
    }
  }
})
