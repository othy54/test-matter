<template>
    <div class="section pt-5 pl-4 overflow-hidden relative">
        <ul>
            <li class="list-item">NANCY OPEN AIR
                <div class="collapse-sectin">
                    <div ref="blister" class="blister-wrapper max-w-[1295px] bg-[#FD6C43]" :class="isBounced ? 'bounced' : ''" @mouseenter="isBounced = true" @mouseleave="isBounced = false">
                        <div class="blister-container relative ">
                            <div ref="ncyOpen" class="page bg-[#FDE3D7] aspect-[1141/751] w-[88%] rounded-[8px] px-20 pt-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                                <div class="header flex justify-between italic text-4xl text-[#FD6C43] font-black mb-10">
                                    <div class="title">NANCY OPEN AIR</div>
                                    <div>2022</div>
                                </div>
                                <!-- <div class="w-full h-full flyer"></div> -->
                            </div>
                            <!-- <img class="absolute bottom-20 left-[10%] w-[65%] bracelet" src="/images/bracelet.png" alt=""> -->
                            <!-- <img class="absolute bottom-16 right-[10%] w-[25%] sticker" src="/images/sticker.png" alt=""> -->
                            <div class="blister mix-blend-screen w-full relative z-10">
                                <img class="w-full  aspect-[1141/751]" src="/images/blister.png" alt="">
                            </div>
                            <div ref="canvas" class="canevas-wrapper absolute z-[9]  w-[88%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">

                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="list-item">MY SAM</li>
            <li class="list-item">BLÜEN</li>
            <li class="list-item">MAIRIE DE LUNÉVILLE</li>
        </ul>
        <ClientOnly>
            <Counter />
        </ClientOnly>

        <!-- <Counter /> -->
    </div>

</template>

<script setup>

// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';



import {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Body
} from 'matter-js';

const isBounced = ref(false);
const ncyOpen = ref(null)


onMounted(() => {

    var el = document.querySelector('.canevas-wrapper');

    var renderOptions = {
        Engine,
        Render,
        Runner,
        Bodies,
        Composite,
        Body
    }

    var engine = Engine.create(renderOptions);

    var render = Render.create({
        element: el,
        engine,
        options: {
            wireframes: false,
            background: 'transparent',
            width: 1140,
            height: 751
        },

    });

    var sticker = Bodies.circle(950, 480, 139, {
        render: {
            sprite: {
                texture: '/images/sticker.png',
                xScale: 1,
                yScale: 1
            }
        },
        collisionFilter: {
            mask: 0x0001,
            category: 0x0002
        },
    })
    var bracelet = Bodies.rectangle(550, 280, 1030, 90, {
        render: {
            sprite: {
                texture: '/images/bracelet.png',
                xScale: 1,
                yScale: 1
            }
        },
        collisionFilter: {
            category: 0x0002
        },
        friction: 0

    })
    var visual = Bodies.rectangle(550, 280, 847, 599, {
        render: {
            sprite: {
                texture: '/images/flyer.png',
                xScale: 1,
                yScale: 1
            }
        },
        collisionFilter: {
            mask: 0x0001
        },
        friction: 5
    })
    var ground = Bodies.rectangle(0, 751, 2280, 1, {
        friction: 5,
        isStatic: true,
        render: {
            fillStyle: 'black'
        }
    });
    var wallLeft = Bodies.rectangle(0, 0, 1, 1502, {

        isStatic: true,
        render: {
            fillStyle: 'black'
        }
    });
    var wallRight = Bodies.rectangle(1140, 0, 1, 1502, {
        isStatic: true,
        render: {
            fillStyle: 'black'
        }
    });
    var roof = Bodies.rectangle(0, 0, 2280, 1, {

        friction: 0,
        isStatic: true,
        render: {
            fillStyle: 'black'
        }
    });
    var allItems = [];
    allItems.push(sticker, bracelet, visual);

    var world = engine.world;
    engine.world.gravity.y = 5;

    // add all of the bodies to the world
    Composite.add(world, [visual, sticker, bracelet, ground, wallLeft, wallRight, roof]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    nextTick(() => {
        document.querySelector('.blister').addEventListener("mouseover", function() {
            allItems.forEach((body) => {
                Body.setStatic(body, false);
                Body.setVelocity(body, {
                    x: Math.random() * 0 - 10 ,
                    y: -30
                });
                Body.setAngularVelocity(body, Math.random() * (0.008 - 0.008) + -0.008);
            });
        }, false);
        window.addEventListener('resize', () => {
            let canvasWidth = ncyOpen.value.clientWidth;
            let canvasHeight = ncyOpen.value.clientHeight;
            render.options.width = canvasWidth;
            render.options.height = canvasHeight;
            render.canvas.width = canvasWidth;
            render.canvas.height = canvasHeight;
            Body.setPosition(wallRight, {x: canvasWidth, y: canvasHeight});
            Body.setPosition(ground, {x: 0, y: canvasHeight})
        })
    })

    console.log(render.engine.world.bodies);

    // gsap.to('.title', {
    //     scrollTrigger: {
    //         trigger : '.title',
    //         markers: true,
    //     },
    //     x: 250
    // })
})


</script>

<style lang="postcss" scoped>

.list-item {
    @apply text-6xl font-medium py-8 text-[#FDE3D7] border-b-2 border-[#FDE3D7];
}

.section {
    background-color: #FD6C43;
    height: 500vh;
}

.flyer {
    background-image: url('/images/flyer.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}



.collapse-section {
    display: grid;
    grid-template-rows: 0fr;
    transition: 0.5s;
    overflow: hidden;

    .blister-wrapper {
        min-height: 0;
    }
}

.section:hover {
    .collapse-section {
        grid-template-rows: 1fr;
    }
}

.bounced {
    animation: bounce 0.3s forwards;
}

@keyframes bounce {
    0% {
        transform: translateY(0)
    }

    50% {
        transform: translateY(-20px)
    }

    100% {
        transform: translateY(0)
    }
}

</style>