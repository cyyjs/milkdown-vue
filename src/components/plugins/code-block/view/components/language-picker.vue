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
import { computed, ref, onMounted, onUnmounted, watch, } from 'vue'
import Icon from '../../../__internal__/components/icon.vue'

const props = defineProps({
  language: {
    type: Object,
    required: true,
  },
  getReadOnly: {
    type: Function,
    required: true,
  },
  config: {
    type: Object,
    required: true,
  },
  getAllLanguages: {
    type: Function,
    required: true,
  },
  setLanguage: {
    type: Function,
    required: true,
  },
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
    placement: 'bottom-start',
  })
    .then(({ x, y }) => {
      Object.assign(languageList.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
    .catch(console.error)
})

const selectLanguage = e => {
  const active = document.activeElement
  if (
    active instanceof HTMLElement &&
    active.dataset.language
  ) {
    props.setLanguage(active.dataset.language)
  }
}
const onTogglePicker = e => {
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
    (languageInfo) =>
      languageInfo.name.toLowerCase() === props.language.value.toLowerCase()
  )

  const filtered = all.filter((languageInfo) => {
    const currentValue = filter.value.toLowerCase()

    return (
      (languageInfo.name.toLowerCase().includes(currentValue) ||
        languageInfo.alias.some((alias) =>
          alias.toLowerCase().includes(currentValue)
        )) &&
      languageInfo !== selected
    )
  })

  if (filtered.length === 0) return []

  if (!selected) return filtered

  return [selected, ...filtered]
})

const clickHandler = e => {
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
<style lang="less" scoped></style>
