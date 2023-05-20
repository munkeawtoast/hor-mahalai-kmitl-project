<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import {
  IconBold,
  IconList,
  IconListNumbers,
  IconItalic,
  IconH1,
  IconH2,
  IconHeadingOff,
  IconStrikethrough,
} from '@tabler/icons-vue'

export default {
  mounted() {
    this.editor = new Editor({
      content: this.modelValue ?? '',
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      },
      extensions: [
        StarterKit.configure({
          code: false,
          codeBlock: false,
        }),
        Typography,
      ],
      editorProps: {
        attributes: {
          class:
            'prose sm:prose-xs xl:prose-base max-w-[100%] min-h-[120px] focus:outline-none',
        },
      },
    })
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    lengthLimit: {
      type: Number,
      default: 1500,
    },
    mainClass: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    editor: null,
  }),
  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  components: {
    EditorContent,
    IconList,
    IconListNumbers,
    IconBold,
    IconItalic,
    IconH1,
    IconH2,
    IconStrikethrough,
  },
}
</script>
<template>
  <div
    :class="mainClass"
    class="w-full rounded-lg border border-lesser-gray bg-white dark:border-gray-600 dark:bg-gray-700"
  >
    <div class="flex items-center justify-between border-b px-3 py-2">
      <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x">
        <div class="flex flex-wrap items-center space-x-1 sm:pr-4">
          <button
            type="button"
            @click="editor.chain().focus().toggleBold().run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <IconBold size="20" />
            <span class="sr-only">ตัวหนา</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleItalic().run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <IconItalic size="20" />
            <span class="sr-only">ตัวเอียง</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleStrike().run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <IconStrikethrough size="20" />
            <span class="sr-only">StrikeThrough</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <IconH1 size="20" />
            <span class="sr-only">Header 1</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <IconH2 size="20" />
            <span class="sr-only">Header 2</span>
          </button>
        </div>
        <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
          <button
            type="button"
            @click="editor.chain().focus().toggleBulletList().run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <IconList size="20" />
            <span class="sr-only">Add list</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleOrderedList().run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <IconListNumbers size="20" />
            <span class="sr-only">Add Numbered list</span>
          </button>
        </div>
      </div>
    </div>
    <div class="relative rounded-b-lg bg-white p-4 pb-6">
      <label for="editor" class="sr-only">Publish post</label>
      <EditorContent :editor="editor" />
      <span
        class="absolute bottom-2 right-4"
        :class="[
          (editor ? editor.getText().length > lengthLimit : null)
            ? 'text-danger'
            : 'text-gray-400',
        ]"
        >{{ editor ? editor.getText().length : 0 }}/{{ lengthLimit }}
      </span>
    </div>
  </div>
</template>
