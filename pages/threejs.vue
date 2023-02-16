<template>
    <div>
        <div ref="toRender" class="to-render fixed top-0 left-0"></div>
        <div class="relative section-page pt-16">
            <div class="title text-center uppercase text-[80px] font-semibold text-white h-screen">Ceci est un lapinou</div>
            <div class="section-2 h-[800vh]"></div>
        </div>
    </div>
</template>
<script setup>
import { Scene, WebGLRenderer, PerspectiveCamera, RectAreaLight, DirectionalLightHelper, AxesHelper, AmbientLight ,DirectionalLight, Color, HemisphereLight } from 'three';
import { RectAreaLightHelper }  from 'three/addons/helpers/RectAreaLightHelper.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger);


const toRender = ref(null)

onMounted(() => {
    const renderer = new WebGLRenderer( { antialias: true } );

    renderer.setSize(window.innerWidth, window.innerHeight);
    toRender.value.appendChild(renderer.domElement);


    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 1.5, 10 );
    camera.lookAt( 1, 0, 1 );

    const scene = new Scene();


    // const directionalLightRight = new DirectionalLight(0xffffff, 1);
    // const directionalLightLeft = new DirectionalLight(0xffffff, 1);
    // const directionalLightLeft = new DirectionalLight(0xffffff, 1);
    // directionalLightRight.position.set(0, 1, 1);
    // directionalLightLeft.position.set(0, -2, -30);

    // scene.add(directionalLightRight, directionalLightLeft);

    // var helper = new DirectionalLightHelper(directionalLightLeft, 5, 0xff0000);
    // scene.add(helper);

    // const width = 15;
    // const height = 5;
    // const intensity = 8;

    // const rectLight = new RectAreaLight( 0xffffff, intensity,  width, height );
    // rectLight.position.set( 5, 2, 8 );
    // rectLight.lookAt( 0, 0, 0 );
    // scene.add( rectLight )

    // const rectLightHelper = new RectAreaLightHelper( rectLight );
    // rectLight.add( rectLightHelper );

    const hemiLight = new HemisphereLight( 0xffffff, 0x444444, 1.5 );
    hemiLight.position.set( 0, 50, 0 );
    scene.add( hemiLight );

    // const dirLight = new DirectionalLight( 0xffffff );
    // dirLight.position.set( 0, 20, 10 );
    // scene.add( dirLight );

    // const axesHelper = new AxesHelper( 5 );
    // scene.add( axesHelper );



    // const light = new AmbientLight(); // soft white light
    // scene.add( light );

    const loader = new GLTFLoader();
    loader.load('/rabbit.glb', (gltf) => {
        gltf.scene.scale.set(0.4, 0.4, 0.4);
        gltf.scene.position.y = -3;
        gltf.scene.rotation.y = -3;
        gsap.to(gltf.scene.rotation, {
            y: 0,
            duration: 2,
            onComplete: () => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: '.section-2',
                        scrub: true,
                    }
                }).to(gltf.scene.position, {
                    x: 10
                }).to(gltf.scene.rotation, {
                    y: -0.5
                }, '=')
            }
        });
        scene.add(gltf.scene)
        console.log(gltf)
    });

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();


    const animate = () => {
        requestAnimationFrame(animate);
        //controls.update();
        renderer.render(scene, camera);
    }

    animate();
})




</script>