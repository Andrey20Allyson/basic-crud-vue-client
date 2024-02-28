<script setup lang="ts">
import { ref } from 'vue';
import IconCancel from './icons/IconCancel.vue';
import IconCheck from './icons/IconCheck.vue';
import IconEdit from './icons/IconEdit.vue';

const emit = defineEmits<{
  confirm: [],
}>();

const editing = ref(false);

function handleConfirm() {
  emit('confirm');

  editing.value = false;
}
</script>

<template>
  <div class="editor-body" v-if="editing === false">
    <slot name="value"></slot>
    <button @click="editing = true">
      <IconEdit class="edit" />
    </button>
  </div>

  <div class="editor-body edit-box" v-else>
    <slot name="input"></slot>
    <button class="confirm" @click="handleConfirm">
      <IconCheck />
    </button>
    <button class="cancel" @click="editing = false">
      <IconCancel />
    </button>
  </div>
</template>

<style scoped>
.editor-body {
  display: flex;
  align-items: center;
  gap: .4rem;
}

button {
  background-color: var(--color-background-mute);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: .3rem;
  cursor: pointer;
  transition: 400ms all;
  display: flex;
  align-items: center;
}

button.confirm:hover {
  background-color: var(--color-confirm);
}
button.cancel:hover {
  background-color: var(--color-cancel);
}
</style>