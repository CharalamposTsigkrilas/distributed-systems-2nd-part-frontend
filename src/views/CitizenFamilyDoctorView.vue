<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const citizenIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/citizen/' +citizenIdRef.value+ '/doctor';
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
    router.push({ name: 'citizen-request', params: { id: citizenIdRef.value }});    
};

const onRemove = () => {
    router.push({ name: 'doctor-remove', params: { id: citizenIdRef.value }});
};

</script>


<template>
    <div>
        <table class="table">
            <thead v-if="data">
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
                    <th>Full Name</th>
                    <td>{{ data.fullName }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{ data.email }}</td>
                </tr>
                <tr>
                    <th>Phone number</th>
                    <td>{{ data.phoneNumber }}</td>
                </tr>
                <tr>
                    <th>Department</th>
                    <td>{{ data.department }}</td>
                </tr>
                <tr>
                    <th>Prefecture</th>
                    <td>{{ data.prefecture }}</td>
                </tr>
                <tr>
                    <th>Specialty</th>
                    <td>{{ data.specialty }}</td>
                </tr>
                <tr>
                    <th>Office Address</th>
                    <td>{{ data.doctorOfficeAddress }}</td>
                </tr>
                <tr>
                    <th>Rating</th>
                    <td>{{ data.rating }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <div v-if="userRoles.includes('ROLE_CITIZEN')">
                    <div>
                        <p>You don't have a family doctor.</p>
                        <p>You have to make a request to get a family doctor.</p>
                        <button @click="onSubmit" type="submit" class="btn btn-primary">Go to requests</button>
                    </div>
                </div> 
                <div v-else-if="userRoles.includes('ROLE_ADMIN')">   
                    <p>This citizen doesn't have family doctor.</p>
                </div>    
            </tbody>
        </table>
        <div v-if="data && userRoles.includes('ROLE_CITIZEN')">
            <button @click="onRemove" type="submit" class="btn btn-primary">Remove doctor</button>
        </div>
    </div>
</template>