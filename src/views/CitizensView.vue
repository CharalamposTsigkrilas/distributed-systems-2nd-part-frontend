<script setup>
import { useRouter } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { onMounted, ref } from 'vue';

const urlRef = ref('http://localhost:9090/api/citizen');
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    performRequest();
});

const router = useRouter();

const onSubmit = () => {
    router.push({ name: 'citizen-new'});
};

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
                                <div>No citizens found!</div>
                            </tbody>
                        </table>
                        <button @click="onSubmit" type="submit" class="btn btn-primary">New Citizen</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>