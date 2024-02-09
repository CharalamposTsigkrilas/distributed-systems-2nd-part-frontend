<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const applicationStore = useApplicationStore();
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

const route = useRoute();
const router = useRouter();

const doctorIdRef = ref(null);

onMounted(() => {
    doctorIdRef.value = route.params.id;
    router.push({ name: 'doctor-details'});
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Doctor #{{ doctorIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'doctor-details', params: { id: doctorIdRef } }"
                                >Details</RouterLink>
                            </li>
                            <li class="nav-item" v-if="!userRoles.includes('ROLE_CITIZEN')">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'doctor-citizens', params: { id: doctorIdRef } }"
                                >Citizens</RouterLink>
                            </li>
                            <li class="nav-item" v-if="!userRoles.includes('ROLE_CITIZEN')">
                                <RouterLink 
                                    class="nav-link"
                                    :to="{ name: 'doctor-appointments', params: { id: doctorIdRef } }"
                                >Appointments</RouterLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>