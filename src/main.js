import firebase from 'firebase/app'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAmrC--F7gHLY_38yjMBJ6RVmHyQneQIns",
  authDomain: "fire-vue-cbd97.firebaseapp.com",
  databaseURL: "https://fire-vue-cbd97.firebaseio.com",
  projectId: "fire-vue-cbd97",
  storageBucket: "fire-vue-cbd97.appspot.com",
  messagingSenderId: "624329211520"
};
firebase.initializeApp(config);

/* eslint-disable no-new */

// Vue.component('app', App)

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  // render: h => h(App),
  // components: {'app': App},
  // template: '<App/>'
})
