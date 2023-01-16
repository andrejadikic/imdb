<template>
  <div id="app">
    <Header subtitle="Log In"/>

    <b-form @submit.prevent="log">
      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="form.username" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {
    name: 'Login',
    
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'login', 'getProfile'
      ]),

      log(){
        this.login(this.form);
        if(localStorage.token!=null){
          this.getProfile();
          this.$router.push({ name: 'Home' });
        }
      }
    }
  }
</script>

<style scoped>

</style>
