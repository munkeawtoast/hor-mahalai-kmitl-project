<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  props: ['modelValue', 'faIcon', 'inputPlaceholder', 'inputType'],
  emits: ['update:modelValue'],
  components: {
    FontAwesomeIcon,
  },
}
</script>
<template>
  <div
    class="flex flex-1 border border-gray bg-white focus-within:border-danger"
  >
    <span class="p-2">
      <FontAwesomeIcon :icon="faIcon" fixed-width></FontAwesomeIcon>
    </span>
    <input
      :value="modelValue"
      @input="
        ($event) => {
          $emit('update:modelValue', $event.target.value)
        }
      "
      :type="inputType"
      :placeholder="inputPlaceholder"
      class="flex-1 border-l border-gray indent-1 outline-none focus:border-danger"
    />
  </div>
</template>
<style></style>
