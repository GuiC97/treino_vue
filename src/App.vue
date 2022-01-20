<template>
  <navbar :logoImage='logo_src' :alt='alt_name'/>
  <router-view/>
  <Footer/>
</template>

<script>
import Footer from './components/footer.vue'
import navbar from './components/navbar.vue'
export default {
  name:'app',
  components: { 
    navbar,
    Footer,
  },
  data(){
    return{
      logo_src: '/img/a&a.png',
      alt_name: 'AA',
    }
  }
}
</script>

<style>
  *{
    font-family:  Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .main{
    margin: 50px;
    min-height: 250px;
  }
  h2{
    text-align: center;
    font-size: 50px;
    margin-bottom: 30px;
    color: #222;
  }
</style>
