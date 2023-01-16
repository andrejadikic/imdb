<template>
<div v-on:click="singlePage()"  class="entity">
  <div class="entity-image" :style = "{ 'background': 'url(' + movie.imageUrl +')',
                                       'background-size': '100%',
                                       'grid-area': 'image',
                                       'border-top-left-radius': '15px',
                                       'border-top-right-radius': '15px',
                                       'background-repeat': 'no-repeat'}"></div>
  <div class="entity-text">
    <h2>{{movie.title}}</h2>
    <p>{{movie.description}}</p>
    </div>
  <div class="entity-stats">
    <div class="stat">
      <div class="value">{{movie.genre.name}}</div>
      <div class="type">Genre</div>
    </div>
    <div class="stat border">
      <div class="value">{{movie.rating}}</div>
      <div class="type">Rating</div>
    </div>
  </div>
</div>
</template>

<script>

import {mapActions} from 'vuex'
export default {
  name: 'Movie',
  props: ['movie'],
  methods: {
    ...mapActions(['setMovie', 'getReviews']),
    singlePage(){
      this.setMovie(this.movie);
      if(localStorage.movie!=null){
        console.log(localStorage.movie);
        this.getReviews();
        this.$router.push('/movie');
      }
        
    }
  }
}

</script>

<style>

.entity {
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 440px 200px 80px;
  grid-template-areas: 'image' 'text' 'stats';
  transition: 0.5s ease;
  cursor: pointer;

  font-family: roboto;
  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 5px rgba(0, 0 , 0, 9);
  text-align: center;
}


.entity-text {
  grid-area: text;
  margin: 25px;
}

.entity-stats {
  grid-area: stats;
  display: grid;
  grid-template-columns:  1fr 1fr 1fr;
  grid-template-rows:  1fr;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: rgb(255,7,110);
}

.entity-stats .stat {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  color: white;
}

.entity-stats .type {
  font-size: 11px;
  font-weight: 300;
  text-transform: uppercase;
}

.entity-stats .value {
  font-size: 22px;
  font-weight: 500;
}

.entity-stats .border {
  border-left: 1px solid rgb(172, 26, 87);
  border-right: 1px solid rgb(172, 26, 87);
}

.entity:hover {
  transform: scale(1.2);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
}

</style>


