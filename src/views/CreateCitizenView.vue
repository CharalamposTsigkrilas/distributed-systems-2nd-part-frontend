<script setup>
import { ref } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";

const formDataRef = ref({
    "fullName": "",
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "department": "",
    "prefecture": "",
    "AMKA": "",
    "apartmentAddress": ""
});

const urlRef = ref("http://localhost:9090/citizen");
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    performRequest();
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
            <label for="username">Username</label>
            <input class="form-control" id="username" v-model="formDataRef.username" type="text" />
        </div>
        <div class="mb-2">
            <label for="password">Password</label>
            <input class="form-control" id="password" v-model="formDataRef.password" type="text" />
        </div>
        <div class="mb-2">
            <label for="email">Email</label>
            <input class="form-control" id="email" v-model="formDataRef.email" type="text" />
        </div>
        <div class="mb-2">
            <label for="phoneNumber">Phone Number</label>
            <input class="form-control" id="phoneNumber" v-model="formDataRef.phoneNumber" type="text" />
        </div>
        <div class="mb-2">
            <label for="department">Department</label>
            <input class="form-control" id="department" v-model="formDataRef.department" type="text" />
        </div>
        <div class="mb-2">
            <label for="prefecture">Prefecture</label>
            <input class="form-control" id="prefecture" v-model="formDataRef.prefecture" type="text" />
        </div>
        <div class="mb-2">
            <label for="AMKA">AMKA</label>
            <input class="form-control" id="AMKA" v-model="formDataRef.AMKA" type="text" />
        </div>
        <div class="mb-2">
            <label for="apartmentAddress">Apartment Address</label>
            <input class="form-control" id="apartmentAddress" v-model="formDataRef.apartmentAddress" type="text" />
        </div>
        <div class="">
            <button class="btn btn-primary" @click="onSubmit" type="button">Create new citizen</button>
        </div>
    </div>
</template>