import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import VueSidebarMenu from 'vue-sidebar-menu';
// import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app');
