<template>
  <div>
    <button @click="addItem">追加</button>
    <button @click="removeItem">削除</button>
    <button @click="order=order*-1">並び替え</button>
    <transition-group name="items" tag="ul">
      <li v-for="item in sortedItems" :key="item.id">
        {{item.name}}
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 4,
      order: 1,
      items: [
        { id: 1, name: 'item 1'},
        { id: 2, name: 'item 2'},
        { id: 3, name: 'item 3'},
        { id: 4, name: 'item 4'}
      ]
    }
  },
  methods: {
    addItem () {
      this.count += 1
      this.items.push({ id: this.count, name: 'item '+ this.count})
    },
    removeItem () {
      this.count -= 1
      this.items.splice(this.count, 1)
    }
  },
  computed: {
    sortedItems () {
      const order = this.order
      return this.items.sort((a,b) => {
        a = a.id
        b = b.id
        return (a===b ? 0 : a>b ? 1 : -1) * order
      })
    }
  }
}
</script>

<style>
.items-leave-active, .items-enter-active {
  transition: opacity .5s, transform .5s ease;
}
.items-leave-to, .items-enter {
  opacity: 0;
  transform: translateX(50px);
}
.items-leave, .items-enter-to {
  opacity: 1;
}
.items-move {
  transition: transform .5s;
}
</style>
