<script setup lang="ts">
// import { usePayloadStore } from "@/store/orderStore";;
// const payloadStore = usePayloadStore();
</script>
<template>
    <h1>Dina uppgifter</h1>
    <fieldset style="position: relative;">
        <div class="userinfo">
        <label>Förnamn</label>
        <input
            v-model="payloadStore.firstName.value"
            :class="{ 'input-error': payloadStore.firstName.hasError }"
            @focus="payloadStore.clearErrorOnFocus('firstName')"
        /><br />
        <label>Efternamn</label>
        <input
            v-model="payloadStore.lastName.value"
            :class="{ 'input-error': payloadStore.lastName.hasError }"
            @focus="payloadStore.clearErrorOnFocus('lastName')"
        /><br />
        <label>Personnummer</label>
        <input v-model="payloadStore.socialSecurity.value" /><br />
        <label>Telefonnummer</label>
        <input v-model="payloadStore.phoneNumber.value" /><br />
        <label>E-postadress</label>
        <input
            v-model="payloadStore.email.value"
            :class="{ 'input-error': payloadStore.email.hasError }"
            @focus="payloadStore.clearErrorOnFocus('email')"
        /><br />
        <label>Adress</label>
        <input
            v-model="payloadStore.address.value"
            :class="{ 'input-error': payloadStore.address.hasError }"
            @focus="payloadStore.clearErrorOnFocus('address')"
        /><br />
        <label>Postnummer</label>
        <input
            v-model="payloadStore.zipCode.value"
            :class="{ 'input-error': payloadStore.zipCode.hasError }"
            @focus="payloadStore.clearErrorOnFocus('zipCode')"
        />
        <br />
        <label>Postort</label>
        <input
            v-model="payloadStore.city.value"
            :class="{ 'input-error': payloadStore.city.hasError }"
            @focus="payloadStore.clearErrorOnFocus('city')"
        />
        <br />
        <div class="message-box">
        <label>Meddelande</label>
        <textarea v-model="payloadStore.message.value"></textarea>
    </div>
    </div>
    </fieldset>
    
</template>

<script lang="ts">
import { usePayloadStore } from "@/store/orderStore";

export default {
    mounted() {
        this.$watch(
            () => [
                this.payloadStore.firstName.hasError,
                this.payloadStore.lastName.hasError,
                this.payloadStore.email.hasError,
                this.payloadStore.address.hasError,
                this.payloadStore.zipCode.hasError,
                this.payloadStore.city.hasError,
            ],
            (newValue: any, oldValue: any) => {}
        );
    },
    data() {
        return {
            payloadStore: usePayloadStore(),
        };
    },
};
</script>

<style>
fieldset {
    position: relative;
    width: 400px;
    border: none;
}
.message-box {
    display: flex;
    text-align: left;
    flex-flow: column wrap;
    width: 100%;
    margin-bottom: 24px;
}
.message-box label {
    margin-left: 5px;
    margin-bottom: 5px;
}

.message-box textarea {
    background-color: #fff;
    background-image: none;
    border: 1px solid #919191;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    padding: 12px 12px;
    height: 220px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.message-box textarea {
    border: 2px solid #ededed;
    border-radius: 6px;
    box-shadow: none;
    color: #1e1e1e;
    font-family: Inter-400, sans-serif;
    font-size: 1rem;
}
.userinfo input {
    max-width: 400px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #919191;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.userinfo {
    width: 100%;
    text-align: left;
    display: grid;
    margin-bottom: 30px;
}

.userinfo label {
    margin-left: 5px;
    margin-bottom: 5px;
}

.userinfo input {
    border: 2px solid #ededed;
    border-radius: 6px;
    box-shadow: none;
    color: #1e1e1e;
    font-family: Inter-400, sans-serif;
    font-size: 1rem;
    height: 3rem;
}

.userinfo input:focus {
    outline: rgb(151, 149, 149) solid 1px;
}

.input-error {
    border: 2px solid rgba(255, 0, 0, 0.8) !important;
}
</style>
