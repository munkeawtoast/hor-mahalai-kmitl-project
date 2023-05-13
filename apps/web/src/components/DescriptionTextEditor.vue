<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import {
  IconBold,
  IconPhotoFilled,
  IconMoodSmileFilled,
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
        console.log('AAAA')
        console.log(this.editor.getHTML())
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
    IconHeadingOff,
    IconStrikethrough,
  },
}
</script>
<template>
  <div
    class="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
  >
    <div
      class="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600"
    >
      <div
        class="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x"
      >
        <div class="flex flex-wrap items-center space-x-1 sm:pr-4">
          <button
            type="button"
            @click="editor.chain().focus().toggleBold().run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconBold size="20" />
            <span class="sr-only">ตัวหนา</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleItalic().run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconItalic size="20" />
            <span class="sr-only">ตัวเอียง</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleStrike().run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconStrikethrough size="20" />
            <span class="sr-only">StrikeThrough</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconH1 size="20" />
            <span class="sr-only">Header 1</span>
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconH2 size="20" />
            <span class="sr-only">Header 2</span>
          </button>
          <button
            type="button"
            @click="
              editor.chain().focus().resetAttributes('header', ['text']).run()
            "
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconHeadingOff size="18" />
            <span class="sr-only">Normal Text</span>
          </button>
        </div>
        <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
          <button
            type="button"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconList size="20" />
            <span class="sr-only">Add list</span>
          </button>
          <button
            type="button"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconListNumbers size="20" />
            <span class="sr-only">Add Numbered list</span>
          </button>
          <button
            type="button"
            class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="sr-only">Underline</span>
          </button>
        </div>
      </div>
    </div>
    <div class="relative rounded-b-lg bg-white p-4 pb-6">
      <label for="editor" class="sr-only">Publish post</label>
      <!-- <textarea -->
      <!--   id="editor" -->
      <!--   rows="8" -->
      <!--   class="block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400" -->
      <!--   placeholder="Write an article..." -->
      <!--   required -->
      <!-- ></textarea> -->
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
    <div></div>
  </div>
</template>
