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
    placeholder: {
      type: String,
      default: '',
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
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :name="field"
      :class="error('ring-red-400  focus:border-red-400 focus:ring-red-400')"
      class="resize-none block w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
    />
    <span class="flex h-6 items-center text-xs text-danger">
      {{ error()?.message }}
    </span>
  </div>
</template>
