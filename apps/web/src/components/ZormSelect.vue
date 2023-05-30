<script>
export default {
  props: {
    modelValue: {
      type: null,
      default: null,
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
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
}
</script>
<template>
  <div>
    <label v-if="label" :for="id" class="mb-2 block font-medium">{{
      label
    }}</label>
    <select
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      :name="field"
      :id="id"
      :class="error('ring-red-400  focus:border-red-400 focus:ring-red-400')"
      class="block w-full rounded-lg border border-lesser-gray bg-gray p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
    >
      <option
        v-if="placeholder"
        :value="null"
        selected
        disabled
        :label="placeholder"
      />
      <option
        v-for="opt in options"
        :key="opt.id"
        :value="opt.id"
        :label="opt.label"
      />
    </select>
    <span class="flex h-6 items-center text-xs text-danger">
      {{ error()?.message }}
    </span>
  </div>
</template>
