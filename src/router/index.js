import Vue from 'vue'
import Router from 'vue-router'
import Serving from '@/components/Serving'
import SelectTable from '@/components/SelectTable'
import OrderDishes from '@/components/OrderDishes'
import Bill from '@/components/Bill'
import Login from '@/components/Login'
import Manage from '@/components/Manage'
import Checkout from '@/components/Checkout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/manage',
      component: Manage,
      
      children: [
        {
          path: '',
          name: 'checkout', 
          component: Checkout
        }
      ]
    },
    {
      path: '/table',
      name: 'Table',
      component: SelectTable,
      //meta: {requiresAuth:true}
    },
    {
      path: '/',
      name: 'Order',
      component: OrderDishes,
    },
    {
      path: '/bill',
      name: 'bill',
      component: Bill
    }, 
    {
      path: '/serving',
      name: 'Serving',
      component: Serving,
      
    }
  ]
})

