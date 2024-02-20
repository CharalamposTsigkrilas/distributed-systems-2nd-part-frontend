<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { useRemoteData } from "@/composables/useRemoteData.js";

const formDataRef = ref({
    "date": "",
    "time": "",
    "place": "",
    "customerName": "",
    "doctorName": "",
    "evaluationGrade": "",
    "currentStatus": "",
    "amka": ""
});

const route = useRoute();

const familyMemberIdRef = ref(null);

onMounted(() => {
    familyMemberIdRef.value = route.params.id;
});

const urlRef = computed(() => {
    return "http://localhost:9090/api/appointment/new/for/FamilyMember/" + familyMemberIdRef.value ;
});
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const router = useRouter();

const onSubmit = () => {
    performRequest();
    router.push({ name: 'home'});
};
</script>

<template>
    <div class="container mb-4">
        <h1>New Appointment</h1>
    </div>
    <div>
        <pre>{{ data }}</pre>
    </div>
    <div class="container mb-4">
        <div class="mb-2">
            <label for="date">Date</label>
            <input class="form-control" id="date" v-model="formDataRef.date" type="text" />
        </div>
        <div class="mb-2">
            <label for="time">Time</label>
            <input class="form-control" id="time" v-model="formDataRef.time" type="text" />
        </div>
        <div class="mb-2">
            <label for="place">Place</label>
            <input class="form-control" id="place" v-model="formDataRef.place" type="text" />
        </div>
        <div class="">
            <button class="btn btn-primary" @click="onSubmit" type="button">Done</button>
        </div>
    </div>
</template>