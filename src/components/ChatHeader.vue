<template>
  <div>
    <header class="header">
      <div class="inner">
        <template v-if="isSignedIn && userName && userPic">
          <div class="user-image"><img :src="userPic"></div>
          <p class="user-name">{{userName}}</p>
        </template>
        <button class="auth-button" @click="authFunction">
          {{authButtonText}}
        </button>
      </div>
    </header>

    <router-view
      :isSignedIn="isSignedIn"
      :userName="userName"
      :userPic="userPic">
    </router-view>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'ChatHeader',
  data () {
    return {
      userName: null,
      userPic: null,
      isSignedIn: null,
      authButtonText: null,
      authFunction: function () {}
    }
  },
  created () {
    this.onAuthStateChanged()
  },
  methods: {
    onAuthStateChanged () {
      firebase.auth().onAuthStateChanged( user => {
        this.userName = user ? this.getUserName() : null
        this.userPic = user ? this.getProfilePicUrl() : null
        this.authButtonText = user ? 'SignOut' : 'SignIn'
        this.isSignedIn = user ? true: false
        this.authFunction = user ? this.signOut : this.signIn
      })
    },
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    signOut () {
      firebase.auth().signOut()
    },
    getProfilePicUrl () {
      return firebase.auth().currentUser.photoURL || 'https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png'
    },
    getUserName () {
      return firebase.auth().currentUser.displayName
    }
  },
}
</script>

<style scoped>
  body {
    background-color: #ECEFF1;
  }
  .header {
    background-color: #009CE5;
  }
  .inner {
    width: 90%;
    height: 70px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .user-image {
    position: relative;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
  }
  .user-image > img {
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .user-name {
    margin: 0 15px;
    color: #fff;
  }
  .auth-button {
    background: #FFF;
    border: none;
    border-radius: 50px;
    padding: 5px 10px;
    color: #009CE5;
  }
</style>
