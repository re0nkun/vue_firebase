import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import ChatHeader from '@/components/ChatHeader'
import ChatMain from '@/components/ChatMain'
import Transition from '@/components/Transition'
import NextTick from '@/components/NextTick'
import TransitionList from '@/components/TransitionList'
import TransitionChat from '@/components/TransitionChat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TransitionChat',
      component: TransitionChat
    },
    {
      path: '/transitionlist',
      name: 'TransitionList',
      component: TransitionList
    },
    {
      path: '/next',
      name: 'NextTick',
      component: NextTick
    },
    {
      path: '/tra',
      name: 'Transition',
      component: Transition
    },
    {
      path: '/chat',
      // name: 'ChatHeader',
      component: ChatHeader,
      children: [
        {
          path: '',
          name: 'ChatMain',
          component: ChatMain,
        }
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]
})
