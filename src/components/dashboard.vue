<template> 
  <div id="looksTable">
    <p><message :msg="msg" v-show="msg" /></p>
    <div>
      <div id="looksTableHead">
        <div class="lookId">ID</div>
        <div>Name </div>
        <div>T-shirt Color</div>
        <div>Pants Color</div>
        <div>Accessories</div>
        <div>Action</div>
      </div>
    </div>
    <div>
      <div id="looksTableRows" v-for="look in looks" :key="look.id">
        <div class="lookNumber">{{look.id}}</div>
        <div>{{look.name}}</div>
        <div>{{look.tShirtColor}}</div>
        <div>{{look.pantsColor}}</div>
        <div>
          <ul>
            <li v-for="(accesory, index) in look.accessories" :key="index">{{accesory}}</li>
          </ul>
        </div>
        <div>
          <select name="status" class="status" @change="updatedStatus($event, look.id)">
            <option value="">Select</option>
            <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="look.status == s.tipo">{{s.tipo}} </option>
          </select>
          <button class="deleteButton" @click="deleteLook(look.id)">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import message from "./message.vue";
export default {
  name:"dashboard",
  data(){
    return{
      looks: null,
      lookId:null,
      status:[],
      msg:null,
    }
  },
  components:{
    message,
  },
  methods:{

    // Obter os dados do cliente do backend
    async getLooks(){
      const req = await fetch("http://localhost:3000/looks")
      const data = await req.json()
      this.looks = data

      this.getStatus()
    },

    // Obter os status do backend
    async getStatus(){
      const req = await fetch("http://localhost:3000/status")
      const data = await req.json()
      this.status = data
    },

    // Deletar look
    async deleteLook(id){
      const req = await fetch(`http://localhost:3000/looks/${id}`, {method:"DELETE"})
      const res = await req.json()
      
      //Mensagem 
      this.msg= `O Look foi apagado!!`,

      // Apagar mensagem
      setTimeout(()=> this.msg='', 2000) 

      this.getLooks()
    },

    // Atualizar o status
    async updatedStatus(event, id){
      const option = event.target.value;
      const dataJson = JSON.stringify({status:option})
      const req = await fetch(`http://localhost:3000/looks/${id}`, {method:"PATCH", headers:{"Content-Type": "application/json"}, body: dataJson })
      const res = await req.json()

      //Mensagem 
      this.msg= `O Look N° ${res.id} mudou para ${res.status}!!`,

      // Apagar mensagem
      setTimeout(()=> this.msg='', 2000) 
    }
  },
  mounted(){
    this.getLooks()
  }
}
</script>

<style scoped>
  #looksTable{
    max-width: 1200px;
    margin: 0 auto;
  }
  #looksTableHead,
  #looksTableRows{
    display: flex;
    flex-wrap: wrap;
  }
  #looksTableHead{
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #222;
  }
  #looksTableHead div,
  #looksTableRows div{
    width: 19%;
  }
  #looksTableRows{
    width: 100%;
    padding: 12px;
    border-bottom: 2px solid #999;
  }
  #looksTableHead .lookId,
  #looksTableRows .lookNumber{
    width: 5%;
  }
  select{
    padding: 12px 6px;
    margin-right: 12px;
  }
  .deleteButton{
    background-color: #222;
    color: blue;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: .5s;
    margin: 0 auto;
  }
  .deleteButton:hover{
    background-color: transparent;
    color: #222;
  }
</style>