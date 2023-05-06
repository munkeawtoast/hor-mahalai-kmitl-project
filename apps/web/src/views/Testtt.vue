<script>
import ZormInput from '../components/ZormInput.vue'
import { z } from 'zod'
import { useZorm } from 'vue-zorm'

const schema = z.object({
  name: z.string(),
})

const zo = useZorm('formtest', schema, {
  onValidSubmit(e) {
    e.preventDefault()
    console.log(e.data)
  }
})

export default {
  data: () => ({
    zo,
    val: '',
  }),
  components: { ZormInput },
}
</script>
<template>
  {{ JSON.stringify(zo.validation) }}
  <form :ref="zo.getRef">
    <div>
      <label for="first_name" class="mb-2 block font-medium">ชื่อห้อง</label>
      <input
        type="text"
        :placeholder="`ห้องไม่มีชื่อ`"
        required
        v-model="val"
        :name="zo.fields.name('name')"
        :class="
          zo.errors.name(
            'ring-red-400  focus:border-red-400 focus:ring-red-400',
          )
        "
        class="block w-full rounded-lg border border-lesser-gray bg-white p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
      />
      <span class="flex h-6 items-center text-xs text-danger">
        {{ zo.errors.name()?.message }}
      </span>
    </div>
    <!-- <ZormInput v-model="val" :validator="zo.fields.name()" /> -->
  </form>
</template>
