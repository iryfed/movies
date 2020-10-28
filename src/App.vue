<template>
<div>
  <router-view />
  <footer>
      <div class="container">
        <div class="footer">
        &copy; 2020
        </div>
      </div>
  </footer>
  <back-to-top>
    <div class="toTop"></div>
  </back-to-top>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop';

export default {
  components: { BackToTop },
};
</script>
