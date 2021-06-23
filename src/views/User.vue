<template>
    <div class="profile">
        <SettingsUserCard />
    </div>
</template>

<script>
import SettingsUserCard from '@/components/SettingsUserCard.vue'

export default {
    name: 'User',
    components: {
        SettingsUserCard,
    }
}
</script>

<style scoped>
    .profile{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
</style>