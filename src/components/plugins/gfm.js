import { gfm, image, link, commonmark } from '@milkdown/preset-gfm'
import { defineComponent, inject } from 'vue'
import { nodeMetadata } from '@milkdown/vue'
const MyLink = defineComponent({
  name: 'my-link',
  setup(_, { slots }) {
    const node = inject(nodeMetadata, {}).node;
    const href = node?.value?.attrs?.href
    return () => <a target="_blank" href={href}>{slots.default?.()}</a>;
  }

});

export default (renderVue) => gfm.configure(image, {
  placeholder: '添加图片',
  input: {
    placeholder: '请输入图片地址',
    buttonText: '确认'
  }
}).configure(link, {
  view: renderVue(MyLink),
  input: {
    placeholder: '请输入链接地址',
    buttonText: '确认'
  }
})
