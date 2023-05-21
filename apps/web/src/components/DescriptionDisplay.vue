<script setup>
import { defineProps } from 'vue'
import Typography from '@tiptap/extension-typography'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  modelValue: {
    default: '',
    type: String,
  },
})

const editor = new Editor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      code: false,
      codeBlock: false,
    }),
    Typography,
  ],
  editable: false,
  editorProps: {
    attributes: {
      class:
        'prose sm:prose-xs xl:prose-base max-w-[100%] min-h-[120px] focus:outline-none',
    },
  },
})
</script>
<template>
  <EditorContent :editor="editor" />
</template>
