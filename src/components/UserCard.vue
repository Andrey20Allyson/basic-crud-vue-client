<script setup lang="ts">
import type { UserResponseDTO } from '@/clients/user.client';
import IconClose from '@/components/icons/IconClose.vue';
import { ageFrom } from '@/utils/birth-date';
import { computed, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

const { user } = defineProps<{
  user: UserResponseDTO,
}>();

const emit = defineEmits<{
  delete: [user: UserResponseDTO],
}>();

const parsedBirthDate = computed(() => new Date(user.birthDate));
const age = computed(() => ageFrom(parsedBirthDate.value));

const birthDateStr = computed(() => {
  return parsedBirthDate
    .value
    .toLocaleString('pt-br', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
});

</script>

<template>
  <span class="card-body" role="listitem">
    <span>
      <RouterLink :to="`/users/${user.id}`">
        <strong class="green hover-hl name">
          {{ user.name }}
        </strong>
      </RouterLink>
    </span>
    -
    <span>
      Nascido em
      <strong class="green">
        {{ birthDateStr }}
      </strong>
      (<strong class="green">
        {{ age }}
      </strong>
      anos)
    </span>
    <span class="close" @click="emit('delete', user)">
      <IconClose />
    </span>
  </span>
</template>

<style scoped>
.close {
  color: rgb(247, 44, 44);
  cursor: pointer;
}

.name {
  cursor: pointer;
  padding: .2rem;
}

.card-body {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  flex: 1;
  padding: .5rem;
  display: grid;
  grid-template-columns: 1fr .5rem 1.5fr repeat(2, auto);
  justify-items: center;
  gap: .4rem;
  align-items: center;
  border-radius: .3rem;
}

.card-body:hover {
  border-color: var(--color-border-hover);
}
</style>