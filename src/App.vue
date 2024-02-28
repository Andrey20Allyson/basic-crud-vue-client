<script setup lang="ts">
import { useRoute } from 'vue-router';
import InfoModal from './components/InfoModal.vue';

const route = useRoute();
</script>

<template>
  <nav class="pages-nav">
    <span class="stick-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/users">Usuários</RouterLink>
      <RouterLink to="/register">Cadastrar</RouterLink>
    </span>
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
  position: relative;
}

.page-link {
  cursor: pointer;
}

.stick-links {
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 20px;
}
</style>