import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store';
import Welcome from "../views/Welcome.vue";
import Hero from "../views/Hero.vue";
import Mountains from "../views/Mountains.vue";
import Mountain from "../views/Mountain.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      let checker = null;
      if (from.name == null) {
        checker = drupalSettings.heroConfig;
      } else {
        checker = Store.state.heroSelected;
      }

      if (checker) {
        return next({name: 'Mountains'});
      } else {
        return next();
      }
    }
  },
  {
    path: '/hero',
    name: 'Hero',
    component: Hero,
    meta: { requiresGuest: true },
    beforeEnter: (to, from, next) => {
      let checker = null;
      if (from.name == null) {
        checker = drupalSettings.heroConfig;
      } else {
        checker = Store.state.heroSelected;
      }

      if (checker) {
        return next({name: 'Mountains'});
      } else {
        return next();
      }
    }
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
    path: '*',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
