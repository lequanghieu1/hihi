import { token } from "../../common/helper";
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
const state = {
    eventcode: []
}
const getters = {
    is_eventcode: state => state.eventcode
}
const actions = {
    loadEventCode({ commit }) {
        axios
            .get("http://localhost:4000/event-code")
            .then(res => res.data)
            .then(eventcode => { commit('SET_EVENTCODE', eventcode) });
    },
    delEventCode({ commit }, id) {
        axios
            .delete(`http://localhost:4000/event-code/${id}`, token)
            .then(() => { commit('DELETE_EVENTCODE', id) })
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
    addEventCode({ commit }, data) {
        axios
            .post(`http://localhost:4000/event-code`, data, token)
            .then(res => { commit('ADD_EVENTCODE', res) });
    },
    updateEventCode({ commit }, data) {
        const id = data.id
        axios
            .put(`http://localhost:4000/event-code/${id}`, data.data, token)
            .then(res => { commit('UPDATE_EVENTCODE', res) })
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
    SET_EVENTCODE(state, eventcode) {
        state.eventcode = eventcode
    },
    DELETE_EVENTCODE(state, id) {
        state.eventcode = state.eventcode.filter(item => item.code != id)
    },
    ADD_EVENTCODE(state, data) {
        console.log(data)
        if (data.status === 201) {
            state.eventcode.push(data.data)
        }
    },
    UPDATE_EVENTCODE(state, data) {
        const id = data.config.url.split('').splice(33, 10).join('')
        const obj = data.data
        state.eventcode.forEach((element, index) => {
            if (element.code === id) {

                let object = {
                    code: element.code,
                    name: obj.name === '' ? element.name : obj.name,
                }
                state.eventcode.splice(index, 1, object)
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