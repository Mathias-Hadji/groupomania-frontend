<template>
    <div>
        <router-view/>
    </div>
</template>


<script>

export default {
    components: {

    },

    data(){
        return{

        }
    },

    computed: {

    },

    mounted(){

    },

    methods:{

    },
}
</script>


<style lang="scss">

@media screen and (max-width: 1280px){

}

*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-image: linear-gradient(62deg, #7e91fb 0%, #6876f7 100%);
    min-height: 100vh;
}

.main-navbar{
    padding-bottom: 20px;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1b78c5;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
    text-align: center;
}
.button:hover {
    cursor:pointer;
    background: #135faa;
}
.button-primary{
    background: #2196F3;
}
.button-primary:hover{
    background: #1976D2;  
}
.button-success{
    background: rgb(126, 179, 74);
}
.button-danger{
    background: rgb(187, 37, 37);
}
.button-danger:hover{
    background: rgb(212, 0, 0);
}
.button--disabled {
    background:#77b2df;
    color:#dddddd;
}
.button--disabled:hover {
    cursor:not-allowed;
    background:#77b2df;
}
.input{
    padding: 8px;
    border: none;
    border-radius: 9px;
    background: #f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    min-width: 100px;
}
.error-input{
    padding: 8px;
    border: 1px solid red;
    border-radius: 9px;
    background: #f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    min-width: 100px;
}
.valid-input{
    padding: 8px;
    border: 1px solid green;
    border-radius: 9px;
    background: #f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    min-width: 100px;
}
.text-danger{
    color: red;
}
.text-success{
    color: green;
}
textarea{
    resize: none;
}

</style>