import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useInfoModalStore = defineStore('info-modal', () => {
  const messages = reactive<string[]>([]);
  
  function open(message: string) {
    messages.push(message);
  }

  function pop(): string | undefined {
    return messages.shift();
  }

  return { open, pop }
})