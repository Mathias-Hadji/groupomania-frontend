<template>
  <div id="nav">
    <div>
      <img id="logo" alt="logo" src="./assets/logo.svg">
    </div>
    <div>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">A propos</router-link>
    </div>
  </div>
  <router-view/>
</template>



<style lang="scss">

body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  #logo {
    height: 30px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #2196F3;
    }
  }
}
</style>
