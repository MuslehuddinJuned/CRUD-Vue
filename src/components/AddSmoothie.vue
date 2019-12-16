<template>
    <div class="add-smoothie container mt-4">
        <h3 class="center-align indigo-text">Add New Smoothie Recipe</h3>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" name="add-ingredient">
            </div>
            <div class="field center-align">
                <button class="btn green">Add Smoothie</button>
            </div>

        </form>
    </div>
</template>

<script>
export default {
    name: 'AddSmoothie',
    data(){
        return{
            title: null
        }
    },
    methods: {
        AddSmoothie(){
            console.log(this.title)
        }
    } 
}
</script>

<style>
.add-smoothie{
    padding: 20px;
    max-width: 600px;
}
.add-smoothie h3{
    font-size:2.5em;
}
.add-smoothie .field{
    margin: 20px auto;
}
</style>