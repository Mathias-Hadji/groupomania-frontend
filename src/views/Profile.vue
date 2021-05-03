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
        width: 100%;
        justify-content: center;
    }
</style>