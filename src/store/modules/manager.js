import { token } from "../../common/helper";
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
const state = {
    managers: []
}
const getters = {
    is_managers : state => state.managers
}
const actions = {
    loadManagers({ commit }) {
        axios
            .get("http://localhost:4000/managers")
            .then(res => res.data)
            .then(managers => { commit('SET_MANAGERS', managers) });
    },
    delManagers({ commit }, id) {
        axios
            .delete(`http://localhost:4000/managers/${id}`, token)
            .then(() => { commit('DELETE_MANAGERS', id) });
    },
    addManagers({ commit }, data) {
        axios
            .post(`http://localhost:4000/managers`, data, token)
            .then(res => { commit('ADD_MANAGERS', res) });
    },
    updateManagers({ commit }, data) {
        const id = data.id
        axios
            .put(`http://localhost:4000/managers/${id}`, data.data, token)
            .then(res => { commit('UPDATE_MANAGERS', res) })
    },
}
const mutations = {
    SET_MANAGERS(state, managers) {
        state.managers = managers
    },
    DELETE_MANAGERS(state, id) {
        state.managers = state.managers.filter(item => item.username != id)
    },
    ADD_MANAGERS(state, data) {
        if (data.status === 201) {
            state.managers.push(data.data)
            console.log(state.managers)
        }
    },
    UPDATE_MANAGERS(state, data) {
        const id = data.config.url.split('').splice(31, 10).join('')
        const obj = data.data
        state.managers.forEach((element, index) => {
            if (element.username === id) {
                let object = {
                    username: element.username,
                    fullname: obj.fullname === '' ? element.fullname : obj.fullname,
                    is_login: obj.is_login === false ? false : true,
                    _id: element._id,
                    password: element.password
                }
                state.managers.splice(index, 1, object)
            }
        });

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}