<script setup>
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';

const authStore = useAuthStore()

const formData = reactive({
     username: '',
     email: '',
     password: '',
});

const courses = ['COET', 'COBA'];

</script>

<template>
  <main>
    <h1 class="title">Register a new Account</h1>
    <form @submit.prevent="()=>{authStore.signup(formData)}" class="w-1/2 mx-auto space-y-6">
        
        <div>
            <input type="text" placeholder="username" v-model="formData.username">
        </div>
        <div>
            <input type="text" placeholder="email" v-model="formData.email">
        </div>
        <div>
            <input type="password" placeholder="password" v-model="formData.password">
        </div>
        <button class="primary-btn">Register</button>
    </form>
  </main>
</template>
