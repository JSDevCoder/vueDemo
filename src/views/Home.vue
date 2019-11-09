<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"; 
import ajax from '@/utils/ajaxTools.js'
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created() {
      ajax({
          url: 'http://192.168.108.115:3000/users/info',
          type: 'get',
          header: {
              'content-type': 'application/json'
          },
          params: {
              a: 1,
              b: 2
          },
          success: (res, config) => {
              console.log(res)
              console.log(config)
          },
          error: (res) => {
              console.log(res)
          },
          progress: res =>{
              console.log(res)
          }
      })
  }
};
</script>
