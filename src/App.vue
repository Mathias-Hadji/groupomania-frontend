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

*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  background-image: linear-gradient(62deg, #7e91fb 0%, #6876f7 100%);
  min-height: 100vh;
}

#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;

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

.button {
  background: #2196F3;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: .4s background-color;
}

.button:hover {
  cursor:pointer;
  background: #1976D2;
}

.button--disabled {
  background:#cecece;
  color:#ececec;
}

.button--disabled:hover {
  cursor:not-allowed;
  background:#cecece;
}

.error-input{
  border: 1px solid red;
}

.valid-input{
  border: 1px solid green;
}

.text-danger{
  color: red;
}

.text-success{
  color: green;
}

</style>
