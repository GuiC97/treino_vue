<template>
  <div id="nav">
    <router-link to="/" id="logo-url">
      <img :src="logoImage" :alt="alt" id="logo">
    </router-link> 
    <router-link to="/">HOME</router-link>
    <router-link to="/product">LOOKS</router-link>
    <router-link to="/suport">SUPORT</router-link>
  </div>
</template>

<script>
export default {
  name:'navbar',
  props:[
    'logoImage',
    'alt',
  ],
}
</script>

<style scoped>
  #nav{
    background-color: #222;
    border-bottom: 1px solid #444;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #nav #logo-url{
    margin: auto;
    margin-left: 0;
  }
  #logo{
    width:125px;
    height: 60px;
  }
  #nav a{
    color: blue;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
  }
  #nav a:hover{
    color: rgb(251, 255, 0);
  }
</style>