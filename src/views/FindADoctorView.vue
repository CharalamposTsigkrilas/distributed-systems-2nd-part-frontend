<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const citizenIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/citizen/' +citizenIdRef.value+ '/nearby/doctors';
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    citizenIdRef.value = route.params.id;
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
                            <thead>
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
                                <tr v-for="doctor in data" :key="doctor.id">
                                    <td>{{ doctor.id }}</td>
                                    <td>{{ doctor.fullName }}</td>
                                    <td>{{ doctor.email }}</td>
                                    <td>
                                        <RouterLink
                                            :to="{
                                                name: 'find-doctor-details',
                                                params: { id: doctor.id }
                                            }"
                                            >Display</RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>