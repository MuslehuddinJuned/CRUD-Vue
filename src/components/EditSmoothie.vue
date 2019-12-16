<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h3 class="center-align indigo-text">Update {{smoothie.title}} Smoothie Recipe</h3>
        <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div class="field ingredient" v-for="(ing, index) in smoothie.ingredients" :key="index">
                <label for="ingredient">ingredient</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient (Press tab to add more ingredients)</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn green">Update Smoothie</button>
            </div>

        </form>
    </div>
    
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data(){
        return{
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    methods:{
        EditSmoothie(){
            if(this.smoothie.title){
                this.feedback = null
                // create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.#()'"!\-:@]/g,
                    lower: true
                })
                if(this.another){
                    this.smoothie.ingredients.push(this.another)
                    this.another= null
                }
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
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
                this.smoothie.ingredients.push(this.another)
                this.another= null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value as ingredient'
            }
        },
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient =>{
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>
<style>
.edit-smoothie{
    padding: 20px;
    max-width: 600px;
}
.edit-smoothie h3{
    font-size:2.5em;
}
.edit-smoothie .field{
    margin: 20px auto;
    position: relative;
}
.edit-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>