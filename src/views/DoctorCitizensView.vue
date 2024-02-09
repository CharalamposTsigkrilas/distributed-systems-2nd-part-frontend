<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { useApplicationStore } from '@/stores/application.js';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const doctorIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/doctor/' +doctorIdRef.value+ '/citizens'}
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
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div>
                        <table class="table">
                            <thead v-if="data">
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
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
                                <tr v-for="citizen in data" :key="citizen.id">
                                    <td>{{ citizen.id }}</td>
                                    <td>{{ citizen.fullName }}</td>
                                    <td>{{ citizen.email }}</td>
                                    <td>
                                        <RouterLink
                                            :to="{
                                                name: 'citizen-details',
                                                params: { id: citizen.id }
                                            }"
                                            >Display</RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <div>
                                    <p v-if="userRoles.includes('ROLE_DOCTOR')">You don't have any citizen yet!</p>
                                    <p v-if="userRoles.includes('ROLE_ADMIN')">This doctor doesn't have any citizen yet!</p>
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>