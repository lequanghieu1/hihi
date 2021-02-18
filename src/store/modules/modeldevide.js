import { token } from "../../common/helper";
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
const state = {
    modeldevice: []
}
const getters = {
    is_modeldevice: state => state.modeldevice
}
const actions = {
    loadModelDevice({ commit }) {
        axios
            .get("http://localhost:4000/model-device")
            .then(res => res.data)
            .then(modeldevice => { commit('SET_MODELDEVICE', modeldevice) });
    },
    delModelDevice({ commit }, id) {
        axios
            .delete(`http://localhost:4000/model-device/${id}`, token)
            .then(() => { commit('DELETE_MODELDEVICE', id) })
            .catch(e => {
                if (
                    e
                        .toString()
                        .startsWith("Error: Request failed with status code 403")
                ) {
                    alert("permission deni");
                }
            });
    },
    addModelDevice({ commit }, data) {
        axios
            .post(`http://localhost:4000/model-device`, data, token)
            .then(res => { commit('ADD_MODELDEVICE', res) });
    },
    updateModelDevice({ commit }, data) {
        const id = data.id
        axios
            .put(`http://localhost:4000/model-device/${id}`, data.data, token)
            .then(res => { commit('UPDATE_MODELDEVICE', res) })
            .catch(e => {
                if (
                    e
                        .toString()
                        .startsWith("Error: Request failed with status code 403")
                ) {
                    alert("permission deni");
                }
            });
    },
}
const mutations = {
    SET_MODELDEVICE(state, modeldevice) {
        state.modeldevice = modeldevice
    },
    DELETE_MODELDEVICE(state, id) {
        state.modeldevice = state.modeldevice.filter(item => item.name != id)
    },
    ADD_MODELDEVICE(state, data) {
        console.log(data)
        if (data.status === 201) {
            state.modeldevice.push(data.data)
        }
    },
    UPDATE_MODELDEVICE(state, data) {
        const id = data.config.url.split('').splice(35, 10).join('')
        const obj = data.data
        state.modeldevice.forEach((element, index) => {
            if (element.name === id) {

                let object = {
                    code: obj.code === '' ? element.code : obj.code,
                    name: obj.name === '' ? element.name : obj.name,
                }
                state.modeldevice.splice(index, 1, object)
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