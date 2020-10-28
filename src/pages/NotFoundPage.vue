<template>
<div>
<header>
<div class="container">
    <router-link :to="{ name: 'main' }" class="flex-container">
      <BaseLogo />
    </router-link>
  </div>
</header>
  <main>
    <div class="container">
    <h1 class="page-title">404 Error</h1>

      Страница не найдена =( <br> Вернуться
      <router-link :to="{ name: 'main' }">
        на главную
      </router-link>

    </div>
  </main>
  </div>
</template>

<script>
import BaseLogo from '@/components/BaseLogo.vue';

export default {
  components: { BaseLogo },
};
</script>
