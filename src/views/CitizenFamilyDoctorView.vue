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
const requestStatus = computed(() => {
    if (applicationStore.isAuthenticated && applicationStore.userData.request) {
        return applicationStore.userData.request.currentStatus;
    } else {
        return null;
    }
});

onMounted(() => {   
    citizenIdRef.value = route.params.id;
    performRequest();
});

const router = useRouter();

const onSubmit = () => {
    router.push({ name: 'find-doctor'});    
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
                <tr>
                    <th>Maximum Number Of Citizens (as a family doctor)</th>
                    <td>{{ data.maxNumberOfCitizens }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <div v-if="userRoles.includes('ROLE_CITIZEN') && (requestStatus===null || requestStatus==='rejected')">
                    <h4>You don't have family doctor!</h4>
                    <h4 v-if="requestStatus==='rejected'">Your previous request was rejected.</h4>
                    <div>
                        <button v-if="userRoles.includes('ROLE_CITIZEN')" @click="onSubmit" type="submit" class="btn btn-primary">Find a Doctor!</button>                                        
                    </div>
                </div> 
                <div v-else-if="userRoles.includes('ROLE_CITIZEN') && requestStatus==='unseen'">
                    <h4>You have already sent a request for a family doctor!</h4>
                    <h4>Please wait for the doctor to Accept or Reject the request!</h4>
                    <div>
                        <button v-if="userRoles.includes('ROLE_CITIZEN')" @click="onSubmit" type="submit" class="btn btn-primary">Cancel the request!</button>                                        
                    </div>
                </div>
                <div v-else-if="userRoles.includes('ROLE_ADMIN')">   
                    <h4>This citizen doesn't have family doctor!</h4>
                </div>    
            </tbody>
        </table>
    </div>
</template>