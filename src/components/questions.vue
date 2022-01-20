<template>
  <div id="questionsTable">
    <div id="questionTableHead">
    </div>
    <div id="questionTableRows">
      <div class="divQuest" v-for="question in questions" :key="question.id">
        <div class="question">{{question.quest}}</div>
        <div class="replyQuestion"><b>Ans:</b> {{question.reply}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"questions",
  data(){
    return{
      questions:'',
    }
  },

  // Obter as perguntas do JSON
  methods:{
    async getQuests(){
      const req = await fetch("http://localhost:3000/questions")
      const data = await req.json()
      this.questions = data
    }
  },
  // Executar
  mounted(){
    this.getQuests()
  }
}
</script>

<style scoped>
  #questionsTable{
    max-width: 1200px;
    margin: 0 auto;
  }
  #questionTableHead{
    border-bottom: 3px solid #222;
  }
  #questionTableHead div,
  .divQuest div{
    width: 50%;
  }
  
  .divQuest{
    width: 100%;
    padding: 12px;
    border-bottom: #333;
    font-size: 25px;
  }
  .replyQuestion{
    padding: 5px;
    color: #333;
  }
</style>