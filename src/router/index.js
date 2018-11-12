import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: {
        template: '<div>This is TopPage</div>'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]
})
