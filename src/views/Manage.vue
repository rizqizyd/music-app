<!-- eslint-disable -->
<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <!-- Upload Component -->
        <app-upload ref="upload" :addSong="addSong"/>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my_songs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item v-for="(song, i) in songs" :key="song.docID" 
              :song="song" 
              :updateSong="updateSong" 
              :index="i" 
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<!-- eslint-disable -->
<script>
// import store from '@/store';
import AppUpload from '@/components/Upload.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { songsCollection, auth } from '@/includes/firebase'

export default {
  name: 'manage',
  components: {
    AppUpload, CompositionItem
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    }
  },
  async created() {
    // request data from database
    // this function will generate a query instructing Firebase to search through the documents in these songs collection
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        // the spread operator will merge the properties with the song variable
        ...document.data(),
        docID: document.id
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      next(leave);
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // }
  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouteEnter Guard')
  //   // check if the user is logged in
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },
};
</script>