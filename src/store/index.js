import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        roles: []
    },
    getters: {
        roles: state => {
            return state.roles
        }
    },
    mutations: {
        addRoutes() {

        }
    },
    actions: {
        getInfos() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let a = 1;
                    if(a) {
                        resolve('111')
                    }else{
                        reject(1);
                    }
                }, 1000)
            })
        },

        getMenus() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let a = 1;
                    if(a) {
                        resolve([{path: '/users', icon: '', name: ''}])
                    }else{
                        reject(2);
                    }
                }, 1000)
            })
        },

        fedLogOut() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let a = 1;
                    if(a) {
                        resolve('333')
                    }else{
                        reject(3);
                    }
                }, 1000)
            })
        }
    }
})
