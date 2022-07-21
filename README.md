# milkdown-vue

基于[milkdown](https://github.com/Saul-Mirone/milkdown)的封装，整合了所有常用插件的`Vue3`组件 。

[Demo](https://cyyjs.github.io/milkdown-vue)

## Install

```bash
yarn add milkdown-vue
```

## Usage

### 模板代码

``` html
<editor v-model="doc" ref="editorRef" :config="config" :uploader="uploader" @save="save" />
```

### Props

1、 `v-model`: `markdown`内容
2、 `config`: 组件配置相关
|属性|类型|默认值|说明|
|--|--|--|--|
|readonly|Boolean|false|是否为只读|
|menu|Boolean|false|是否展示菜单|
|theme|String|`auto`|主题样式auto、dark, light|

3、`uploader`: 图片上传自定义方法，接收原始图片文件，许返回包含图片地址的对象数组。

```json
[{
  "url": "图片地址",
  "name": "名称"
}]
```

### Event

`save`: 使用保存快捷键`Mod+s`时，接收`value`值的回调

### 快捷键

参考[preset-gfm](https://milkdown.dev/preset-gfm)插件的快捷键。

这里新增加了`Mod+/`快捷键，可在不同的窗口编辑模式中切换


### `vue setup`示例

``` js
// 组件引入
import Editor from 'milkdown-vue'
import { ref } from 'vue'
const editorRef = ref(null)
const config = ref({
  // 是否为只读模式
  readonly: false,
  // 是否展示菜单
  menu: true,
  // 主题样式auto、dark, light
  theme: 'auto'
})

const doc = ref('')

const save = v => {
  // markdown 内容字符串
  console.log(v)
}

// 自定义上传
const uploader = (images) => {
  // 图片原始文件数组对象
  console.log(images)
  // 返回上传后的地址和名称
  return [{
    url: "https://cyyjs.top/_nuxt/img/qrcode.5c9aef0.jpg",
    name: "head"
  }]
}

// 获取html内容
const getHtml = () => {
  console.log(editorRef.value.getHtml())
}
// 获取目录结构
const getOutline = () => {
  console.log(editorRef.value.getOutline())
}
// 设置markdown 内容
const setValue = (v) => {
  editorRef.value.setValue(v)
}
```
