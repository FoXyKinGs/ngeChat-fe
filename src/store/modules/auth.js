import axios from 'axios'

const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null
    }
  },
  getters: {
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/login', data).then((response) => {
          localStorage.setItem('id', response.data[0].id)
          localStorage.setItem('token', response.data[1])
          localStorage.setItem('room', response.data[0].room_id)
          context.commit('setToken', response.data[1])
          resolve(response)
        }).catch((err) => {
          reject(err.response.data)
        })
      })
    },
    logout (context) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        context.commit('setToken', null)
        localStorage.removeItem('id')
        localStorage.removeItem('room')
        resolve(true)
      })
    }
  }
}

export default moduleAuth
