<template>
    <div class="profile">
        <UserAccount />
    </div>
</template>

<script>
import UserAccount from '@/components/UserAccount.vue'

export default {
    name: 'Profile',
    components: {
        UserAccount,
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