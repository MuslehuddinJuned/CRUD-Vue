<template>
    <div class="add-smoothie container mt-4">
        <h3 class="center-align indigo-text">Add New Smoothie Recipe</h3>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field ingredient" v-for="(ing, index) in ingredients" :key="index">
                <label for="ingredient">ingredient</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" name="add-ingredient" v-model="another">
                <i class="material-icons delete" @click="addIng">add</i>
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn green">Add Smoothie</button>
            </div>

        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddSmoothie',
    data(){
        return{
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddSmoothie(){
            if(this.title){
                this.feedback = null
                // create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.#()'"!\-:@]/g,
                    lower: true
                })
                if(this.another){
                    this.ingredients.push(this.another)
                    this.another= null
                }
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(()=>{
                    this.$router.push({name: 'Index'})
                }).catch(err=>{
                    console.log(err)
                })

            } else {
                this.feedback = 'Title required'
            }
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another= null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value as ingredient'
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient =>{
                return ingredient != ing
            })
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
    position: relative;
}
.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>