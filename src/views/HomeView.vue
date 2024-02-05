<script setup>
import { computed } from 'vue';
import { useApplicationStore } from '@/stores/application.js';
const { userData } = useApplicationStore();

const applicationStore = useApplicationStore();
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

let role='';
  
if(userRoles.value.includes('ROLE_ADMIN')){
  role='admin';
}else if(userRoles.value.includes('ROLE_CITIZEN')){
  role='citizen';
}else if(userRoles.value.includes('ROLE_DOCTOR')){
  role='doctor';
}

</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3">Home</h1>
          </div>
          <div>
            <p>
              Logged in as: <strong>{{ userData.username }} ({{ role }})</strong>
            </p>
            <!-- <ul>
              <li class="nav-item" v-if="role==='admin'">
                <RouterLink :to="{ name: 'citizens' }">Manage Citizens</RouterLink>
              </li>              
              <li class="nav-item" v-if="role==='admin'">
                <RouterLink :to="{ name: 'doctors' }">Manage Doctors</RouterLink>
              </li>
              <li class="nav-item" v-if="role==='citizen'">
                <RouterLink :to="{ name: 'citizen', params: { id: applicationStore.userData.id } }">View My Profile</RouterLink>
              </li>              
              <li class="nav-item" v-if="role==='doctor'">
                <RouterLink :to="{ name: 'doctor', params: { id: applicationStore.userData.id } }">View My Profile</RouterLink>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
