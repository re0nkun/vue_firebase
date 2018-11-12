import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]
})
