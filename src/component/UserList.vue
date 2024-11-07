<template>
  <div
    class="w-800px max-w-full mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 all:transition-400"
  >
    <UserCard
      v-for="{ id, name, email, imageUrl } in users"
      :key="id"
      :name="name"
      :email="email"
      :image-url="imageUrl"
    />
  </div>

  <ProgressIndicator v-show="isLoading" />
</template>

<script setup lang="ts">
import UserCard from 'src/component/UserCard.vue'
import { useUsersLoader } from 'src/composable/users.ts'
import ProgressIndicator from 'src/component/ProgressIndicator.vue'

const { isLoading, users } = useUsersLoader()
</script>
