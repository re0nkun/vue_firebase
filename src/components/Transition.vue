<template>
  <div class="flex">

    <div class="trans">
      <button class="btn" @click="current=current==2?1:2">切り替える</button>
      <div id="box4" ref="box">
        <div ref="boxBody">

          <transition name="demo4" @after-enter="removeHeight">
            <div class="item4" v-if="current==1" key="1" style="height:100px;">item1</div>
            <div class="item4" v-if="current==2" key="2" style="height:50px;">item2</div>
          </transition>
        </div>
      </div>
    </div>

    <div class="trans">
      <button 
        class="btn" 
        @click="current1>1 ? current1=0:current1+=1">
          {{ current1+1 }}に切り替える
      </button>
      <transition name="demo3">
        <div class="box" v-if="current1==0" key="1">item1</div>
        <div class="box" v-if="current1==1" key="2">item2</div>
        <div class="box" v-if="current1==2" key="3">item3</div>
      </transition>
    </div>
    <div class="trans">
      <button class="btn" v-on:click="show2 = !show2">Switch_View</button>
      <transition name="demo2">
        <div class="box item2" v-show="show2">BOX2</div>
      </transition>
    </div>
    <div class="trans">
      <button class="btn" v-on:click="show1 = !show1">Switch_View</button>
      <transition appear name="demo1">
        <div class="box" v-if="show1">BOX1</div>
      </transition>
    </div>
  </div>
</template>

<script>
let height = ''
export default {
  data () {
    return {
      show1: true,
      show2: true,
      current1: 0,
      current: 1,
    }
  },
  watch: {
    current: {
      handler() {
        this.$nextTick(() => {
          // this.$refs.box.style.height = height + 'px'

          height = this.$refs.boxBody.getBoundingClientRect().height

          this.$refs.box.style.height = height + 'px'
        })
      },
      immediate: true
    }
  },
  methods: {
    removeHeight() {
      this.$refs.box.style.height = ''
    }
  }
}
</script>

<style>
.demo4-enter-active, .demo4-leave-active {
  transition: all 1s;
}
.demo4-enter, .demo4-leave-to {
  opacity: 0;
}
.demo4-leave-active {
  position: absolute;
}

#box4 {
  transition: height 1s;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid rgb(0, 200, 200);
  margin-top: 30px;
  padding: 10px;
  width: 200px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.item4 {
  /* margin: 0 auto; */
  background-color: #eee;
  border: solid 1px rgb(0, 200, 200);
  color: rgb(0, 200, 200);
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.demo3-enter-active, .demo3-leave-active {
  transition: all .5s;
}
.demo3-enter {
  opacity: 0;
  transform: translateX(-150px) scale(1.2);
}
.demo3-leave-to {
  opacity: 0;
  transform: translateX(150px) scale(0.8);
}
.demo3-leave-active {
  position: absolute;
}

.item2 {
  transition: color 2s;
}
.demo2-enter-active {
  color: transparent;
  transition: all 1s, color 0s;
} 
.demo2-leave-active {
  transition: all .5s;
}
.demo2-enter {
  opacity: 0;
  transform: translateX(-50px);
}
.demo2-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.demo1-leave-active, .demo1-enter-active {
  transition: opacity 1s;
}
.demo1-enter {
  opacity: 0;
}
.demo1-enter-to {
  opacity: 1;
}
.demo1-leave {
  opacity: 1;
}
.demo1-leave-to {
  opacity: 0;
}

.flex {
  display: flex;
}
.trans {
  margin: 50px;
  width: 180px;
}
.btn {
  margin-left: 40px;
  width: 120px;
  height: 40px;
  background: rgb(0, 200, 200);
  border: none;
  border-radius: 10px;
  color: #fff;
}
.box {
  background-color: #eee;
  border: solid 1px rgb(0, 200, 200);
  color: rgb(0, 200, 200);
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
</style>
