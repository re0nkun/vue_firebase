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
      <transition-group name="demo" tag="ul" class="list" appear
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @enter-cancelled="afterEnter"
      >
        <li class="item" 
            v-for="(item, idx) in filteredList" 
            :key="item.id"
            @click="remove(item.id)"
            :data-index="idx">
          <span>item {{item.id}}</span>
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
      lastId: 5,
      addEnter: false
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
      this.addEnter = true
      this.lastId += 1
      this.list.push({ id: this.lastId})
    },
    remove (id) {
      this.list = this.list.filter(v => v.id !== id)
    },

    beforeEnter(el) {
      this.$nextTick(()=>{
        if (!this.addEnter) {
          el.style.transitionDelay = 100 * el.dataset.index + 'ms'
        } else {
          this.addEnter = false
        }
      })
    },
    afterEnter(el) {
      el.style.transitionDelay = ''
    }
  },
}
</script>

<style>
.demo-enter-active, .demo-leave-active {
  transition: transform .5s, opacity .5s;
}
.demo-move:not(.demo-leave-active) {
  transition: transform .5s;
}
.demo-enter {
  opacity: 0;
}
.demo-leave-to {
  opacity: 0;
}
.demo-leave-active {
  position: absolute;
}

#list {
  width: 460px;
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
  border-radius: 5px;
  padding: 4px 10px;
  line-height: 20px;
}
.list {
  margin-left: -40px;
  width: 100%;
  /* display: inline-flex;
  flex-wrap: wrap; */
}
.item { 
  background: #f5f5f5;
  border: 1px solid #eee; 
  border-radius: 30%;
  width: 70px;
  height: 70px;
  margin: 10px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
