<!-- eslint-disable -->
<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="flex gap-2 items-center text-white font-bold uppercase text-2xl mr-4" 
      :to="{ name: 'home' }" exact-active-class="no-active">
        <img src="/assets/img/music-app.jpeg" alt="logo" class="h-12 w-[50px] object-cover">
        Music App
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" to="/about">
              {{ $t("navbar.about") }}
            </router-link>
          </li>
          <li>
            <a v-if="!userLoggedIn" class="px-2 text-white cursor-pointer" @click.prevent="toggleAuthModal">
              {{ $t("navbar.manage") }}
            </a>
            <router-link v-else class="px-2 text-white" :to="{name: 'manage'}">
              {{ $t("navbar.manage") }}
            </router-link>
            </li>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <!-- <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li> -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              {{ $t("navbar.login") }}
            </a>
          </li>
          <template v-else>
            <li>
              <a class="px-2 text-white" href="#"
                @click.prevent="signout">{{ $t("navbar.logout") }}</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<!-- eslint-disable -->
<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['userLoggedIn']),
    currentLocale() {
      return this.$i18n.locale === 'id' ? 'Indonesian' : 'English';
    }
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    // ...mapActions(['signout']),

    // We'll dispatch the action (manually) ourselves inside the methods object
    signout() {
      // dispatch the action, the store is injected into components in your app
      this.$store.dispatch('signout', {
        router: this.$router,
        route: this.$route,
      });

      // redirect in the component method
      // console.log(this.$route);
      // if (this.$route.meta.requiresAuth) {
      //   this.$router.push({ name: 'home' });
      // }
    },

    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'id' ? 'en' : 'id';
    }

    // toggleAuthModal() {
    //   this.$store.commit('toggleAuthModal');
    // },
  },
};
</script>
