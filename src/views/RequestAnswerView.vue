<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();
const requestIdRef = ref(null);
const answerRef = ref(null);

const urlRef = computed(() => {
    return 'http://localhost:9090/api/request/' + requestIdRef.value + '/answer/' + answerRef.value;
});

const methodRef = ref('POST')
const authRef = ref(true);
const { performRequest } = useRemoteData(urlRef, authRef, methodRef);

const router = useRouter();

const onSubmitAccept = () => {
    answerRef.value="accept";
    pushAnswer();
};

const onSubmitReject = () => {
    answerRef.value="reject";
    pushAnswer();
};

const pushAnswer = () =>{
    requestIdRef.value = route.params.id;
    performRequest();
    router.push({ name: 'home' });
};

</script>

<template>
    <div>
        <h4>Do you wanna accept or reject the request of this Citizen?</h4>
    </div>
    <div>
        <button @click="onSubmitAccept" type="submit" class="btn btn-primary">Accept</button>
        <button @click="onSubmitReject" type="submit" class="btn btn-primary">Reject</button>
    </div>
</template>