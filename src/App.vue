<template>
  <div id="app">
    <router-link to="/" exact>トップページ</router-link>
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