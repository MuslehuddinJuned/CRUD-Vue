<template>
  <div class="index container">
    <div class="row col-md-12">
      <div class="col-md-4  p-2" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card">
        <div class="card-content ">
          <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
          <h2 class="indigo-text">{{smoothie.title}}</h2>
          <ul class="ingredient">
            <li v-for="(ing, index) in smoothie.ingredients" :key="index">
              <span class="chip">{{ing}}</span>
            </li>
          </ul>

        </div>
        <span class="btn-floating btn-large halfway-fab green">
          <router-link :to="{name:'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
            <i class="material-icons edit">edit</i>
          </router-link>
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
      
    }
  },
  methods: {
    deleteSmoothie(id){
      //delete doc from firestore database
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        this.smoothies = this.smoothies.filter(smoothie =>{
        return smoothie.id != id
      })
      })
      
    }
  },

    created(){
      //fetch data from firestore
      db.collection('smoothies').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let smoothie = doc.data()
          smoothie.id = doc.id
          this.smoothies.push(smoothie)
        })
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredient{
  margin: 30px auto;
}

.index .ingredient li{
  display: inline-block;
}

.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

</style>
