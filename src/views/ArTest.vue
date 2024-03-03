<script setup lang="ts"></script>
<template>
    <button id="color-change-button" class="gui-button">Color</button>
</template>

<script>
import * as THREE from "three";
import { ARButton } from "three/addons/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { usePayloadStore } from "@/store/orderStore";

export default {
    mounted() {
        this.init();
        this.animate();
    },
    methods: {
        getRandomInt(minimum, maximum) {
            const minInt = Math.ceil(minimum);
            const maxInt = Math.floor(maximum);
            return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
        },
        init() {
            const container = document.createElement("div");
            document.body.appendChild(container);

            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(
                70,
                window.innerWidth / window.innerHeight,
                0.01,
                40
            );

            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.xr.enabled = true; // New!
            container.appendChild(this.renderer.domElement);
            this.renderer.domElement.style.backgroundColor = 'transparent';

            const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
            light.position.set(0.5, 1, 0.25);
            this.scene.add(light);

            const geometry = new THREE.IcosahedronGeometry(0.1, 1);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color("rgb(226,35,213)"),
                shininess: 6,
                flatShading: true,
                transparent: 1,
                opacity: 0.8,
            });

            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.set(0, 0, -0.5);
            this.scene.add(this.mesh);

            const button = ARButton.createButton(this.renderer, {
                optionalFeatures: [
                    "dom-overlay",
                    "dom-overlay-for-handheld-ar",
                ],
                domOverlay: {
                    root: document.body,
                },
            });
            document.body.appendChild(button);

            const colorChangeButton = document.getElementById(
                "color-change-button"
            );

            // The following code installs an event handler to selectively suppress XR events for that region,
            // while continuing to generate XR events for other parts of the DOM overlay that are treated as
            // transparent for interaction purposes.
            colorChangeButton.addEventListener("beforexrselect", (ev) =>
                ev.preventDefault()
            );

            // The following code adds a 'click' event handler for what to do when the button is pressed
            colorChangeButton.addEventListener("click", (event) => {
                const randomColor = `rgb(${this.getRandomInt(
                    0,
                    360
                )}, ${this.getRandomInt(0, 360)}, ${this.getRandomInt(
                    0,
                    360
                )})`;
                this.mesh.material.color = new THREE.Color(randomColor);
            });

            window.addEventListener("resize", this.onWindowResize, false);
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        animate() {
            this.renderer.setAnimationLoop(this.render);
        },
        render() {
            this.renderer.render(this.scene, this.camera);
        },
    },
    data() {
        return {
            payloadStore: usePayloadStore(),
        };
    },
};
</script>

<style>
.gui-button {
    right: 20px;
    position: absolute;
    bottom: 20px;
    padding: 12px 6px;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
    color: rgb(255, 255, 255);
    font: 13px sans-serif;
    text-align: center;
    opacity: 0.5;
    outline: none;
    z-index: 999;
    cursor: pointer;
    left: calc(80% - 50px);
    width: 100px;
}
</style>
