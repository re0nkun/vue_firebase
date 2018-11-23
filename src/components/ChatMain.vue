<template>
  <main>
    <div class="chat-area">
      <div class="conversation">
        <ul class="inner">
          <li v-for="list in messageList" :key=list.id>
            <div class="user-image">
              <img :src="list.profilePicUrl">
            </div>
            <div class="col">
              <p class="user-name">{{list.name}}</p>
              <p class="user-text">{{list.text}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="post">
        <input type="text" v-model="message">
        <button type="button" @click="postMessage">SEND</button>
        <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
      </div>
    </div>
  </main>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
export default {
  name: 'ChatMain',
  props: ['isSignedIn', 'userName', 'userPic'],
  data () {
    return {
      message: null,
      errorMessage: null,
      messageList: []
    }
  },
  created () {
    this.loadMessages()
  },
  methods: {
    postMessage () {
      let that = this
      if (!this.isSignedIn || !this.message) return

      firebase.database().ref('/messages/').push({
        name: this.userName,
        text: this.message,
        profilePicUrl: this.userPic
      })
      .then( data => {
        this.errorMessage = null
        this.message = null
      })
      .catch( error => {
        this.errorMessage = '正しく入力してください'
        this.message = null
      })
    },
    loadMessages () {
      firebase.database().ref('/messages/').on('value', (snapshot) => {
        if (snapshot) {
          let rootList = snapshot.val()
          let messageList = []
          Object.keys(rootList).forEach((val, key) => {
            rootList[val].id = val
            messageList.push(rootList[val])
          })
          this.messageList = messageList
        }
      })
    }
  }
}
</script>

<style scoped>
  .chat-area {
    background-color: #eee;
    border-radius: 50px;
    max-width: 500px; 
    width: 90%;
    padding: 25px 35px;
    margin: 20px 5% 0;
      box-sizing: border-box;
  }
  .conversation {
    width: 100%;
    margin-bottom: 10px;
    overflow: auto;
    display: grid;
      grid-template-rows: 1fr;
      height: calc(100vh - 200px);
  }
  .inner {
    padding: 0;
    margin: 0;
    width: 100%;
      grid-row-start: 2;
  }
  .inner>li {
    list-style-type: none;
  }
  .inner>li:nth-child(n+2) {
    margin-top: 20px;
  }
  .user-image {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    float: left;
  }
  .user-image>img {
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
      transform: translateX(-50%) translateY(-50%)
  }
  .col {
    margin-left: 50px;
  }
  .user-name {
    margin: 0 0 5px;
    color: #878787;
  }

  .post {
    width: 100%;
    display: flex;
      align-items: center;
    position: relative;
  }
  .post>input {
    width: 80%;
    height: 35px;
  }
  .post>button {
    width: 20%;
    height: 35px;
    background-color: #fff;
    border: 1px solid #878787;
    color: #878787
  }
  .error-message {
    color: #f00;
    font-size: .8em;
    margin: 5px 0 0;
    position: absolute;
    left: 0;
    bottom: 0;
      transform: translateY(100%);
  }
</style>
