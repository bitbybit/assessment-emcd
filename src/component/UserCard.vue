<template>
  <div
    class="py-8 px-8 w-full max-w-sm mx-auto space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6"
  >
    <img
      class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
      :src="props.imageUrl"
      :alt="props.name"
    />

    <div class="text-center space-y-2 sm:text-left overflow-hidden">
      <div class="space-y-0.5">
        <p class="text-lg text-black font-semibold truncate">
          {{ props.name }}
        </p>

        <p class="text-slate-500 font-medium truncate">
          {{ props.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  email: string
  imageUrl: string
}>()
</script>
