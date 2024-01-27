<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const doctorIdRef = ref(null);

onMounted(() => {
    doctorIdRef.value = route.params.id;
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <!-- <RouterLink class="small" :to="{ name: 'doctors' }">Back to Doctors</RouterLink> -->
                        <h1 class="fs-3">Doctor #{{ doctorIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'doctor-details', params: { id: doctorIdRef } }"
                                >Details</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'doctor-citizens', params: { id: doctorIdRef } }"
                                >Citizens</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink 
                                    class="nav-link"
                                    :to="{ name: 'doctor-appointments', params: { id: doctorIdRef } }"
                                >Appointments</RouterLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>