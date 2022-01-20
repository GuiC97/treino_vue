<template>
    <div id="messageDiv">
        <p>{{msg}}</p>
    </div>
</template>

<script>
export default {
    name:"message",
    props: {
      msg:String,
    },
}
</script>

<style scoped>
    #messageDiv{
      color: blue;
      background-color: rgb(219, 227, 243);
      border: 2px solid rgb(51, 175, 233);
      border-radius: 10px;
      padding: 10px;
      max-width: 400px;
      margin: 30px auto;
    }
</style>