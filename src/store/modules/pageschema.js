import { token } from "../../common/helper";
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
const state = {
    pageschema: []
}
const getters = {
    is_pageschema: state => state.pageschema
}
const actions = {
    loadPageSchema({ commit }) {
        axios
            .get("http://localhost:4000/page-schema")
            .then(res => res.data)
            .then(pageschema => { commit('SET_PAGESCHEMA', pageschema) });
    },
    delPageSchema({ commit }, id) {
        axios
            .delete(`http://localhost:4000/page-schema/${id}`, token)
            .then(() => { commit('DELETE_PAGESCHEMA', id) })
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
    addPageSchema({ commit }, data) {
        axios
            .post(`http://localhost:4000/page-schema`, data, token)
            .then(res => { commit('ADD_PAGESCHEMA', res) });
    },
    updatePageSchema({ commit }, data) {
        const id = data.id
        axios
            .put(`http://localhost:4000/page-schema/${id}`, data.data, token)
            .then(res => { commit('UPDATE_PAGESCHEMA', res) })
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
    SET_PAGESCHEMA(state, pageschema) {
        state.pageschema = pageschema
    },
    DELETE_PAGESCHEMA(state, id) {
        state.pageschema = state.pageschema.filter(item => item.key != id)
    },
    ADD_PAGESCHEMA(state, data) {
        console.log(data)
        if (data.status === 201) {
            state.pageschema.push(data.data)
        }
    },
    UPDATE_PAGESCHEMA(state, data) {
        const id = data.config.url.split('').splice(34, 10).join('')
        const obj = data.data
        state.pageschema.forEach((element, index) => {
            if (element.key === id) {

                let object = {
                    page: obj.page === '' ? element.page : obj.page,
                    key: obj.key === '' ? element.key : obj.key,
                    label: obj.label === '' ? element.label : obj.label,
                    sortable: obj.sortable === '' ? element.sortable : obj.sortable,
                    selected: obj.selected === '' ? element.selected : obj.selected,
                }
                state.pageschema.splice(index, 1, object)
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