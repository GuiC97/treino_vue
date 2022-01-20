<template>
  <div>
    <p><banner/></p>
    <div class="main">
      <h2>Criate your look</h2> 
      <p><formClothes/></p>
    </div>
  </div>
</template>

<script>
import banner from '../components/banner.vue'
import formClothes from '../components/clothesForm.vue'
export default{
  name:'home',
  components:{
    banner,
    formClothes,
  },
}
</script>