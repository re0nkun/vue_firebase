<template>
  <div id="list">
    <div class="buttons">
      <button @click="current=1">1の倍数</button>
      <button @click="current=2">2の倍数</button>
      <button @click="current=5">5の倍数</button>
      <button @click="current=8">8の倍数</button>
      <button @click="order=order*-1">
        {{order>0 ? '▲' : '▼'}}
      </button>
      <button @click="add">add</button>
    </div>
    <div id="box">
      <transition-group name="demo" tag="ul" class="list">
        <li class="item" 
            v-for="(item, idx) in filteredList" 
            :key="item.id"
            @click="remove(item.id)">
              item {{item.id}}
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 1,
      order: -1,
      list: [],
      lastId: 3
    }
  },
  created () {
    for (let i = 0; i < this.lastId; i++) {
      this.list.push({ id: i+1 })
    }
  },
  computed: {
    filteredList() {
      const result = this.list.filter(v => {
        return v.id % this.current === 0
      })
      result.sort((a, b) => {
        return (a.id === b.id ? 0 : (a.id > b.id ? -1 : 1) * this.order)
      })
      return result
    }
  },
  methods: {
    add () {
      this.lastId += 1
      this.list.push({ id: this.lastId})
    },
    remove (id) {
      this.list = this.list.filter(v => v.id !== id)
    }
  },
}
</script>

<style>
.demo-enter-active, .demo-leave-active {
  transition: transform .5s, opacity .5s;
}
.demo-enter {
  opacity: 0;
  transform: translateY(-20px)
}
.demo-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.demo-move:not(.demo-leave-active) {
  transition: transform .5s;
}
.demo-leave-active {
  position: absolute;
}

#list {
  width: 400px;
  margin: 30px auto;
}
.buttons {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
}
.buttons>button {
  background: #00bcd4;
  color: #fff;
  border: none;
  border-radius: 2px;
  padding: 4px 10px;
  line-height: 20px;
}
.item { 
  list-style-type: none;
  background: #f5f5f5;
  border: 1px solid #eee; 
  width: 385px;

  padding: 5px;
  margin: 5px 5px 5px -40px;
  display: inline-flex;
  /* vertical-align: top; */
  /* align-items: center; */
  justify-content: center;
}
</style>
