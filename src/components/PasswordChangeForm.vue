<script setup lang="ts">
import type { UserPasswordUpdateDTO } from '@/clients/user.client';
import { reactive } from 'vue';

const emit = defineEmits<{
  submit: [change: UserPasswordUpdateDTO],
}>();

const change = reactive<UserPasswordUpdateDTO>({ new: '', old: '' });

function handleSubmit() {
  emit('submit', change);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>
      Mudar Senha
    </h3>
    <div>
      <label for="oldPassword">Senha Antiga:</label>
      <input type="password" name="oldPassword" v-model="change.old">
    </div>
    <div>
      <label for="newPassword">Senha Nova:</label>
      <input type="password" name="newPassword" v-model="change.new">
    </div>
    <button>Confirmar</button>
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: .5rem;
  background-color: var(--color-background-mute);
  padding: .5rem 2rem;
  border-radius: .5rem;
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

form h3 {
  justify-self: center;
}

form button {
  width: 70%;
  justify-self: center;
  cursor: pointer;
}
</style>