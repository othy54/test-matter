<template>
    <div class="mt-10">
        {{ count }} <br>
        <button @click="increment">Add +1</button>
    </div>
</template>
<script setup>

const count = ref(0);

const increment = () => {
    count.value++;
}

</script>
