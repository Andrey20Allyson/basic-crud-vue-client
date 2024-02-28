<script setup lang="ts">
import { UserClient, type UserResponseDTO } from '@/clients/user.client';
import UserCard from '@/components/UserCard.vue';
import { useInfo } from '@/stores/info-modals';
import { ref } from 'vue';

const client = UserClient.get();
const users = ref<UserResponseDTO[]>([]);

client
  .list()
  .then(load);

const info = useInfo();

function load(payload: UserResponseDTO[]) {
  users.value = payload;
}

async function handleUserDelete(user: UserResponseDTO) {
  info.open(`Deletando ${user.name}`);

  await client.delete(user.id).catch(() => []);

  await client
    .list()
    .catch(() => [])
    .then(load);
}

</script>

<template>
  <ul class="user-list">
    <UserCard v-for="user in users" :key="user.id" :user="user" @delete="handleUserDelete" />
  </ul>
</template>

<style>
.user-list {
  display: flex;
  flex-direction: column;
  padding: .5rem 1.5rem;
  background-color: var(--color-background-mute);
  gap: .3rem;
}
</style>