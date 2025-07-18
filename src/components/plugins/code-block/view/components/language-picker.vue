<template lang="pug">
button.language-button(
  type="button"
  ref="triggerRef"
  @click.prevent.stop="onTogglePicker"
  :data-expanded="showPicker"
)
  | {{language.value || 'Text'}}
  .expand-icon
    Icon(:icon="config.expandIcon")
.language-picker(ref="pickerRef")
  .list-wrapper(v-if="showPicker")
    .search-box
      .search-icon
        Icon(:icon="config.searchIcon")
      input.search-input(
        ref="searchRef"
        :placeholder="config.searchPlaceholder"
        v-model="filter"
        @keydown.esc="filter = ''"
      )
      .clear-icon(
        :class="{'hidden': !filter.length}"
        @mousedown.prevent="filter = ''"
      )
        Icon(:icon="config.clearSearchIcon")
    ul.language-list(
      role="listbox"
      @keydown.enter="selectLanguage"
    )
      li.language-list-item.no-result(v-if="!languages.length") {{ config.noResultText }}
      template(v-else)
        li.language-list-item(
          v-for="languageInfo in languages"
          :key="languageInfo.name"
          role="listitem"
          :tabindex="0"
          :data-language="languageInfo.name"
          :aria-selected="languageInfo.name.toLowerCase() === language.value.toLowerCase()"
          @click="() => {selectLanguage(languageInfo.name); showPicker = false;}"
        ) {{ config.renderLanguage( languageInfo.name, languageInfo.name.toLowerCase() === language.value.toLowerCase() )}}
</template>
<script setup>
import { computePosition } from '@floating-ui/dom'
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import Icon from '../../../__internal__/components/icon.vue'

const props = defineProps({
  language: {
    type: Object,
    required: true
  },
  getReadOnly: {
    type: Function,
    required: true
  },
  config: {
    type: Object,
    required: true
  },
  getAllLanguages: {
    type: Function,
    required: true
  },
  setLanguage: {
    type: Function,
    required: true
  }
})

const triggerRef = ref()
const showPicker = ref(false)
const searchRef = ref()
const pickerRef = ref()
const filter = ref('')

watch([showPicker, triggerRef, pickerRef], () => {
  filter.value = ''
  const picker = triggerRef.value
  const languageList = pickerRef.value
  if (!picker || !languageList) return

  computePosition(picker, languageList, {
    placement: 'bottom-start'
  })
    .then(({ x, y }) => {
      Object.assign(languageList.style, {
        left: `${x}px`,
        top: `${y}px`
      })
    })
    .catch(console.error)
})

const selectLanguage = (e) => {
  const active = document.activeElement
  if (active instanceof HTMLElement && active.dataset.language) {
    props.setLanguage(active.dataset.language)
  }
}
const onTogglePicker = (e) => {
  if (props.getReadOnly()) return

  const next = !showPicker.value
  showPicker.value = next
  if (next) {
    setTimeout(() => searchRef.value?.focus(), 0)
  }
}

const languages = computed(() => {
  if (!showPicker.value) return []

  const all = props.getAllLanguages() ?? []
  const selected = all.find(
    (languageInfo) => languageInfo.name.toLowerCase() === props.language.value.toLowerCase()
  )

  const filtered = all.filter((languageInfo) => {
    const currentValue = filter.value.toLowerCase()

    return (
      (languageInfo.name.toLowerCase().includes(currentValue) ||
        languageInfo.alias.some((alias) => alias.toLowerCase().includes(currentValue))) &&
      languageInfo !== selected
    )
  })

  if (filtered.length === 0) return []

  if (!selected) return filtered

  return [selected, ...filtered]
})

const clickHandler = (e) => {
  const target = e.target

  if (triggerRef.value && triggerRef.value.contains(target)) return

  const picker = pickerRef.value
  const trigger = triggerRef.value
  if (!trigger || !picker) return

  if (trigger.dataset.expanded !== 'true') return

  if (!picker.contains(target)) showPicker.value = false
}

onMounted(() => {
  window.addEventListener('click', clickHandler)
})

onUnmounted(() => {
  window.removeEventListener('click', clickHandler)
})
</script>
<style lang="less" scoped>
.language-button {
  gap: 5px;
  border-radius: 6px;
  border: 0;
  padding: 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  transition: all 0.2s ease-in-out;
  background-color: transparent;
  color: #ccc;
  font-size: 12px;

  .expand-icon {
    display: none;
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease-in-out;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &:hover {
    background-color: #fff;
  }

  &[data-expanded='true'] .expand-icon {
    transform: rotate(180deg);
  }
}
.list-wrapper {
  background: var(--cyyjs-menu-bg);
  border-radius: 6px;
  box-shadow:
    0px 2px 6px 0px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  width: 180px;
}

.language-picker {
  width: max-content;
  position: absolute;
  z-index: 2;
  padding-top: 5px;
  right: 5px;
  left: inherit !important;

  .language-list {
    max-height: 256px;
    overflow-y: auto;
    margin: 0;
    padding: 0;

    .language-list-item {
      cursor: pointer;
      margin: 0;
      height: 26px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 8px;
      font-size: 12px;

      &:hover {
        background: #dddddd9f;
      }

      &:focus-visible {
        outline: none;
        background: cornsilk;
      }

      .leading {
        width: 16px;
        height: 16px;
      }

      &.no-result {
        display: block;
        text-align: center;
      }
    }
  }

  .list-wrapper {
    padding-top: 10px;
  }

  .search-box {
    display: flex;
    align-items: center;
    margin: 0 8px 8px 8px;
    background: var(--cyyjs-input-bg);
    height: 30px;
    border-radius: 6px;
    outline: none;
    gap: 8px;
    padding: 0;
    font-size: 12px;

    .search-input {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--cyyjs-color);

      &:focus {
        outline: none;
      }
    }

    .search-icon {

      // &>span {
      //   width: 16px;
      //   height: 16px;
      // }
      svg {
        width: 16px;
        height: 16px;
      }
    }

    .clear-icon {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      cursor: pointer;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
