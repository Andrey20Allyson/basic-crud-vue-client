<script setup lang="ts">
import { UserClient, type UserPasswordUpdateDTO, type UserResponseDTO } from '@/clients/user.client';
import PasswordChangeForm from '@/components/PasswordChangeForm.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import { ageFrom } from '@/utils/birth-date';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const data = ref<{ user: UserResponseDTO, age: number } | null>(null);

const route = useRoute();
const id = Number(route.params.id);

const client = UserClient.get();

client
  .get(id)
  .then(load);

async function handlePasswordChange(change: UserPasswordUpdateDTO) {
  return client
    .update(id, { password: change })
    .then(load);
}

function load(user: UserResponseDTO) {
  data.value = {
    user,
    age: ageFrom(new Date(user.birthDate)),
  };
}
</script>

<template>
  <div class="body" v-if="data !== null">
    <section>
      <h1>Informações</h1>
      <h3>
        <strong class="green">
          {{ data.user.name }}
        </strong>
        <IconEdit />
      </h3>
      <p>
        <strong class="green">
          {{ data.age }}
        </strong>
        anos
        <IconEdit />
      </p>
    </section>
    <section>
      <h1>Senha</h1>
      <PasswordChangeForm @submit="handlePasswordChange" />
    </section>
  </div>

  <div v-else>
    Carregando...
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
}
</style>