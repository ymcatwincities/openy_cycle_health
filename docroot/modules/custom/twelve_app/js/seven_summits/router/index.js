import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store';
import Welcome from "../views/Welcome.vue";
import Hero from "../views/Hero.vue";
import Mountains from "../views/Mountains.vue";
import Mountain from "../views/Mountain.vue";
import Game from "../views/Game.vue";
import MountainInfo from "../views/MountainInfo.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: { requiresAuth: true },
  },
  {
    path: '/hero',
    name: 'Hero',
    component: Hero,
    meta: { requiresGuest: true },
  },
  {
    path: '/mountains',
    name: 'Mountains',
    component: Mountains,
    meta: { requiresAuth: true },
  },
  {
    path: '/mountain/:id',
    name: 'Mountain',
    component: Mountain,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: Game,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/mountain-info/:id',
    name: 'MountainInfo',
    component: MountainInfo,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // if (to.meta.requiresAuth && !Store.getters.isLoggedIn) {
  //   return next({ name: 'Login' });
  // }
  // if (to.meta.requiresGuest && Store.getters.isLoggedIn) {
  //   return next({ name: 'Home' });
  // }
  return next();
});

export default router;
