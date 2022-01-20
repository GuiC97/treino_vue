<template>
  <div>
    <p><message :msg="msg" v-show="msg" /></p>
      <form id="clothes-form" @submit="createLook">
        <div class="input-form">
          <label for="name">Costumer name: </label>
          <input type="text" id="name" name="name" v-model="name" placeholder="Put your name">
        </div>
        <div class="input-form">
          <label for="tShirtColor">T-shirt color: </label>
          <select name="tShirtColor" id="tShirtColor" v-model="tShirtColor">
            <option value="">Select your T-shirt color</option>
            <option v-for="tShirtColor in tShirtColors" :key="tShirtColor.id" :value="tShirtColor.tipo">{{tShirtColor.tipo}}</option>
          </select>
        </div>
        <div class="input-form">
          <label for="pantsColor">Pants color: </label>
          <select name="pantsColor" id="pantsColor" v-model="pantsColor">
            <option value="">Select your pants color</option>
            <option v-for="pantsColor in pantsColors" :key="pantsColor.id" :value="pantsColor.tipo">{{pantsColor.tipo}}</option>
          </select>
        </div>
        <div id='checkboxAccessories' class="input-form">
          <label id="accessories-title" for="accessories">Accessories: </label>
          <div class="checkboxAccessories" v-for="accessory in accessoriesData" :key="accessory.id">
            <input type="checkbox" name="accessories" v-model="accessories" :value="accessory.tipo">
            <span>{{accessory.tipo}}</span>
          </div>
        </div>
        <div>
            <input type="submit" class="submit" value="Create look">
        </div>
      </form>
  </div> 
</template>

<script>
import message from './message.vue'
export default {
  components:{ 
    message,
  },
  name:'formClothes',
  data(){
    return{
      name:null,
      msg:null,
      
      // Dados web
      tShirtColor:'',
      pantsColor:'',
      accessories:[],

      // Server backend
      tShirtColors:null,
      pantsColors:null,
      accessoriesData:null,

    }
  },
  methods:{
    async getElements(){
      const req = await fetch("http://localhost:3000/coresRoupas")
      const data = await req.json()

      this.tShirtColors = data.tShirtColors
      this.pantsColors = data.pantsColors
      this.accessoriesData = data.accessories
    },
    async createLook(e){
      e.preventDefault();

      if (this.name==null) {
        this.msg="Please put your name"
      }
       else
         if (this.tShirtColor ==''){
           this.msg="Please select a t-shirt valide color"
         }
         else
           if (this.pantsColor =='') {
             this.msg="Please select a pants color"
           }

              else{
              const data = {
                name:this.name,
                tShirtColor:this.tShirtColor,
                pantsColor:this.pantsColor,
                accessories:Array.from(this.accessories),
                status:'Solicitado',
              }
              const dataJson = JSON.stringify(data)

              const req = await fetch("http://localhost:3000/looks", {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: dataJson,
              })

              const res = await req.json()

              //Mensagem 
              this.msg= `O Look N° ${res.id} foi cadastrado!!`,

              // Apagar mensagem
              setTimeout(()=> this.msg='', 2000) 

              // Limpar os campos
              this.name=''
              this.tShirtColor=''
              this.pantsColor=''
              this.accessories=[]
              }
    },
  },
  mounted(){
    this.getElements()
  }
}
</script>

<style scoped>
  #clothes-form{
    max-width: 400px;
    margin: 0 auto;
  }
  .input-form{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  label{
    font-weight: bold;
    margin-bottom: 12px;
    color: #222;
    padding: 5px 10px;
    border-left: 5px solid blue;
  }
  input, select{
    padding: 5px 10px;
    width: 300px;
  }
  #checkboxAccessories{
    flex-direction: row;
    flex-wrap: wrap;
  }
  #accessories-title{
    width: 100%;
  }
  .checkboxAccessories{
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }
  .checkboxAccessories input,
  .checkboxAccessories span{
    width: auto;
  }
  .checkboxAccessories span{
    margin-left: 6px;
    font-weight: bold;
  }
  .submit{
    background-color: #111;
    color: blue;
    font-weight: bold;
    border: 2px solid #333;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  .submit:hover{
    background-color: transparent;
    color: #222;
  }
</style>
