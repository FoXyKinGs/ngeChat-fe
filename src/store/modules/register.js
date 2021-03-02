import axios from 'axios'

const moduleRegister = {
  namespaced: true,
  state: () => {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    registerAccount (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.setURL}/register`, data).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err.response.data)
        })
      })
    }
  }
}

export default moduleRegister
