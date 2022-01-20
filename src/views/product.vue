<template>
  <div class="main">
    <h2>Looks list:</h2>
    <dashboard/> 
  </div>
</template>

<script>
import dashboard from '../components/dashboard.vue'
export default {
  name:'product',
  components: {
    dashboard,
  },
}
</script>