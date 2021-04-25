<template>
    <div class="news">
        <CreateNewPublication />
        <AllPublications />
    </div>
</template>



<script>
import CreateNewPublication from '@/components/CreateNewPublication.vue'
import AllPublications from '@/components/AllPublications.vue'


export default {
    name: 'News',
    components: {
        CreateNewPublication,
        AllPublications,
    },
}
</script>

<style scoped>
.news{
    display: flex;
    flex-direction: column;

    align-items: center;
    height: 600px;
}

</style>