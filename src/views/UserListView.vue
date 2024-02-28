<script setup lang="ts">
import { UserClient, type UserResponseDTO } from '@/clients/user.client';
import UserCard from '@/components/UserCard.vue';
import { useInfoModalStore } from '@/stores/info-modals';
import { ref } from 'vue';

const client = UserClient.get();
const users = ref<UserResponseDTO[]>([]);

loadUsers();

const info = useInfoModalStore();

async function loadUsers() {
  users.value = await client.list();
}

async function handleUserDelete(user: UserResponseDTO) {
  info.open(`Deletando ${user.name}`);

  client.delete(user.id);

  await loadUsers();
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