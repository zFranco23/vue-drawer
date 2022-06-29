<template>
  <div class="container">
    <div>
      <h1>Draw something you want</h1>
      <Drawer />
    </div>
  </div>
</template>

<script>
import Drawer from '../components/Drawer.vue';
export default {
    components: { Drawer }
}
</script>

<style>
  @import '../assets/base.css';
  h1 {
    text-align: center;
    margin: 16px 0;
  }
  .container {
    max-width: 1200px;
    padding: 2rem;
    margin: 0 auto;
  }
</style>