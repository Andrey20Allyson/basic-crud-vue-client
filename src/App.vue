<script setup lang="ts">
import { useRoute } from 'vue-router';
import InfoModal from './components/InfoModal.vue';

const route = useRoute();
</script>

<template>
  <nav class="pages-nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/users" class="page-link">Usuários</RouterLink>
    <RouterLink to="/register" class="page-link">Cadastrar</RouterLink>
  </nav>

  <main class="body">
    <h2>{{ route.name }}</h2>
    <RouterView />
  </main>

  <InfoModal />
</template>

<style scoped>
#app {
  display: flex;
}

.body {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

.pages-nav {
  display: flex;
  flex-direction: column;
}

.page-link {
  cursor: pointer;
}
</style>