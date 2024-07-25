<script setup>
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';

const authStore = useAuthStore()

const formData = reactive({
     username: '',
     password: '',
});


</script>

<template>
  <main>
    <h1 class="title">Login to your Account</h1>
    <form @submit.prevent="()=>{authStore.login(formData)}" class="w-1/2 mx-auto space-y-6">
        
        <div>
            <input type="text" placeholder="username" v-model="formData.username">
        </div>
        <div>
            <input type="password" placeholder="password" v-model="formData.password">
        </div>
        <button class="primary-btn">Login</button>
    </form>
  </main>
</template>
