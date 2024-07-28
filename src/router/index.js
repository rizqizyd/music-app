import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/Home.vue';
// import Manage from '@/views/Manage.vue';
// import Song from '@/views/Song.vue';
import store from '@/store';

// Dynamic Route Imports
// When the import function is called, it'll load the chunk for us.
// The home function will call the import function which will proceed to load the chunk file.
const Home = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const Manage = () => import('@/views/Manage.vue');
const Song = () => import('@/views/Song.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    component: About,
  },
  {
    name: 'manage',
    /*
      `alias`
      if the user visits either the Manege music or managed paths,
      the router will render the Manege component.
      This can be useful in case you don't want to perform a redirect.
    */
    // alias: '/manage',
    path: '/manage-music',
    meta: {
      requiresAuth: true,
    },
    component: Manage,
    // route specific guard
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
  },
  {
    // redirect from old path to the new path (prefered for SEO than alias)
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
  {
    // The regular expression will match any value.
    // The star character is used to cash a path that doesn't exist within the records.
    path: '/:catchAll(.*)*', // 404 page or redirect to home
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  console.log('Global Guard');
  // console.log(to.matched);
  // console.log(to, from); // global guard
  const baseTitle = 'Music App';
  document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle;

  // check if the current route requires authentication by using these some function.
  // If none of the records have the requires of property, we will let them proceed.
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  // If any of the records have the requires off property,
  // we will proceed to check if the user is authenticated.
  if (store.state.userLoggedIn) {
    next();
  } else {
    // If they aren't, we will redirect them to the home page.
    next({ name: 'home' });
  }
});

export default router;
