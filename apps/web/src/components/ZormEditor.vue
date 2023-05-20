<script>
import DescriptionTextEditor from './DescriptionTextEditor.vue'

export default {
  props: {
    modelValue: {
      default: '',
      type: String,
    },
    id: {
      required: true,
      type: String,
    },
    field: {
      required: true,
      type: null,
    },
    error: {
      required: true,
      type: null,
    },
    label: {
      required: false,
      default: '',
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(text) {
        this.$emit('update:modelValue', text)
      },
    },
  },
  emits: ['update:modelValue'],
  components: { DescriptionTextEditor },
}
</script>
<template>
  <div>
    <label v-if="label" for="first_name" class="mb-2 block font-medium">{{
      label
    }}</label>
    <input
      :id="id"
      :name="field"
      type="hidden"
      :value="value"
      :required="required"
    />
    <DescriptionTextEditor
      :main-class="
        error('ring-red-400 ring focus:border-red-400 focus:ring-red-400')
      "
      v-model="value"
    />
    <span class="flex h-6 items-center text-xs text-danger">
      {{ error()?.message }}
    </span>
  </div>
</template>
