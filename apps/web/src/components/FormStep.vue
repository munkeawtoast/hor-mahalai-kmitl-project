<script>
import {
  IconProgress,
  IconCircleDotted,
  IconCircleCheckFilled,
} from '@tabler/icons-vue'

export default {
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      default: 0,
    },
  },
  emits: {
    'update:currentStep': () =>
      this.currentStep >= 0 && this.currentStep < this.steps.length,
  },
  components: {
    IconCircleCheckFilled,
    IconProgress,
    IconCircleDotted,
  },
}
</script>
<template>
  <div class="flex justify-center">
    <ol class="items-center sm:flex xl:max-w-5xl">
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        class="relative mb-6 sm:mb-0"
      >
        <div class="flex items-center">
          <div
            class="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-primary ring-0 ring-white sm:ring-8"
          >
            <IconCircleCheckFilled v-if="index < currentStep" />
            <IconCircleDotted v-if="index > currentStep" />
            <IconProgress v-if="index === currentStep" />
          </div>
          <div
            v-if="index !== steps.length - 1"
            class="hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex"
          ></div>
        </div>
        <div class="mt-3 sm:pr-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Flowbite Library v1.3.0
          </h3>
          <time
            class="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
            >Released on January 5, 2022</time
          >
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">
            Get started with dozens of web components and interactive elements.
          </p>
        </div>
      </li>
    </ol>
  </div>
</template>
