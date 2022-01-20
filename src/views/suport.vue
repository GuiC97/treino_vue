<template>
  <div class="main">
    <div>
      <questionsModal/>
      <h2>Commom questions</h2>
      <questions/>
    </div>
  </div>
</template>

<script>
import questions from '../components/questions.vue'
import questionsModal from '../components/questionsModal.vue'
export default {
  components: {
   questions,
   questionsModal,
  },
  name:'suport',
}
</script>

<style scoped>
  .space{

  }
</style>