<script setup lang="ts">
import { UserClient, type UserPasswordUpdateDTO, type UserResponseDTO, type UserUpdateDTO } from '@/clients/user.client';
import EditableValue from '@/components/EditableValue.vue';
import PasswordChangeForm from '@/components/PasswordChangeForm.vue';
import { useInfo } from '@/stores/info-modals';
import { ageFrom } from '@/utils/birth-date';
import { AxiosError } from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const data = ref<
  | {
    status: 'success'
    user: UserResponseDTO,
    age: number,
    changes: UserUpdateDTO,
  }
  | {
    status: 'error',
    message: string,
  }
  | {
    status: 'loading',
  }
>({ status: 'loading' });

const route = useRoute();
const info = useInfo();
const id = Number(route.params.id);

const client = UserClient.get();

client
  .get(id)
  .then(load)
  .catch(handleError);

async function handlePasswordChange(change: UserPasswordUpdateDTO) {
  await client
    .update(id, { password: change })
    .then(load);

  info.open('Senha Modificada Com Sucesso!')
}

function load(user: UserResponseDTO) {
  data.value = {
    status: 'success',
    user,
    age: ageFrom(new Date(user.birthDate)),
    changes: {
      name: user.name,
      birthDate: new Date(user.birthDate),
    },
  };
}

function handleError(err: unknown) {
  if (err instanceof AxiosError) {
    if (err.response !== undefined) {
      return data.value = { status: 'error', message: err.response.data.message };
    }
  }

  if (err instanceof Error) {
    return data.value = { status: 'error', message: err.message };
  }

  data.value = { status: 'error', message: `Ops! Ocorreu um erro` };
}

async function update(data: UserUpdateDTO): Promise<void> {
  const user = await client
    .update(id, data);

  load(user);

  info.open('Modificação salva');
}

async function handleNameChange() {
  if (data.value.status !== 'success') return;

  await update({ name: data.value.changes.name });
}

async function handleBirthDateChange() {
  if (data.value.status !== 'success') return;

  await update({ birthDate: data.value.changes.birthDate });
}
</script>

<template>
  <div class="body" v-if="data.status === 'success'">
    <section>
      <h1>Informações</h1>

      <EditableValue @confirm="handleNameChange">

        <template v-slot:value>
          <h3>
            <strong class="green">
              {{ data.user.name }}
            </strong>
          </h3>
        </template>

        <template v-slot:input>
          <input type="text" v-model="data.changes.name">
        </template>

      </EditableValue>

      <EditableValue @confirm="handleBirthDateChange">

        <template v-slot:value>
          <p>
            <strong class="green">
              {{ data.age }}
            </strong>
            anos
          </p>
        </template>

        <template v-slot:input>
          <input type="date" v-model="data.changes.birthDate">
        </template>

      </EditableValue>

    </section>
    <section>
      <h1>Senha</h1>
      <PasswordChangeForm @submit="handlePasswordChange" />
    </section>
  </div>

  <div v-if="data.status === 'loading'">
    Carregando...
  </div>

  <div v-if="data.status === 'error'">
    <h3>
      {{ data.message }}
    </h3>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
}
</style>