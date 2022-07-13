<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Milkdown from './components/Milkdown'
import { ref } from 'vue'
const milkdown = ref(null)
const config = ref({
  readonly: false,
  menu: true
})
const doc = ref(`### a`)
const getHtml = () => {
  console.log(milkdown.value.loading)
  console.log(milkdown.value.getHtml())
}
const getOutline = () => {
  console.log(milkdown.value.getOutline())
}
</script>

<template>
  <Milkdown class="editor" v-model="doc" ref="milkdown" :config="config"/>
  <button @click="getHtml">getHtml</button>
  <button @click="getOutline">getOutline</button>
  <button @click="config.readonly = !config.readonly">readonly:{{config.readonly}}</button>
  <br>

  <textarea v-model="doc" disabled></textarea>
</template>

<style>
html,body, #app {
  height: 100%;
}
.editor {
  border: 1px solid #ccc;
}
textarea {
  height: 200px;
}
</style>
