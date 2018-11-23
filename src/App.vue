<template>
  <div id="app">
    <router-link to="/" exact>トラジションチャット</router-link>
    <router-link to="/transitionlist">トラジションリスト</router-link>
    <router-link to="/next" >ネクストチック</router-link>
    <router-link to="/tra" >トランジション</router-link>
    <router-link to="/chat" >チャットページ</router-link>
    <router-link to="/test" >テストページ</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import xxx from '@/components/xxx'
export default {
  name: 'App',
  // components: {'xxx': xxx},
}
</script>

<style>
.router-link-active {
  background: rgba(0, 0, 0, 0.1);
}
</style>