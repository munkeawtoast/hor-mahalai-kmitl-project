<script>
export default {
  props: {
    show: {
      type: Boolean,
      
    }
  }
}
</script>
<template>
    <TransitionRoot
    :show="dialogShow.deleteRoom"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog
      @close="dialogShow.deleteRoom = false"
      class="bg-opacity-30 flex justify-center text-black items-center bg-black inset-0 fixed"
    >
      <DialogPanel class="max-w-md bg-white space-y-3 p-8 border rounded-lg">
        <DialogTitle>
          <div class="flex items-center space-x-2">
            <IconAlertCircle />
            <h1 class="font-bold text-2xl">แน่ใจแล้วว่าจะลบห้องนี้?</h1>
          </div>
        </DialogTitle>
        <DialogDescription>
          <p>หากยืนยัน จะไม่สามารถกู้คืนข้อมูลที่เขียนไว้ได้</p>
        </DialogDescription>
        <div class="flex justify-center items-center">
          <button
            class="p-3 px-4 mr-4 text-white rounded bg-danger"
            @click="deleteRoom()"
          >
            Deactivate
          </button>

          <button
            class="p-3 px-4 mr-4 rounded bg-white border"
            @click="dialogShow.deleteRoom = false"
          >
            Cancel
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  </TransitionRoot>
</template>