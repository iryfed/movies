<template>
<router-link :to="{ name: 'create' }" type="button" class="action__create">
  <slot></slot>
</router-link>
</template>

<script>
export default {};
</script>
