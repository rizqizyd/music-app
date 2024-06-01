import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';
import { Howl } from 'howler';
import helper from '../includes/helper';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong(state, payload) {
      if (state.sound instanceof Howl) {
        // unload function will pass the current audio,
        // it will also delete the instance and remove it from memory.
        state.sound.unload();
      }
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`;
    },
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
  },
  actions: {
    // The context {commit} will allow us to access the state and mutation's.
    // The second parameter is the payload that was passed in from the dispatch function call.
    async register({ commit }, payload) {
      // authentication
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email, payload.password,
      );

      // send the data usersCollection to the database
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      // commit a mutation to change the state
      commit('toggleAuth');
    },
    // Since we'll be making an asynchronous request to firebase,
    // the function should have the async keyword before it
    async login({ commit }, payload) {
      // send the request to Firebase with the payload data
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit('toggleAuth');
    },
    init_login({ commit }) {
      // retrieve the current authentication status from firebase
      const user = auth.currentUser;

      // check if they're logged in based on the value we retrieved
      if (user) {
        commit('toggleAuth');
      }
    },
    async signout({ commit }, payload) {
      // Firebase provides a method called Sign Out, which will sign the user out of the system
      await auth.signOut();

      commit('toggleAuth');

      // // redirect in the store actions
      if (payload.route.meta.requiresAuth) {
        payload.router.push({ name: 'home' });
      }
    },
    async newSong({ commit, state, dispatch }, payload) {
      commit('newSong', payload);

      // play music from action
      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }
      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit('updatePosition');

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      // Document = 2000, Timeline = 1000, Click 1000, Distance = 500
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);

      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
});
