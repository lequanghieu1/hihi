import { token } from "../../common/helper";
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
const state = {
    rolesaccess: []
}
const getters = {
    is_rolesaccess: state => state.rolesaccess
}
const actions = {
    loadRolesAccess({ commit }) {
        axios
            .get("http://localhost:4000/roles-access")
            .then(res => res.data)
            .then(rolesaccess => { commit('SET_ROLESACCESS', rolesaccess) });
    },
    delRolesAccess({ commit }, id) {
        axios
            .delete(`http://localhost:4000/roles-access/${id}`, token)
            .then(() => { commit('DELETE_ROLESACCESS', id) })
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
    addRolesAccess({ commit }, data) {
        axios
            .post(`http://localhost:4000/roles-access`, data, token)
            .then(res => { commit('ADD_ROLESACCESS', res) })
            .catch(e => {
                if (
                    e
                        .toString()
                        .startsWith("Error: Request failed with status code 409")
                ) {
                    alert("id_extra not match");
                }
                if (
                    e
                        .toString()
                        .startsWith("Error: Request failed with status code 408")
                ) {
                    alert("id_extra is exist");
                }
            });
    },
    updateRolesAccess({ commit }, data) {
        const id = data.id
        axios
            .put(`http://localhost:4000/roles-access/${id}`, data.data, token)
            .then(res => { commit('UPDATE_ROLESACCESS', res) })
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
    SET_ROLESACCESS(state, rolesaccess) {
        state.rolesaccess = rolesaccess
    },
    DELETE_ROLESACCESS(state, id) {
        state.rolesaccess = state.rolesaccess.filter(item => item.id_extra != id)
    },
    ADD_ROLESACCESS(state, data) {
        console.log(data)
        if (data.status === 201) {
            state.rolesaccess.push(data.data)
        }
    },
    UPDATE_ROLESACCESS(state, data) {
        const id = data.config.url.split('').splice(34, 10).join('')
        const obj = JSON.parse(data.data)
        console.log(data)
        state.rolesaccess.forEach((element, index) => {
            if (element.id_extra === id) {
                let object = {
                    id_extra: element.id_extra,
                    add: obj.add === "" ? element.add : obj.add,
                    read: obj.read === "" ? element.read : obj.read,
                    update: obj.update === "" ? element.update : obj.update,
                    delete: obj.delete === "" ? element.delete : obj.del,
                    name_model: obj.name_model === '' ? element.name_model : obj.name_model,
                }
                state.rolesaccess.splice(index, 1, object)
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