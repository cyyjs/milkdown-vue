/*
 * @Author: cyy
 * @Date: 2021-10-14 18:47:03
 * @LastEditors: cyy
 * @LastEditTime: 2022-07-19 16:39:42
 * @Description: 
*/
import './font/iconfont.css'
import { defineComponent, h, watch } from 'vue'
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from '@milkdown/core';
import { forceUpdate, getHTML, outline, switchTheme } from '@milkdown/utils';
import { VueEditor, useEditor } from '@milkdown/vue';
// import { commonmark, commonmarkPlugins, blockquote, SupportedKeys } from '@milkdown/preset-commonmark';
import { history } from '@milkdown/plugin-history';
import { cursor } from '@milkdown/plugin-cursor';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import slash from './plugins/slash';
import { emoji } from '@milkdown/plugin-emoji';
import { clipboard } from '@milkdown/plugin-clipboard';
import { math } from '@milkdown/plugin-math';
import { indent, indentPlugin } from '@milkdown/plugin-indent';
import { menu, menuPlugin, defaultConfig } from '@milkdown/plugin-menu';
import { diagram } from '@milkdown/plugin-diagram';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { nord, nordDark, nordLight } from './theme'
import gfm from './plugins/gfm';
import block from './plugins/block';
import getUploader from './plugins/uploder'
import 'katex/dist/katex.min.css';
import './theme/code.css'
// const nodes = commonmark.configure(blockquote, {
//     keymap: {
//       // [SupportedKeys.Blockquote]: 'Mod-Shift-b',
//     },
// });

// console.log(defaultConfig)
const myMenu = menu.configure(menuPlugin, {
  config: defaultConfig.map((section) => {
    return section.map((item) => {
      if (item.type !== 'select') return item;
      switch (item.text) {
        case 'Heading': {
          return {
            ...item,
            text: '标题选择',
            options: [
              { id: '1', text: '一级标题' },
              { id: '2', text: '二级标题' },
              { id: '3', text: '三级标题' },
              { id: '0', text: '正文' },
            ],
          };
        }
        default:
          return item;
      }
    })
  })
})

export default defineComponent({
  props: {
    modelValue: {
      type: String
    },
    config: {
      type: Object,
      default: () => ({
        menu: false,
        readonly: false,
        theme: 'auto' // dark, light, 自动
      })
    }
    
  },
  emits: ['update:modelValue'],
  setup(props, { expose, emit }) {
    const config = props.config
    let editorInstance
    const editor = useEditor((root) => {
      editorInstance = Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, props.modelValue);
          // 是否为只读
          ctx.set(editorViewOptionsCtx, { editable: () => !config.readonly });
          // 监听内容更新
          ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
            emit('update:modelValue', markdown)
          });
          // ctx.get(listenerCtx).updated((ctx, doc, prevDoc) => {
          //   console.log(doc.toJSON())
          // });
        })
        .use(listener)
        .use(gfm)
        .use(block)
        .use(history)
        .use(clipboard)
        .use(math)
        .use(prism)
        .use(tooltip)
        .use(cursor)
        .use(slash)
        .use(emoji)
        .use(diagram)
        .use(getUploader(config.uploader))
        .use(
          indent.configure(indentPlugin, {
            type: 'space', // available values: 'tab', 'space',
            size: 2,
          }),
        )

      // 菜单显示
      if (config.menu) {
        editorInstance.use(myMenu)
      }
      // 主题配置
      switch (config.theme) {
        case 'dark':
          editorInstance.use(nordDark)
          break
        case 'light':
          editorInstance.use(nordLight)
          break
        default:
          // 自动切换主题
          editorInstance.use(nord)
      }
      return editorInstance
    })
    
    // 只读切换
    watch(() => props.config, () => {
      editorInstance.action(forceUpdate())
      editorInstance.action(switchTheme(config.theme === 'dark' ? nordDark: nordLight))
    }, {deep: true})

    // console.log(editor)
    expose({
      loading: editor.loading,
      // 返回HTML
      getHtml: () => editorInstance.action(getHTML()),
      // 获取大纲
      getOutline: () => editorInstance.action(outline())
    })
    return () => h(VueEditor, { ...editor })
  }
})
