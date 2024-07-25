<script setup>
import { defineStore } from 'pinia';
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore()



</script>

<template>
  <header>

      <nav>
        <RouterLink :to="{name:'home'}" class="nav-link">Home</RouterLink>

        <p class="text-white">{{ authStore.user }}</p>

        <div>
        <RouterLink :to="{name:'register'}" class="nav-link">Register</RouterLink>
        <RouterLink :to="{name:'login'}" class="nav-link">Login</RouterLink>
      </div>

      </nav>

  
  </header>

  <RouterView />
</template>
