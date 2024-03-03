<script setup lang="ts">
import { usePayloadStore } from "@/store/orderStore";
const payloadStore = usePayloadStore();
</script>
<template>
    <div class="main">
        <h1>Order Confirmation</h1>
        <div class="order-details" v-if="payloadStore">
            <p>Leveransdatum: {{ payloadStore.deliveryDate.value }}</p>
            <p>Upphätmningsdatum: {{ payloadStore.pickupDate.value }}</p>
            <p>Förnamn: {{ payloadStore.firstName.value }}</p>
            <p>Efternamn: {{ payloadStore.lastName.value }}</p>
            <p>Personnummer: {{ payloadStore.socialSecurity.value }}</p>
            <p>Telefonnummer: {{ payloadStore.phoneNumber.value }}</p>
            <p>E-post adress: {{ payloadStore.email.value }}</p>
            <p>Gatuadress: {{ payloadStore.address.value }}</p>
            <p>Postnummer: {{ payloadStore.zipCode.value }}</p>
            <p>Ort: {{ payloadStore.city.value }}</p>
            <p>Container: {{ payloadStore.selectedContainer.value?.title }}</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {};
</script>
