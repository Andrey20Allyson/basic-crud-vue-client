<script setup lang="ts">
import { useInfo } from '@/stores/info-modals';
import { sleep } from '@/utils/promise';
import { ref } from 'vue';

const store = useInfo();
const message = ref<string | null>(null);
const isClosing = ref<boolean>(false);

store.$onAction(action => {
  if (action.name === 'open') {
    action.after(next);
  }
});

async function next() {
  let nextMessage;
  if (message.value !== null) return;

  while ((nextMessage = store.pop())) {
    message.value = nextMessage;

    await sleep(2000);

    isClosing.value = true;

    await sleep(1000);
    
    isClosing.value = false;
    message.value = null;
  
    await sleep(0);
  }
}

</script>

<template>
  <div v-if="message !== null" class="body" :class="isClosing ? 'closing' : null">
    <h3 class="bold">
      {{ message }}
    </h3>
    <span class="timer"></span>
  </div>
</template>

<style scoped>
.body {
  background-color: var(--color-background-mute);
  color: var(--color-text);
  border-radius: 1rem;
  border: 1px solid #20631a;
  position: fixed;
  width: 40%;
  min-width: 40rem;
  height: 4rem;
  bottom: 1.5rem;
  right: 50%;
  transform: translate(50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  animation-name: info-in;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier();
  overflow: hidden;
}

.timer {
  background-color: #18970d;
  box-shadow: 0 -5px 10px #18970d;
  height: .1rem;
  width: 100%;
  animation-name: info-timer;
  animation-duration: 2s;
  animation-timing-function: linear;
}

.body>h3 {
  flex: 1;
  display: flex;
  align-items: end;
}

.closing {
  bottom: -15%;
  animation-name: info-out;
}

@keyframes info-timer {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

@keyframes info-in {
  0% {
    bottom: -15%;
  }

  100% {
    bottom: 1.5rem;
  }
}

@keyframes info-out {
  0% {
    bottom: 1.5rem;
  }
  
  100% {
    bottom: -15%;
  }
}
</style>