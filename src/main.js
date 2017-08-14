import Vue from 'vue'
import App from './App'
import VueResource from'Vue-resource'
import router from './router'
import "../static/css/reset.css"
import "../static/css/font-awesome-4.7.0/css/font-awesome.min.css"
import "../static/css/animate.css"

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Vue.http.post("http://localhost/zxin/manage/check",{credentials: true})
      .then((responce) => {
          if(responce.body.flag==1){
            next();
          }else{
            next('/login')
          }
      });
  }else{
    next();
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
