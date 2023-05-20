<script>
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
    label: {
      required: false,
      default: '',
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    withGap: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
}
</script>
<template>
  <div>
    <label v-if="label" for="first_name" class="mb-2 block font-medium">{{
      label
    }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="block w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
    />
    <div v-if="withGap" class="flex h-6 items-center text-xs text-danger" />
  </div>
</template>
