import Vue from 'vue'
import Vuex from 'vuex'

const rootPath = 'http://localhost:4000';
const authPath = 'http://localhost:2000/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: null,
    loggedIn: false,
    token: '',
    movies: [],
    reviews: [],
    myReviews: [],
    celebrities: [],
    movie: null
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setMovie(state, movie) {
      state.movie = movie;
      localStorage.movie = movie.id;
    },

    set_reviews(state, reviews) {
      state.reviews = reviews;
    },

    addReview(state, review){
      state.reviews.push(review);
    },

    set_myReviews(state, myReviews) {
      state.myReviews = myReviews;
    },

    set_celebrities(state, celebrities) {
      state.celebrities = celebrities;
    },

    login(state, member) {
      state.member = member;
      state.loggedIn = true;
    },

    setToken(state, token){
      state.token = token;
      localStorage.token = token;
    },

    update_member(state, member) {
      state.member = member;
    },

    log_out(state) {
      state.member = null;
      state.loggedIn = false;
      token = ''
      localStorage.token=null;
    },

    add_Review(state, review) {
      state.myReviews.push(review);
    },
  },
  actions: {
    
    register({ commit }, obj) {
      fetch(`${authPath}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.msg) {
            alert(tkn.msg);
          } else {
            commit('setToken', tkn);
          }
        });
    },

    login({ commit }, obj) {
      fetch(`${authPath}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.msg) {
            alert(tkn.msg);
          } else {
            commit('setToken', tkn);
          }
        });
    },

    getProfile({ commit }){
      fetch(`${rootPath}/users/getProfile`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': localStorage.token
        }
      }).then(res1 =>
        res1.json()).then(user => {
          commit('login', user);
        });
    },

    logout({commit}) {
      commit('log_out')
    },

    edit_member({commit}, member) {
      let body = member
      // const jwt = localStorage.getItem('jwt')
      // const bearer = `Bearer ${jwt}`
      fetch(`${rootPath}/users/updateProfile`, {
        method: 'put',
        headers: {
          'Authorization': localStorage.token,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      }).then(tkn => {
        commit('setToken', tkn);
        alert('Profil je uspesno azuriran.');
      }).catch(err => {
        if (typeof err.text === 'function')
          err.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(err);
      })
    },
    
    getMovies({commit}){
      fetch(`${rootPath}/movies/get`, {
        method: 'GET'
      }).then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      }).then(movies=>{
          commit('setMovies', movies);
      }).catch(err => {
        if (typeof err.text === 'function')
          err.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(err);
      })
    },

    getReviews({commit}){
      fetch(`${rootPath}/reviews/${localStorage.movie}`, {
        method: 'GET'
      }).then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      }).then(movies=>{
          commit('set_reviews', movies);
      }).catch(err => {
        if (typeof err.text === 'function')
          err.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(err);
      })
    },

    setMovie({commit},movie){
      commit('setMovie', movie);
    },

    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      console.log(comment);
      commit('addReview', comment);
    }

  },
  modules: {
  }
})
