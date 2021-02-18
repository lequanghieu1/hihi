import Vue from 'vue'
import Vuex from 'vuex'
import managers from './modules/manager'
import eventcode from './modules/eventcode'
import modeldevice from './modules/modeldevide'
import pageschema from './modules/pageschema'
import rolesaccess from './modules/rolesaccess'
Vue.use(Vuex)

const storeData = {
   modules: {
      managers,
      eventcode,
      modeldevice,
      pageschema,
      rolesaccess
   },

}
const store = new Vuex.Store(storeData)

export default store