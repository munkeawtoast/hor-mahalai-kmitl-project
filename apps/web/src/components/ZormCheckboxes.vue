<script>
export default {
  props: {
    modelValue: {
      default: () => [],
      type: Array,
    },
    id: {
      required: true,
      type: String,
    },
    target: {
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
    fields: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    modelClone: {
      get() {
        return [...this.modelValue]
      },
      set(newValue) {
        this.$emit('update:modelValue', [...newValue])
      },
    },
  },
}
</script>
<template>
  <div>
    <label :for="id" v-if="label !== ''" class="mb-2 block font-medium">{{
      label
    }}</label>
    <div class="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(item, index) in modelClone" :key="item.name">
        <div
          class="flex items-center rounded border border-gray-200 bg-white pl-4"
        >
          <input
            type="hidden"
            v-model="modelClone[index].name"
            checked
            :name="fields[target](index).name('name')"
          />
          <input
            type="checkbox"
            :id="fields[target](index).value('id')"
            :name="fields[target](index).value('name')"
            v-model="modelclone[index].value"
            class="h-4 w-4 rounded border-lesser-gray bg-gray-100 text-primary focus:ring-2 focus:ring-primary-soft"
          />
          <label
            :for="target(index).value('id')"
            class="ml-2 w-full py-4 text-sm font-medium text-black dark:text-lesser-gray"
            >{{ item.name }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
