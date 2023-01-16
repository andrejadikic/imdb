import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Profile from "@/views/Profile";
import Movies from "@/views/Movies.vue";
import Movie from "@/views/Movie.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      authRequired: false
    },
    component: HomeView
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      authRequired: false
    },
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      authRequired: false
    },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      authRequired: false
    },
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      authRequired: true
    },
    component: Profile
  },
  {
    path: '/movies',
    name: 'Movies',
    meta: {
      authRequired: false
    },
    component: Movies
  },
  {
    path: '/movie',
    name: 'Movie',
    meta: {
      authRequired: false
    },
    component: Movie
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('token');
    if (jwt == null) {
      next('/login')
      return
    }
  }
  next()
})

export default router
