<template>
<div>
  <div class="find-icon"></div>
  <input type="text" placeholder="название фильма"
             v-model.trim="currentTitle" @input.prevent="input" />
</div>
</template>

<script>
export default {
  data() {
    return {
      currentTitle: '',
    };
  },
  props: ['title'],
  watch: {
    title(value) {
      this.currentTitle = value;
    },
  },
  methods: {
    input() {
      setTimeout(() => {
        this.$emit('update:title', this.currentTitle);
      }, 1500);
    },
  },
};
</script>
