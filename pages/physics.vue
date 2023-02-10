<template>
    <div>
        physics
    </div>
</template>
<script setup>

import {Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, World} from 'matter-js';

onMounted(() => {
    // module aliases
var renderOptions = {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    MouseConstraint,
    Mouse,
    World,
    wireframes: false,
}
// create an engine
var engine = Engine.create(renderOptions);
var world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine,
    options: renderOptions,

});

var mouse = Mouse.create(render.canvas)
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        // stiffness: 0.5,
        render: {
            visible: true
        }
    }
});

World.add(world, mouseConstraint);
render.mouse = mouse;

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var boxC = Bodies.circle(450, 280, 139, {
    render: {
        sprite: {
            texture : '/images/sticker.png',
            xScale: 1,
      yScale: 1
        }
    }
})
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
    stiffness: 0.5,
        render: {
            visible: true
        }
    }
});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, boxC, ground], mouseConstraint);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
})

</script>