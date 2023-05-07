<script>
import ZormInput from '../components/ZormInput.vue'
import { z } from 'zod'
import { useZorm } from 'vue-zorm'
import UserIcon from '../components/UserIcon.vue'

const schema = z.object({
  name: z.string().min(3),
})

const zo = useZorm('formtest', schema, {
  onValidSubmit(e) {
    e.preventDefault()
    console.log(e.data)
  },
})

export default {
  data: () => ({
    zo,
    val: '',
    bruh: 'afjodiasfi',
    a: zo.fields.name,
  }),
  components: { ZormInput },
}
</script>
<template>
  <div>
    <form :ref="zo.getRef">
      <ZormInput
        v-model="val"
        :field="zo.fields.name('name')"
        :error="zo.errors.name"
      />
    </form>
    {{ JSON.stringify(zo.validation) }}
  </div>
</template>
