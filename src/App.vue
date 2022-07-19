<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Milkdown from './components/Milkdown'
import { ref } from 'vue'
const milkdown = ref(null)
const config = ref({
  readonly: false,
  menu: true,
  theme: 'auto'
})
const doc = ref(`### Hello
\`\`\`javascript
console.log("hello!")
\`\`\`
`)
const getHtml = () => {
  console.log(milkdown.value.loading)
  console.log(milkdown.value.getHtml())
}
const getOutline = () => {
  console.log(milkdown.value.getOutline())
}
</script>

<template>
<main>
  <Milkdown class="left" v-model="doc" ref="milkdown" :config="config"/>
  <div class="right">
    <div>
      <button @click="getHtml">getHtml</button>
      <button @click="getOutline">getOutline</button>
      <button @click="config.readonly = !config.readonly">readonly:{{config.readonly}}</button>
      <button @click="config.theme = config.theme === 'light' ? 'dark' : 'light'">theme:{{config.theme}}</button>
    </div>
    <textarea v-model="doc" disabled></textarea>
  </div>
</main>
</template>

<style>
html,body, #app {
  height: 100%;
}
.left {
  border: 1px solid #ccc;
  margin-right: 20px;
}
.right button {
  margin-right: 10px;
}
main {
  display: flex;
}
main>div {
  width: 50%;
  flex-shrink: 0;
}
textarea {
  height: 200px;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
}
</style>
