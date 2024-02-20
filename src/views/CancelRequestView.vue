<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();
const requestIdRef = ref(null);

const urlRef = computed(() => {
    return 'http://localhost:9090/api/request/' +requestIdRef.value+ '/delete';
});

const methodRef = ref('POST')
const authRef = ref(true);
const { performRequest } = useRemoteData(urlRef, authRef, methodRef);

const router = useRouter();

const onSubmit = () => {
    requestIdRef.value = route.params.id;
    performRequest();
    router.push({ name: 'home' });
};

</script>

<template>
    <div>
        <h4>Are you sure that you want to cancel your request for this Doctor?</h4>
    </div>
    <div>
        <button @click="onSubmit" type="submit" class="btn btn-primary">Confirm</button>
    </div>
</template>