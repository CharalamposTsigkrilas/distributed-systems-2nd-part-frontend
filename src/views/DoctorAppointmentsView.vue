<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { useApplicationStore } from '@/stores/application.js';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const doctorIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/doctor/' +doctorIdRef.value+ '/appointments'}
);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const applicationStore = useApplicationStore();
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

onMounted(() => {
    doctorIdRef.value = route.params.id;
    performRequest();
});

</script>

<template>    
    <div>
        <table class="table">
            <thead v-if="data">
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
                <p></p>
            </thead>
            <tbody v-if="loading">
                <tr>
                    <td colspan="5">Loading...</td>
                </tr>
            </tbody>
            <tbody v-if="data">
                <tr v-if="Array.isArray(data)"></tr>
                <tr v-for="appointment in data" :key="appointment.id">
                    <td>{{ appointment.id }}</td>
                    <td>{{ appointment.date }}</td>
                    <td>{{ appointment.time }}</td>
                    <td>{{ appointment.place }}</td>
                    <td>
                        <RouterLink
                            :to="{
                                name: 'doctor-appointment-details',
                                params: { id: appointment.id }
                            }"
                        >Display</RouterLink>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <div>
                    <p v-if="userRoles.includes('ROLE_DOCTOR')">You don't have any appointment yet.</p>
                    <p v-if="userRoles.includes('ROLE_ADMIN')">This doctor doesn't have any appointment yet.</p>
                </div>
            </tbody>
        </table>
    </div>
</template>