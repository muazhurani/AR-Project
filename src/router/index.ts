import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/MainPage.vue";
import OrderConfirmation from "@/views/OrderConfirmation.vue";
import ArMain from "@/views/ArMain.vue";
import ArTest2Vue from "@/views/ArTest2.vue";
import ArTest from "@/views/ArTest.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/orderConfirmation",
            name: "OrderConfirmation",
            component: OrderConfirmation,
        },
        {
            path: "/ArMain",
            name: "ArMain",
            component: ArMain,
        },
        {
            path: "/ArTest",
            name: "ArTest",
            component: ArTest,
        },
        {
            path: "/ArTest2",
            name: "ArTest2",
            component: ArTest2Vue,
        },
    ],
});

export default router;
