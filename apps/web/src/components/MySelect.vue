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
    name: {
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
    <label v-if="label" for="first_name" class="mb-2 block font-medium">{{
      label
    }}</label>
    <select
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      :name="name"
      :id="id"
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
    <span class="flex h-6 items-center text-xs text-danger"> </span>
  </div>
  <!-- <div> -->
  <!--   <label v-if="label" for="first_name" class="mb-2 block font-medium">{{ -->
  <!--     label -->
  <!--   }}</label> -->
  <!---->
  <!--   <input -->
  <!--     :value="modelValue" -->
  <!--     @input="$emit('update:modelValue', $event.target.value)" -->
  <!--     type="text" -->
  <!--     :placeholder="placeholder" -->
  <!--     :required="required" -->
  <!--     :name="field" -->
  <!--     :class="error('ring-red-400  focus:border-red-400 focus:ring-red-400')" -->
  <!--     class="block w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black focus:border-primary focus:ring-primary" -->
  <!--   /> -->
  <!-- </div> -->
</template>
