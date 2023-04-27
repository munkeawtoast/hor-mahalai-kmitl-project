<script>
import { useLocalStorage } from '@vueuse/core'
import { defineComponent } from 'vue'

const a = useLocalStorage('a', { test: 1, test2: 2 })

export default defineComponent({
  data: () => ({ a }),
})
</script>

<template>
  <div>
    {{ a }}
  </div>
  <button @click="a.test = 50">brh</button>
</template>
