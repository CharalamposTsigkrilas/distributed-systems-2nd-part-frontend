<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const requestIdRef = ref(null);

onMounted(() => {
    requestIdRef.value = route.params.id;
    router.push({ name: 'request-citizen-details'});
});
</script>


<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <!-- <div class="mb-4">
                        <h1 class="fs-3">Request #{{ requestIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'request-details', params: { id : requestIdRef } }"
                                >Details</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink 
                                    class="nav-link"
                                    :to="{ name: 'request-citizen-details', params: { id : requestIdRef } }"
                                >Citizen of the request</RouterLink>
                            </li>
                        </ul>
                    </div> -->
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>