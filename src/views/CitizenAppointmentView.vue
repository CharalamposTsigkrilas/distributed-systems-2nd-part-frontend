<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';

const route = useRoute();

const familyMemberIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/familyMember/' + familyMemberIdRef.value + '/appointment';
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const applicationStore = useApplicationStore();
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

onMounted(() => {
    familyMemberIdRef.value = route.params.id;
    performRequest();
});

const router = useRouter();

const onSubmit = () => {
    router.push({ name: 'new-appointment', params: { id: familyMemberIdRef.value }});    
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
                    <th>Date</th>
                    <td>{{ data.date }}</td>
                </tr>
                <tr>
                    <th>Time</th>
                    <td>{{ data.time }}</td>
                </tr>
                <tr>
                    <th>Place</th>
                    <td>{{ data.place }}</td>
                </tr>
                <tr>
                    <th>Citizen Full Name</th>
                    <td>{{ data.customerName }}</td>
                </tr>
                <tr>
                    <th>AMKA</th>
                    <td>{{ data.amka }}</td>
                </tr>
                <tr>
                    <th>Doctor Full Name</th>
                    <td>{{ data.doctorName }}</td>
                </tr>
                <tr>
                    <th>Situation</th>
                    <td>{{ data.currentStatus }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <div v-if="userRoles.includes('ROLE_CITIZEN')">
                    <div>
                        <p>You don't have any appointments yet.</p>
                    </div>
                    <div>
                        <button @click="onSubmit" type="submit" class="btn btn-primary">Set an appointment</button>                                        
                    </div>
                </div> 
                <div v-else-if="userRoles.includes('ROLE_ADMIN')">   
                    <p>This citizen doesn't have any appointment.</p>
                </div>
            </tbody>
        </table>
    </div>
</template>