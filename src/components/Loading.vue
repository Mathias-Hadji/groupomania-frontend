<template>
    <div class="loading">
        <div class="loading-spinner"></div>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style lang="scss" scoped>
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;

        .loading-spinner{
            width: 50px;
            height: 50px;
            border-top: 3px solid #FFF;
            border-left: 3px solid #FFF;
            border-radius: 50%;
            animation: rotating 1s linear infinite;
        }

        @keyframes rotating{
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }


</style>