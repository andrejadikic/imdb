<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Library</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li  class="nav-item">
              <router-link :to="{name: 'Home'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">Home</router-link>
            </li>
            <li  class="nav-item">
              <router-link :to="{name: 'Movies'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Movies'}">Movies</router-link>
            </li>
            <b-nav-item-dropdown id="categoriesDropdown" text="Categories" toggle-class="nav-link-custom" right>
              
            </b-nav-item-dropdown>
            <li class="nav-item">
              <b-form-input v-model="searchText" placeholder="Search..."></b-form-input>
            </li>
            <li class="nav-item">
              <b-button variant="primary" class="ms-2" @click="search">Search</b-button>
            </li>
          </ul>
          
          <b-button v-if="!this.loggedIn" class="me-3" variant="outline-primary" @click="redirectToRegister()">Register</b-button>
          <b-button v-if="!this.loggedIn" variant="outline-success" @click="redirectToLogin()">Log in</b-button>
          <b-button v-if="this.member" variant="outline-success" @click="redirectToProfile()">{{member.name}}</b-button>
          <b-button v-if="this.loggedIn" class="ms-3" variant="outline-danger" @click="log_out()">Log out</b-button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "Navbar",
  computed: {
    ...mapState(['loggedIn', 'member'])
  },
  data() {
    return {
      searchText: '',
      categories: []
    }
  },
  methods: {
    ...mapActions(['search', 'login', 'logout']),
    log_out() {
      this.logout()
      this.$router.push({name: 'Home'})
    },
    redirectToLogin() {
      this.$router.push({name: 'Login'})
    },
    redirectToProfile() {
      this.$router.push({name: 'Profile'})
    },
    redirectToRegister() {
      this.$router.push({name: 'Register'})
    },
    redirectToMovies() {
      this.$router.push({name: 'Movies'})
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped>

</style>