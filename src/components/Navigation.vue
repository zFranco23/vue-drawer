<template>
  <navbar>
    <div @click="handleGoHome" class="logo">
      <p>D</p>
    </div>
    <div class="container__routes">
      <router-link :to="{name:'home'}">Home</router-link>
      <router-link :to="{name:'favorites'}">Favorites</router-link>
    </div>
  </navbar>
</template>

<script>

export default {
  methods: {
    handleGoHome(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>  

  .logo {
    cursor: pointer;
  }
  p {
    font-size: 4rem;
  }
  a {
    display: inline-block;
    text-decoration: none;
    padding: 8px;
    height: fit-content;
  }

  navbar {
    display: flex;
    justify-content: space-between;
    align-items:center;
    background-color: #eaff7b;
    padding: 8px;
  }
  .container__routes {
    display: flex;
    justify-content: center;
    gap: 8px;
  }
</style>