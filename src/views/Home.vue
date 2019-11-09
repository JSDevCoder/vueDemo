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
          success: (res) => {
              console.log(res)
          }
      })
  }
};
</script>
