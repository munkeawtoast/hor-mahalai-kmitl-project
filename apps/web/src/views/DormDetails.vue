<script>
import DormDetails from '../components/DormDetails.vue'
import { useZorm } from 'vue-zorm'
import { zPostComment } from '@shared/validator'
import { generateDorms } from '@helper/data-gen'
import CommentBox from '../components/CommentBox.vue'
import DormRating from '../components/DormRating.vue'
import DormRoom from '../components/DormRoom.vue'
import ZormTextArea from '../components/ZormTextArea.vue'
import { axios } from '../utils'
import { useUserStore } from '../stores'

const validator = zPostComment()

export default {
  props: {
    dormID: {
      type: String,
      required: true,
    },
  },
  data() {
    let userStore = useUserStore()
    const zo = useZorm('userComment', validator, {
      onValidSubmit: async e => {
        e.preventDefault()
        console.log(e.data)
        await axios.post(`/dorms/${this.$route.params.dormID}/comment`, e.data)
      },
      // onFormData: async e => {
      //   console.log(e)
      // },
      // customIssues: serverSideIssues
    })
    return {
      userStore,
      zo,
      dormData: generateDorms(this.dormID, this.dormID + 1)[0],
      description: '',
      dormf: null,
    }
  },
  beforeMount() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const response = await axios.get(`/dorms/${this.$route.params.dormID}`)
      this.dormf = response.data
    },
  },
  components: {
    DormDetails,
    CommentBox,
    DormRating,
    ZormTextArea,
    DormRoom,
  },
}
</script>
<template>
  <DormDetails :dorminfo="dormf" />
  <DormRoom :room-data="dormf?.Rooms" />
  <DormRating
    :dormID="dormf.dormID"
    v-if="!dormf.Ratings.map(rate => rate.userID).includes(userStore.id)"
  />
  <form :ref="zo.getRef">
    <ZormTextArea
      label="Write your comment"
      v-model="description"
      :id="zo.fields.description('id')"
      :field="zo.fields.description('name')"
      :error="zo.errors.description"
    ></ZormTextArea>
    <input
      class="w-48 cursor-pointer rounded-md border border-lesser-gray p-2"
      type="submit"
      value="Submit"
    />
  </form>
  <CommentBox></CommentBox>
</template>
