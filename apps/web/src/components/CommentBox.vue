<script>
import { IconTrash } from '@tabler/icons-vue'
import { useUserStore } from '../stores'

export default {
  data() {
    const userStore = useUserStore()
    return {
      userStore,
    }
  },
  components: {
    IconTrash,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div
    class="w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black flex"
  >
    <div class="w-12 h-12 bg-less-black"></div>
    <div>
      <p>
        {{ comment.User.username }}
        {{ comment.createdAt.substring(0, 10) }}
      </p>
      <p>{{ comment.description }}</p>
    </div>
    <div v-for="(child, index) in comment.ChildrenComments" :key="index">
      <CommentBox :comment="child" />
    </div>
    <div v-if="userStore.role === 'ADMIN' || userStore.id === comment.ownerid">
      <IconTrash />
    </div>
  </div>
</template>
