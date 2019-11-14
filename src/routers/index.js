import Vue from 'vue'
import Router from 'vue-router'
import one from './one'
import two from './two'
import three from './three'

Vue.use(Router)

export default new Router({
  mode:'history',
  base:process.env.BASE_URL,
  routes:[
   one,
   two,
   three
  ]
})
