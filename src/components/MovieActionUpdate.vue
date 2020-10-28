<template>
<router-link :to="{ name: 'update', params: { id: movieId } }"
                   type="button" class="action__update">
  <slot></slot>
</router-link>
</template>

<script>
export default {
  props: ['movieId'],
};
</script>
