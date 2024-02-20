<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const applicationStore = useApplicationStore()
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

</script>

<template>
  <header class="text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-center py-2 px-3">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span class="fs-5 fw-bolder text-white">API Client</span>
        </a>
        <ul class="nav nav-pills">
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'home' }" class="nav-link text-white">Home</router-link>
          </li>
          
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && userRoles.includes('ROLE_CITIZEN')" >
            <router-link :to="{ name:'citizen', params: { id: applicationStore.userData.id } }" class="nav-link text-white">Citizen</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && userRoles.includes('ROLE_DOCTOR')">
            <router-link :to="{ name:'doctor', params: { id: applicationStore.userData.id } }" class="nav-link text-white">Doctor</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && userRoles.includes('ROLE_ADMIN')">
            <router-link :to="{ name:'citizens'}" class="nav-link text-white">Citizens</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && userRoles.includes('ROLE_ADMIN')">
            <router-link :to="{ name:'doctors'}" class="nav-link text-white">Doctors</router-link>
          </li>

          <li class="nav-item" v-if="applicationStore.isAuthenticated === false">
            <router-link :to="{ name: 'login' }" class="nav-link text-white">Login</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'logout' }" class="nav-link text-white">Logout</router-link>
          </li>

        </ul>
      </div>
    </div>
  </header>
</template>
