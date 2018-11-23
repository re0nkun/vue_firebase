<template>
  <div>
    <div>
      <p><button @click="focus1">focus1</button></p>
      <p><button @click="focus2">focus2</button></p>
      <p><input type="text" v-if="s" ref="input"></p>
    </div>
    <div>
      <button @click="list.push(list.length+1)">追加</button>
      <ul ref="list">
        <li v-for="item in list" :key="item.id">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      s: false,
      list: []
    }
  },
  methods: {
    focus1() {
      this.s = true
      this.$nextTick(()=>{
        this.$refs.input.focus()
      })
    },
    focus2() {
      this.s = true
        this.$refs.input.focus()
    },
  },
  watch: {
    list: function () {
      console.log('通常:', this.$refs.list.offsetHeight)
      this.$nextTick(() => {
        console.log('nextTick:', this.$refs.list.offsetHeight)
      })
    }
  }
}
</script>
