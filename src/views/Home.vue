<template>
    <div class="home">
      <Login v-if="mode == 'login'"/>
      <Registration v-else/>
  </div>
</template>
<script>

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'


export default {
    name: 'Home',
    components: {
      Registration,
      Login,
    },
    data(){
      return {

      }
    },
    computed: {
      // Récupère la valeur de modeFromVueX dans le store de VueX
      mode(){
        return this.$store.state.modeFromVueX
      }
    },
    methods: {

    }
}
</script>




<style scoped>
  .home{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
  }

</style>