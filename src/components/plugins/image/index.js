import { imageBlockComponent, imageBlockConfig } from '@milkdown/kit/component/image-block'
import { imageInlineComponent, inlineImageConfig } from '@milkdown/kit/component/image-inline'
import imageIcon from '../../svg/picture.svg?raw'
import captionIcon from '../../icons/caption.svg?raw'
import confirmIcon from '../../icons/confirm.svg?raw'
export default (editor, config ={}) => {
  editor.config(ctx => {
    ctx.update(imageBlockConfig.key, (defaultConfig) => ({
      ...defaultConfig,
      imageIcon,
      captionIcon,
      uploadButton: '上传图片',
      confirmButton: confirmIcon,
      uploadPlaceholderText: '或粘贴图片链接',
      captionPlaceholderText: '图片标题',
      onUpload: config.onUpload,
    }))
    ctx.update(inlineImageConfig.key, (defaultConfig) => ({
      ...defaultConfig,
      imageIcon,
      uploadButton: '上传图片',
      confirmButton: confirmIcon,
      uploadPlaceholderText: '或粘贴图片链接',
      captionPlaceholderText: '图片标题',
      onUpload: config.onUpload,
    }))
  })
  .use(imageBlockComponent)
  .use(imageInlineComponent)
}