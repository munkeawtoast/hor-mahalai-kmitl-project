<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  components: {
    FontAwesomeIcon,
  },
}
</script>
<template>
  <div class="border border-gray bg-white focus-within:border-danger">
    <span class="border-r border-gray">
      <FontAwesomeIcon icon="fa-solid fa-user"></FontAwesomeIcon>
    </span>
    <input
      :value="modelValue"
      @input="
        ($event) => {
          $emit('update:modelValue', $event.target.value)
        }
      "
      type="text"
      placeholder="Username"
      class="indent-1 focus:border-danger"
    />
  </div>
</template>
<style></style>
