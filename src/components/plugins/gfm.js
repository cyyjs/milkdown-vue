import { gfm, image, link } from '@milkdown/preset-gfm'

export default gfm.configure(image, {
  placeholder: '添加图片',
  input: {
    placeholder: '请输入图片地址',
    buttonText: '确认'
  }
}).configure(link, {
  input: {
    placeholder: '请输入链接地址',
    buttonText: '确认'
  }
})
