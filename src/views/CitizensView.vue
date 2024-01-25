<script setup>
import { onMounted, watchEffect, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const urlRef = ref('http://localhost:9090/api/citizen');
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    performRequest();
});

watchEffect(() => {
    console.log(data.value); // Log the data to inspect its structure
});

</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Citizens</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="loading">
                                <tr>
                                    <td colspan="5">Loading...</td>
                                </tr>
                            </tbody>
                            <tbody v-else-if="data && data.length > 0">

                                <tr v-for="citizen in data._embedded.citizens" :key="citizen.id">
                                    <td>{{ citizen.id }}</td>
                                    <td>{{ citizen.fullName }}</td>
                                    <td>{{ citizen.email }}</td>
                                    <!-- <td>
                                        <RouterLink
                                            :to="{
                                                name: 'citizen-details',
                                                params: { id: citizen.id }
                                            }"
                                            >Display</RouterLink>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>