<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref, watchEffect } from 'vue';



const authStore = useAuthStore();


// Use ref to make sure the reactive state updates are captured
const loggedUser = ref({});

// Watch for changes in loggedUser from the store
watchEffect(() => {
  loggedUser.value = authStore.loggedUser;
});

onMounted(()=>{authStore.GetLoggedInUser();});

</script>

<template>
  <main>
    <h1 class="title">Latest tutorial {{ loggedUser.fullName }}</h1>
    <ul>
      <!-- Display properties of the loggedUser object -->
      <li>Email: {{ loggedUser.email }}</li>
      <li>Username: {{ authStore.loggedUser.username }}</li>
      <li>Phone: {{ authStore.loggedUser.phone }}</li>
      <li>Full Name: {{ authStore.loggedUser.fullName }}</li>
      <li>ID: {{ authStore.loggedUser.id }}</li>
      <li>Roles: 
        <ul>
          <li v-for="role in authStore.loggedUser.roles" :key="role.id">
            {{ role.name }}
          </li>
        </ul>
      </li>
    </ul>
  </main>
</template>
