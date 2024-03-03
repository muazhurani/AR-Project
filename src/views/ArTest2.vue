<script setup lang="ts"></script>
<template>
    <div ref="container"></div>
    <div id="circle"></div>
</template>

<script>
import * as THREE from "three";
import { ARButton } from "three/addons/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { usePayloadStore } from "@/store/orderStore";

export default {
    mounted() {
        console.log(this.payloadStore.selectedContainer);
        this.init();
        this.animate();
        window.addEventListener("resize", this.onWindowResize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    },
    methods: {
        init() {
            const container = this.$refs.container;
            this.camera = new THREE.PerspectiveCamera(
                70,
                window.innerWidth / window.innerHeight,
                0.1,
                20
            );
            this.camera.position.z = 1;

            this.scene = new THREE.Scene();

            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.xr.enabled = true;
            container.appendChild(this.renderer.domElement);

            const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
            light.position.set(0.5, 1, 0.25);
            this.scene.add(light);

            this.controller = this.renderer.xr.getController(0);
            this.controller.addEventListener("select", this.onSelect);
            this.scene.add(this.controller);

            this.addReticleToScene();
            // this.addSnapshotButtonToScene();
            this.addModelToScene(); // add only 1 model to the scene and we will just update it's position

            const button = ARButton.createButton(this.renderer, {
                requiredFeatures: ["hit-test"], // notice a new required feature
            });
            document.body.appendChild(button);

            this.renderer.domElement.style.display = "none";

            window.addEventListener("resize", this.onWindowResize, false);
        },
        async addModelToScene() {
            // specify a model URL
            const modelUrl =
                this.payloadStore.selectedContainer.value?.modelPath;
            // load the model
            const loader = new GLTFLoader();
            const gltf = await loader.loadAsync(modelUrl);
            this.model = gltf.scene; // save a reference to this object in the "model" variable
            this.model.outputEncoding = THREE.sRGBEncoding;
            this.model.scale.multiplyScalar(0.005); // make this particular model a bit larger

            this.model.visible = false; // set the model to false

            this.scene.add(this.model); // so model is in the scene but invisible
        },
        addReticleToScene() {
            const geometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(
                -Math.PI / 2
            );
            const material = new THREE.MeshBasicMaterial();

            this.reticle = new THREE.Mesh(geometry, material);

            // we will calculate the position and rotation of this reticle every frame manually
            // in the render() function so matrixAutoUpdate is set to false
            this.reticle.matrixAutoUpdate = false;
            this.reticle.visible = false; // we start with the reticle not visible
            this.scene.add(this.reticle);
        },
        addSnapshotButtonToScene() {
            // create the ring geometry
            const ringGeometry = new THREE.RingGeometry(0.5, 0.7, 32);
            // create the material for the ring
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                wireframeLinewidth: 2, // set the width of the wireframe border
            });
            // create the ring mesh
            const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
            // set the position of the ring
            ringMesh.position.set(0, 0, -1);
            // add the ring to the scene
            this.scene.add(ringMesh);
        },
        onSelect() {
            if (this.reticle.visible && this.model) {
                this.model.visible = true; // make sure we set the model to visible
                // just update its position, not necessarily to create a new one
                // this.model.matrixAutoUpdate = false; // holds the container in a solid position
                this.model.position.setFromMatrixPosition(this.reticle.matrix);
                this.model.quaternion.setFromRotationMatrix(
                    this.reticle.matrix
                );
            }
        },
        animate() {
            this.renderer.setAnimationLoop(this.render);
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        async initializeHitTestSource() {
            const session = this.renderer.xr.getSession(); // XRSession

            // Reference spaces express relationships between an origin and the world.

            // For hit testing, we use the "viewer" reference space,
            // which is based on the device's pose at the time of the hit test.
            const viewerSpace = await session.requestReferenceSpace("viewer");
            this.hitTestSource = await session.requestHitTestSource({
                space: viewerSpace,
            });

            // We're going to use the reference space of "local" for drawing things.
            // which gives us stability in terms of the environment.
            // read more here: https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace
            this.localSpace = await session.requestReferenceSpace("local");

            // set this to true so we don't request another hit source for the rest of the session
            this.hitTestSourceInitialized = true;

            // In case we close the AR session by hitting the button "End AR"
            session.addEventListener("end", () => {
                this.hitTestSourceInitialized = false;
                this.hitTestSource = null;
            });
        },
        render(timestamp, frame) {
            if (frame) {
                // 1. create a hit test source once and keep it for all the frames
                // this gets called only once
                if (!this.hitTestSourceInitialized) {
                    this.initializeHitTestSource();
                }

                // 2. get hit test results
                if (this.hitTestSourceInitialized) {
                    // we get the hit test results for a particular frame
                    const hitTestResults = frame.getHitTestResults(
                        this.hitTestSource
                    );

                    // XRHitTestResults The hit test may find multiple surfaces. The first one in the array is the one closest to the camera.
                    if (hitTestResults.length > 0) {
                        const hit = hitTestResults[0];
                        // Get a pose from the hit test result. The pose represents the pose of a point on a surface.
                        const pose = hit.getPose(this.localSpace);

                        this.reticle.visible = true;
                        // Transform/move the reticle image to the hit test position
                        this.reticle.matrix.fromArray(pose.transform.matrix);
                    } else {
                        this.reticle.visible = false;
                    }
                }

                this.renderer.render(this.scene, this.camera);
            }
        },
    },
    data() {
        return {
            payloadStore: usePayloadStore(),
        };
    },
};
</script>
