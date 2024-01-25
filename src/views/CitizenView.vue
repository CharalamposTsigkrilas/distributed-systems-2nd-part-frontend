<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const citizenIdRef = ref(null);

onMounted(() => {
    citizenIdRef.value = route.params.id;
});
</script>


<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'citizens' }">Back to Citizens</RouterLink>
                        <h1 class="fs-3">Citizen #{{ citizenIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'citizen-details', params: { id: citizenIdRef } }"
                                >Details</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'citizen-family', params: { id: citizenIdRef } }"
                                >Family Members</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink 
                                    class="nav-link"
                                    :to="{ name: 'family-doctor', params: { id: citizenIdRef } }"
                                >Family Doctor</RouterLink>
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