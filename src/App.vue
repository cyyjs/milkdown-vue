<template lang="pug">
main
  .left
    editor(v-model='doc' ref='editorRef' :config='config' @save='save' :uploader='uploader')
  .right
    .btns
      button(@click='getHtml') getHtml
      button(@click='getOutline') getOutline
      button(@click='config.readonly = !config.readonly') readonly:{{ config.readonly }}
      button(@click='config.theme = config.theme === "light" ? "dark" : "light"') theme:{{ config.theme }}
      button(@click='setValue(doc2)') setValue
      a(href='https://github.com/cyyjs/milkdown-vue' target='_black')
        img.github(src='/fluidicon.png' alt)
    | #Doc
    textarea(v-model='doc' disabled)
    | #Print
    textarea(v-model='log' disabled)
</template>
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import Editor from '../'
import { ref } from 'vue'
import Editor from './components/MilkdownEditorWrapper.vue'
// import Editor from './components/index.js'
import Readme from '../README.md?raw'

const editorRef = ref(null)
const config = ref({
  readonly: false,
  menu: true,
  theme: 'auto'
})
const doc = ref(Readme)
const doc2 = ref(`### Hello Wold
\`\`\`javascript
console.log("Hello Wold!")
\`\`\`

`)
const log = ref('')
const getHtml = () => {
  log.value = editorRef.value.getHtml()
}
const getOutline = () => {
  log.value = JSON.stringify(editorRef.value.getOutline(), null, 2)
}
const setValue = (v) => {
  editorRef.value.setValue(v)
}
const save = (v) => {
  console.log(v)
}
const uploader = (images) => {
  return [
    {
      url: 'https://cyyjs.top/_nuxt/img/qrcode.5c9aef0.jpg',
      name: 'head'
    }
  ]
}
</script>

<style>
.right {
  padding-left: 20px;
  box-sizing: border-box;
}

.btns {
  margin-bottom: 10px;
}

.right button {
  margin-right: 10px;
  padding: 8px 10px;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}

main {
  display: flex;
}

main > div {
  width: 50%;
  flex-shrink: 0;
}

textarea {
  height: 200px;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
}

.github {
  width: 32px;
  height: 32px;
  float: right;
}
</style>
