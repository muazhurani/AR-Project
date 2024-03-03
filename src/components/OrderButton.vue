<template>
    <div>
        <button
            class="order-button"
            @click="
                () => {
                    handleClick();
                    // sendAdminEmail();
                }
            "
        >
            Beställ
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import emailjs from "emailjs-com";
import { usePayloadStore } from "@/store/orderStore";

export default defineComponent({
    mounted() {
        emailjs.init("aJoppP8gvteb65_ur");
    },
    name: "OrderButton",

    methods: {
        handleClick() {
            const payloadStore = usePayloadStore();
            payloadStore.validateFields();

            if (!payloadStore.allFieldsValid()) {
                return false;
            }
            this.$router.push("/OrderConfirmation");
            // this.$router.push({
            //     name: "OrderConfirmation",
            // });
        },
        // sendEmail() {
        //     emailjs
        //         .send(
        //             "service_ne3xu3v",
        //             "template_chpkccp",
        //             {
        //                 to_name: "Recipient Name",
        //                 from_name: "Your Name",
        //                 message:
        //                     "This is a test email sent from Vue.js using EmailJS and Gmailaaaaaaaaaaaa.",
        //                 to_email: "jawntalol@gmail.com",
        //             },
        //             "aJoppP8gvteb65_ur"
        //         )
        //         .then(
        //             function (response) {
        //                 console.log("SUCCESS!", response.status, response.text);
        //             },
        //             function (error) {
        //                 console.log("FAILED...", error);
        //             }
        //         );
        // },
        sendAdminEmail() {
            const payloadStore = usePayloadStore();
            emailjs
                .send(
                    "service_ne3xu3v",
                    "template_1e44wa8",
                    {
                        deliveryDate: payloadStore.deliveryDate.value,
                        pickupDate: payloadStore.pickupDate.value,
                        firstname: payloadStore.firstName.value,
                        lastname: payloadStore.lastName.value,
                        socialSecurity: payloadStore.socialSecurity.value,
                        phoneNumber: payloadStore.phoneNumber.value,
                        email: payloadStore.email.value,
                        address: payloadStore.address.value,
                        zipcode: payloadStore.zipCode.value,
                        city: payloadStore.city.value,
                        title:
                            payloadStore.selectedContainer.value?.title || "",
                        length:
                            payloadStore.selectedContainer.value?.length || 0,
                        width:
                            payloadStore.selectedContainer.value?.width || "",
                        height:
                            payloadStore.selectedContainer.value?.height || "",

                        to_email: "jawntalol@gmail.com",
                    },
                    "aJoppP8gvteb65_ur"
                )
                .then(
                    function (response) {
                        console.log("SUCCESS!", response.status, response.text);
                    },
                    function (error) {
                        console.log("FAILED...", error);
                    }
                );
        },
    },
});
</script>

<style>
.order-button {
    font-weight: medium;
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2c84d0;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: pointer;
    font-size: 17px;
    min-width: 250px;
    padding: 15px;
    margin-bottom: 5px;
    margin-top: 40px;
    border: none;
    color: white;
}
</style>
