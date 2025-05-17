<script setup>
// 暫時空的，因為之後我們會加 router
</script>

<template>
  <nav style="padding: 10px; border-bottom: 1px solid #ccc;">
    <router-link to="/">代表波形挑選</router-link> |
    <router-link to="/viewer">代表波形檢視</router-link>
  </nav>

  <div id="app">
    <router-view />
  </div>
</template>



<style scoped>
#app {
  padding: 20px;
}
</style>
