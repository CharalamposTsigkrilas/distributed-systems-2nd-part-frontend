<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';

const route = useRoute();
const citizenIdRef = ref(null);
const doctorIdRef = ref(null);

const urlRef = computed(() => {
    return 'http://localhost:9090/api/doctor/' +doctorIdRef.value+ '/remove/citizen/' +citizenIdRef.value;
});

const methodRef = ref('POST')
const authRef = ref(true);
const { performRequest } = useRemoteData(urlRef, authRef, methodRef);

const applicationStore = useApplicationStore();

const router = useRouter();

const onSubmit = () => {
    citizenIdRef.value = route.params.id;
    doctorIdRef.value = applicationStore.userData.id;
    performRequest();
    router.push({ name: 'home' });
};

</script>

<template>
    <div>
        <h4>Are you sure that you want to remove this citizen from your list?</h4>
    </div>
    <div>
        <button @click="onSubmit" type="submit" class="btn btn-primary">Confirm</button>
    </div>
</template>