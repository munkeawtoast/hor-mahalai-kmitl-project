<script>
export default {
  // props: ['modelValue', 'label', 'validator', 'error', 'required', 'placeholder'],
  props: {
    modelValue: {
      default: '',
      type: String,
    },
    validator: {
      required: true,
      type: null,
    },
    error: {
      required: true,
      type: Function,
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
    field: {
      type: String,
      required: true,
    },
  },
  // computed: {
  //   nameBind: () => this.validator()('name'),
  //   errorText: () => this.error()?.message,
  // },
  emits: ['update:modelValue'],
}
</script>
<template>
  <div>
    <label v-if="label" for="first_name" class="mb-2 block font-medium">{{
      label
    }}</label>

    <!-- <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      :placeholder="placeholder"
      :required="required"
      :name="validator[field]"
      :class="error('ring-red-400  focus:border-red-400 focus:ring-red-400')"
      class="block w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
    />
    <span class="flex h-6 items-center text-xs text-danger">
      {{ errorText }}
    </span> -->
  </div>
</template>
