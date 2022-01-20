<template>
  <div id="questionMakerDiv">
    <button id='buttonShowDiv' class="button" @click="this.showDiv=!this.showDiv">Show chat</button>
    <message :msg="msg" v-show="msg"/>
    <div v-show="showDiv==true" id="chatDiv">
      <div id="chatHead">
          <div id="chatHeadQuestion">Questions</div>
          <div id="chatHeadReply">Reply</div>
      </div>
      <div id="chatBody">
          <div id="chatBodyQuestion">
            <div id="chatName">
              <label for="nameGet">Name:</label>
              <input class="input" type="text" id="nameGet" name="nameGet" v-model="nameGet" placeholder="Put your name">
            </div>
            <label for="pergunta">Make your question ;) (max 300 characters):</label>
            <textarea type='text' placeholder="Write here a question" name="question" class="textareaQuestion" cols="43" rows="20" minlength="25" maxlength="300" v-model="toConfirm"></textarea>
            <button  class="button" @click="sendQuestion">Send text</button>
          </div>

          <div id="chatBodyReply">
            <div id="questionBox" v-for="question in quest" :key="question.id">
              <div id='questionNameDiv'>From: {{question.name}}</div>
              <div id="questionBoxDiv">{{question.toConfirm}}</div>
              <button class="button qbButton" @click="this.getQuest=question.toConfirm, this.showReply=!this.showReply, this.numberReply=question.id">Reply</button>
              <button class="button qbButton" @click="deleteQuestion(question.id)">Delete</button>
                <div id='chatBodyReply' v-show="this.showReply==true && this.numberReply==question.id">
                  <textarea class="textareaQuestion" type='text' name="reply" placeholder="Reply the question" cols="30" rows="5" v-model="this.reply"></textarea>
                  <button class="button qbButton" 
                  @click="sendReply">Send reply</button>
                  <button class="button qbButton" @click="this.showReply=false, this.reply=''">Cancel</button>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import message from './message.vue';
export default {
  components: { 
    message,
  },
  name:"questionsModal",
  data(){
    return{
      showDiv:false,
      showReply: false,
      msg:'',
      toConfirm:'',
      quest:'',
      name:'',
      nameGet:'',
      reply:'',
      numberReply:'',
      getQuest:'',
    }
  },
  methods:{
    async sendQuestion(e){
      e.preventDefault();

      if (this.toConfirm!='' && this.nameGet!='') {
        const data = {
          toConfirm:this.toConfirm,
          name:this.nameGet,
        }
        const dataJson = JSON.stringify(data)
        const req = await fetch("http://localhost:3000/questToConfirm", {
          method:'POST',
          headers: {"Content-Type":"application/json"},
          body: dataJson,
        })
        const res = await req.json()
        this.getMsgToConfirm()

        this.msg='The question was sent successfully'
        setTimeout(()=>this.msg='',2000)

        this.toConfirm=''
        this.nameGet=''
      }else
        if (this.nameGet=='') {
          this.msg='Please put your name. The Name area is empty.'
        }else
            if (this.toConfirm=='')
              this.msg='Make the question. The text area is empty.'
      setTimeout(()=>this.msg='',3000)
    },
    async getMsgToConfirm(){
      const req = await fetch("http://localhost:3000/questToConfirm")
      const data = await req.json()
      this.quest = data
    },
    async deleteQuestion(id){
      const req = await fetch(`http://localhost:3000/questToConfirm/${id}`,{method:"DELETE"})
      const res = await req.json()

      this.getMsgToConfirm()

      if(this.msg==''){
        this.msg='The question was deleted'
        setTimeout(()=>this.msg='', 2000)
      }
    },
    async sendReply(e){
      const id = this.numberReply
      e.preventDefault();

      if(this.reply=='' || this.quest==''){
        this.msg='The reply is empty. Please write something before press the button.'
      }else{
        const data = {
          reply:this.reply,
          quest:this.getQuest,
        }
        const dataJson = JSON.stringify(data)
        const req = await fetch("http://localhost:3000/questions",{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:dataJson,
        })
        const res = await req.json()
        if (res!='') {
          this.deleteQuestion(id)
        }
      }
      this.msg='The reply was sent successfully'
      this.reply=''
      this.showReply=false
      setTimeout(()=>this.msg='',3000)  
    },
  },
  mounted(){
    this.getMsgToConfirm()
  }
}
</script>

<style scoped>
  #chatDiv{
    --gap: 10px;
    margin: 0 auto;
    max-width: 800px;
    max-height: 700px;
    padding: var(--gap);
    background-color: #222;
    border-radius: 10px;
  }
  #chatHead{
    background-color: #333;
    display: flex;
    font-size: 30px;
    color: rgb(255, 251, 0);
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
  }
  #chatBody{
    background-color: #777;
    display: flex;
    font-size: 20px;
  }
  #chatHead div, #chatBody div{
    width: 99%;

  }
  #chatBodyQuestion{
    border-right: 3px solid #222;
    padding-left: 20px;
    padding-top: 20px;
  }
  #chatName{
    margin-bottom: 10px;
    font-weight: bold;
  }
  .input{
    padding: 8px;
    margin-left: 10px;
    width: 76%;
  }
  #chatBodyReply{
    max-height: 645px;
    padding-left: 10px;
    padding-top: 20px;
    margin: 0 auto;
    overflow-y:scroll;
  }
  .textareaQuestion{
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  textarea{
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    resize: none;
    height: 50%;
    width: 95%;
  }
  textarea:invalid{
    border: 3px solid hsl(0, 100%, 50%);
  }
  #questionBox{
    padding-bottom: 15px;
  }
  #questionBoxDiv{
    background: rgb(255, 255, 255);
    max-height: 400px;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    padding-right: 5px;
    border: 3px solid #333;
    font-size: 13px;
  }
  #questionNameDiv{
    background-color: #333;
    color: rgb(255, 230, 0);
    font-weight: bold;
    padding-top: 5px ;
    padding-left:10px;
  }
  /* BOTÕES */
  .qbButton{
    height: 40px;
    width: 49.5%;
  }
  #buttonShowDiv{
    position: absolute;
    top: 100px;
    left: 5px;
  }
  .button{
    background-color: #222;
    color: rgb(217, 255, 0);
    font: bold;
    border: 2px solid #333;
    padding: 10px;
    cursor: pointer;
    transition: .5s;
  }
  .button:hover{
    background-color: transparent;
    color: #111;
  }
</style>