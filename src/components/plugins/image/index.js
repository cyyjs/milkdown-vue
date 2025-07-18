import { imageBlockComponent, imageBlockConfig } from '@milkdown/kit/component/image-block'
import { imageInlineComponent, inlineImageConfig } from '@milkdown/kit/component/image-inline'
import { upload, uploadConfig } from '@milkdown/kit/plugin/upload'

import imageIcon from '../../icons/image.svg?raw'
import captionIcon from '../../icons/caption.svg?raw'
import confirmIcon from '../../icons/confirm.svg?raw'

export default (editor, config = {}) => {
  const uploader = async (files, schema) => {
    const images = []

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)
      if (!file) {
        continue
      }
      if (!file.type.includes('image')) {
        continue
      }

      images.push(file)
    }

    const nodes = await Promise.all(
      images.map(async (image) => {
        const src = await config.onUpload(image)
        const alt = image.name
        return schema.nodes.image.createAndFill({
          src,
          alt
        })
      })
    )
    return nodes
  }
  editor
    .config((ctx) => {
      // 拖拽上传
      ctx.update(uploadConfig.key, (prev) => ({
        ...prev,
        uploader
      }))
      ctx.update(imageBlockConfig.key, (defaultConfig) => ({
        ...defaultConfig,
        imageIcon,
        captionIcon,
        uploadButton: '上传图片',
        confirmButton: confirmIcon,
        uploadPlaceholderText: '或粘贴图片链接',
        captionPlaceholderText: '图片标题',
        onUpload: config.onUpload
      }))
      ctx.update(inlineImageConfig.key, (defaultConfig) => ({
        ...defaultConfig,
        imageIcon,
        uploadButton: '上传图片',
        confirmButton: confirmIcon,
        uploadPlaceholderText: '或粘贴图片链接',
        captionPlaceholderText: '图片标题',
        onUpload: config.onUpload
      }))
    })
    .use(upload)
    .use(imageBlockComponent)
    .use(imageInlineComponent)
}
