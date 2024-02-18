<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { useRemoteData } from "@/composables/useRemoteData.js";

const formDataRef = ref({
    "fullName": "",
    "amka": "",
    "memberRelationship": ""
});

const route = useRoute();

const citizenIdRef = ref(null);

onMounted(() => {
    citizenIdRef.value = route.params.id;
});

const urlRef = computed(() => {
    return "http://localhost:9090/api/familyMember/new/for/citizen/" + citizenIdRef.value ;
});
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const router = useRouter()

const validateInputs = () => {
    for (const key in formDataRef.value) {
        if (!formDataRef.value[key]) {
            alert('Please fill all the attributes!');
            return false;
        }
    }
    return true;
}

const onSubmit = () => {
    if (validateInputs()) {
        performRequest();
        router.push({ name: 'home'});
    }
};
</script>

<template>
    <div class="container mb-4">
        <h1>New Citizen</h1>
    </div>
    <div>
        <pre>{{ data }}</pre>
    </div>
    <div class="container mb-4">
        <div class="mb-2">
            <label for="fullName">Full Name</label>
            <input class="form-control" id="fullName" v-model="formDataRef.fullName" type="text" />
        </div>
        <div class="mb-2">
            <label for="amka">AMKA</label>
            <input class="form-control" id="amka" v-model="formDataRef.amka" type="text" />
        </div>
        <div class="mb-2">
            <label for="memberRelationship">Relationship with citizen</label>
            <input class="form-control" id="memberRelationship" v-model="formDataRef.memberRelationship" type="text" />
        </div>
        <div class="">
            <button class="btn btn-primary" @click="onSubmit" type="button">Create new member</button>
        </div>
    </div>
</template>