<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const requestIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/request/' + requestIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    requestIdRef.value = route.params.id;
    performRequest();
});
</script>

<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Field Name</th>
                    <th>Field Value</th>
                </tr>
                <p></p>
            </thead>
            <tbody v-if="loading">
                <tr>
                    <td colspan="2">Loading...</td>
                </tr>
            </tbody>
            <tbody v-if="data">
                <tr>
                    <th>Request id</th>
                    <td>{{ data.id }}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{{ data.currentStatus }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>