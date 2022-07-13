/*
 * @Author: cyy
 * @Date: 2022-06-24 11:39:34
 * @LastEditors: cyy
 * @LastEditTime: 2022-06-24 11:42:52
 * @Description: 
 */

import { upload, uploadPlugin } from '@milkdown/plugin-upload';

const uploader = async (files, schema) => {
  const images = [];

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (!file) {
      continue;
    }

    // You can handle whatever the file type you want, we handle image here.
    if (!file.type.includes('image')) {
      continue;
    }

    images.push(file);
  }

  const nodes = await Promise.all(
    images.map(async (image) => {
      // const src = await YourUploadAPI(image);
      const src = ''
      const alt = image.name;
      return schema.nodes.image.createAndFill({
        src,
        alt,
      })
    }),
  );

  return nodes;
};

export default (config = {}) => {
  if (config.url) {
    return upload.configure(uploadPlugin, {
      uploader,
    })
  }
  return upload
}
