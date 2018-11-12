<template>
  <div>
    <button type="button" class="btn btn-default" @click="login">匿名ユーザでログイン</button>
    <button type="button" class="btn btn-default" @click="pushData">送信</button>
    <div>
      <ul>
        <li v-for="item in list" :key="item.id">{{item.name}} / {{item.message}} / {{item.id}}</li>
      </ul>
      <label>
        <p>
          名前<br>
          <input type="text" id="nameInput" v-model="name">
        </p>
      </label>
      <label>
        <p>
          メッセージ<br>
          <input type="text" id="nameInput" v-model="message">
        </p>
      </label>
      <button type="button" class="btn btn-default" @click="sendMessage">送信</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
export default {
  data () {
    return {
      list: [],
      name: '',
      message: ''
    }
  },
  created () {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        console.log('is login.')
        this.listen()
      } else {
        console.log('No user is signed in.')
      }
    })
    // firebase.database().ref('myBoard/').on('value', snapshot => {
    //   console.log(snapshot.val())
    // })
  },
  methods: {
    login() {
      firebase.auth().signInAnonymously().then(e => {
        console.log(e)
        this.listen()
      }).catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log('エラーメッセージ', errorCode, errorMessage)
      })
    },
    pushData () {
      firebase.database().ref('myBoard/').push({
        name: 'foo',
        message: 'bar'
      })
    },
    listen () {
      firebase.database().ref('myBoard/').on('value', v => {
        if (v) {
          const rootList = v.val()
          let list = []
          Object.keys(rootList).forEach( (val, key) => {
            rootList[val].id = val
            list.push(rootList[val])
          })
          this.list = list
        }
      })
    },
    sendMessage () {
      if (!this.name || !this.message) return
      firebase.database().ref('myBoard/').push({
        name: this.name,
        message: this.message
      })
      this.name = ''
      this.message = ''
    }
  }
}
</script>
