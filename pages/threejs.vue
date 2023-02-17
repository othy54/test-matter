<template>
    <div>
        <div ref="toRender" class="to-render fixed top-0 left-0"></div>
        <div class="relative section-page pt-16">
            <div class="title text-center uppercase text-[80px] font-semibold text-white h-screen">Ceci est un lapinou</div>
            <div class="section-2 h-[200vh] "></div>
            <div class="section-3 h-[180vh] bg-red-200 bg-opacity-10"></div>
            <div class="section-3 h-[1vh]"></div>
        </div>
        <div class="fixed pres left-40 top-60">
            <div class="wrapper overflow-hidden">
                <div class="text-white text-[112px] font-bold leading-[110%] title-reveal translate-y-full">
                    Un Lapinou <br> Tout Mignon
                </div>
            </div>
            <div class="wrapper overflow-hidden mt-10">
                <div class="text-white w-1/2 text-xl text-reveal translate-y-full">
                    Une petite lampe de chevet qui apporte une lueur douce et chaleureuse dans la chambre. Avec ses grandes oreilles et son petit nez rose, il est l'objet préféré de l'enfant qui partage sa chambre. Chaque soir, avant de s'endormir, l'enfant allume la lampe et admire la douce lumière qui émane de ses yeux brillants.
                </div>
            </div>
        </div>
         <div class="fixed ears top-60 left-1/2 -translate-x-1/2">
            <div class="wrapper-2 overflow-hidden">
                <div class="text-white text-[82px] font-bold leading-[110%] title-reveal whitespace-nowrap translate-y-full">
                    Carressez les oreilles et lumière !
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Scene, WebGLRenderer, PerspectiveCamera, RectAreaLight, DirectionalLightHelper, AxesHelper, AmbientLight ,DirectionalLight, Color, HemisphereLight } from 'three';
import { RectAreaLightHelper }  from 'three/addons/helpers/RectAreaLightHelper.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'




const toRender = ref(null)

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
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
                      //  markers: true,
                        end: 'top 40%',
                        scrub: true,
                    }
                }).to(gltf.scene.position, {
                    x: 8
                }).to(gltf.scene.rotation, {
                    y: -0.5
                }, '=')
            }
        });
        gsap.to('.wrapper > div', {
            scrollTrigger: {
                trigger: '.section-2',
                start: 'top 40%',
                end: 'top 20%',
                toggleActions: "play none none reverse",
            },
            y: 0
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: '.section-3',
                //  markers: true,
                top: 'top 40%',
                scrub: true,
            }
        }).to(gltf.scene.position, {
            x: -0.5,
            z: 8,
            y: -5.5
        }).to(gltf.scene.rotation, {
            y: 7.4
        }, '=')

        gsap.to('.pres', {
            scrollTrigger: {
                trigger: '.section-3',
                start: 'top 40%',
                end: 'bottom 20%',
                toggleActions: "play none none reverse",
            },
            opacity: 0
        });

        gsap.to('.wrapper-2 > div', {
            scrollTrigger: {
                trigger: '.section-3',
                start: 'bottom 100%',
                toggleActions: "play none none reverse",
            },
            y: 0
        });


        scene.add(gltf.scene)
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