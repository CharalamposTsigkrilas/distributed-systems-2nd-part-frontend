<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const citizenIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/citizen/' +citizenIdRef.value+ '/request';
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const applicationStore = useApplicationStore();
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

onMounted(() => {   
    citizenIdRef.value = route.params.id;
    performRequest();
});

const router = useRouter();

const onSubmit = () => {
    router.push({ name: 'find-doctor', params: { id: citizenIdRef.value }});    
};

</script>


<template>
    <div>
        <table class="table">
            <thead v-if="data">
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                    <td>{{ data.id }}</td>
                    <td>{{ data.currentStatus }}</td>
                    <td>
                        <RouterLink
                            :to="{
                                name: 'request-doctor-details',
                                params: { id: data.id }
                            }"
                        >Display</RouterLink>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <div v-if="userRoles.includes('ROLE_CITIZEN')">
                    <div>
                        <p>You don't have sent any request.</p>
                    </div>
                    <div>
                        <button @click="onSubmit" type="submit" class="btn btn-primary">Find a Doctor</button>                                        
                    </div>
                </div> 
                <div v-else-if="userRoles.includes('ROLE_ADMIN')">   
                    <p>This citizen doesn't have sent any request.</p>
                </div>
            </tbody>
        </table>
    </div>
</template>