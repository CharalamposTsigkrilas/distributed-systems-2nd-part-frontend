<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
import { computed, onMounted, ref } from 'vue';

const route = useRoute();

const citizenIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/citizen/' +citizenIdRef.value+ '/family';
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
    router.push({ name: 'family-member-new', params: { id: citizenIdRef.value.id }});
};

</script>

<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>AMKA</th>
                    <th>Member relationship</th>
                    <th>Appointment</th>
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
                <tr v-for="familyMember in data" :key="familyMember.id">
                    <td>{{ familyMember.id }}</td>
                    <td>{{ familyMember.fullName }}</td>
                    <td>{{ familyMember.amka }}</td>
                    <td>{{ familyMember.memberRelationship }}</td>
                    <td>
                        <RouterLink 
                            :to="{
                                name: 'member-appointment',
                                params: { id: familyMember.id }
                            }"
                            >Display</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
        <button  v-if="userRoles.includes('ROLE_CITIZEN')" @click="onSubmit" type="submit" class="btn btn-primary">New Family Member</button>
    </div>    
</template>