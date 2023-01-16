<template>
  <div>
    <b-row class="pt-5 justify-content-center">
      <b-col cols="6" class="text-center">
        <h1>Moj profil</h1>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <div>
        <b-tabs content-class="mt-5" align="center">
          <b-tab title="Info" align="center">
            <div v-if="!edit">
              <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                  <b-col md="6">
                    <b-card-img src="https://avatarfiles.alphacoders.com/120/120992.jpg" alt="Image" class="rounded-0"></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-header><h4>{{member.username}}</h4></b-card-header>
                    <b-card-body>
                      <h5>Email</h5>
                      {{member.email}}
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
              <b-button class="mt-4" variant="primary" @click="this.setEdit">Izmeni</b-button>
            </div>
            <div v-if="edit">
              <b-row class="pt-5 justify-content-center">
                <b-col cols="4">
                  <form @submit.prevent="editMember">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input v-model="name" type="text" class="form-control" id="name" aria-describedby="name" placeholder="New name">
                    </div>
                    <div class="form-group">
                      <label for="name">Email</label>
                      <input v-model="email" type="text" class="form-control" id="email" aria-describedby="email" placeholder="New email">
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input v-model="password" type="password" class="form-control" id="password" placeholder="New password">
                    </div>
                    <button type="submit" class="btn btn-primary mt-2" @submit="editMember">Izmeni</button>
                  </form>
                </b-col>
              </b-row>
              <b-button variant="primary" class="mt-4" @click="setEdit">Odustani</b-button>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </b-row>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
export default {
  name: "Profile",
  data() {
    return {
      edit: false,
      name: '',
      password: '',
      email: ''
    }
  },
  computed: {
    ...mapState(['member'])
  },
  methods: {
    ...mapActions(['edit_member', 'getProfile']),
    setEdit() {
      this.edit = !this.edit
    },
    editMember() {
      // e.preventDefault();
      if (this.name === '' || this.password === '' || this.email==='') {
        alert('Morate uneti sva polja!')
        return
      }
      this.edit_member({"username": this.name, "password": this.password, "email": this.email});
      this.getProfile();
      alert(`${member.email} is new mail`);
      this.edit=false;
    }
  }
}
</script>

<style scoped>

</style>