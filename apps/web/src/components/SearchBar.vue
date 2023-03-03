<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  emits: {
    search: null,
    textChange: null,
  },
  props: {
    placeholderText: {
      required: false,
      type: String,
      default: 'ค้นหา',
    },
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    handleSearch() {
      this.emit('search')
    },
    handleTextChange() {
      this.emit('textChange')
    },
  },
}
</script>
<template>
  <div class="wrapper">
    <input
      type="text"
      placeholder="ค้นหา"
      @keyup.enter="handleSearch"
      @input="handleTextChange"
    />
    <FontAwesomeIcon
      :icon="['fa-solid', 'fa-search']"
      size="lg"
      flip="horizontal"
      @click="handleSearch"
    />
  </div>
</template>
<style scoped>
.wrapper {
  background-color: var(--color-background-mute);
  color: var(--color-detail);
  font-size: 13px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  width: fit-content;
}
input[type='text'] {
  all: unset;
  padding-right: 0.5em;
  width: 12em;
  color: var(--color-text);
}
</style>
