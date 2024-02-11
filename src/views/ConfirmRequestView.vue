<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';

const route = useRoute();
const doctorIdRef = ref(null);
const citizenIdRef = ref(null);

const urlRef = computed(() => {
    return 'http://localhost:9090/api/request/new/from/citizen/' + citizenIdRef.value + '/to/doctor/' + doctorIdRef.value;
});

const methodRef = ref('POST')
const authRef = ref(true);
const { performRequest } = useRemoteData(urlRef, authRef, methodRef);

const applicationStore = useApplicationStore();

const router = useRouter();

const onSubmit = () => {
    doctorIdRef.value = route.params.id;
    citizenIdRef.value = applicationStore.userData.id;
    performRequest();
    router.push({ name: 'home' });
};

</script>

<template>
    <div>
        <h4>Are you sure that you want to send request for this Doctor?</h4>
    </div>
    <div>
        <button @click="onSubmit" type="submit" class="btn btn-primary">Confirm!</button>
    </div>
</template>