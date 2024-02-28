<script setup lang="ts">
import { UserClient, type UserCreateDTO } from '@/clients/user.client';
import { useInfo } from '@/stores/info-modals';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const userCreateData = reactive<UserCreateDTO>({
  name: '',
  birthDate: new Date(),
  password: '',
});

const submiting = ref(false);
const client = UserClient.get();

const router = useRouter();
const info = useInfo();

async function submitForm() {
  if (submiting.value === true) return;

  info.open(`Salvando Usuário...`);

  submiting.value = true;

  await client.create(userCreateData)

  info.open('Usuário Salvo!');

  submiting.value = false;

  router.push('/users');
}
</script>

<template>
  <div class="body">
    <form @submit.prevent="submitForm">
      <div>
        <label class="green" for="name">Nome:</label>
        <input type="text" id="name" v-model="userCreateData.name" required>
      </div>
      <div>
        <label class="green" for="birthDate">Data de Nascimento:</label>
        <input type="date" id="birthDate" v-model="userCreateData.birthDate" required>
      </div>
      <div>
        <label class="green" for="password">Senha:</label>
        <input type="password" id="password" v-model="userCreateData.password" required>
      </div>
      <button type="submit">
        <span class="green bold">
          Cadastrar
        </span>
      </button>
    </form>
    <p v-if="submiting">Salvando...</p>
  </div>
</template>

<style scoped>
.body {
  padding: .5rem 4rem;
  background-color: var(--color-background-mute);
}

form {
  display: grid;
  gap: .5rem;
}

form>div {
  display: grid;
  grid-template-columns: .3fr 1fr;
}

form input,
form button {
  height: 1.7rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-text);

  outline: none;
  padding: .2rem .6rem;

  &:focus {
    outline: 1px solid #1f8538b9;
  }
}

form button {
  width: 70%;
  justify-self: center;
  cursor: pointer;
}
</style>