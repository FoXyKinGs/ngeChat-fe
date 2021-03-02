import axios from 'axios'

const moduleUsers = {
  namespaced: true,
  state: () => {
    return {
      data: [],
      dataReceiver: [],
      roomID: ''
    }
  },
  getters: {
    getDataUser (state) {
      return state.data
    },
    getRoomId (state) {
      return state.roomID
    },
    getDataReceiver (state) {
      return state.dataReceiver
    }
  },
  mutations: {
    setDetailUser (state, payload) {
      state.data = payload
    },
    setRoomId (state, payload) {
      state.roomID = payload
    },
    setDataReceiver (state, payload) {
      state.dataReceiver = payload
    }
  },
  actions: {
    detailUser (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/detailuser/${data}`).then((response) => {
          context.commit('setDetailUser', response.data[0])
          context.commit('setRoomId', response.data[0].room_id)
          resolve(response)
        }).catch((err) => {
          reject(err.response.data)
        })
      })
    },
    detailUserReceiver (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/detailuser/${data}`).then((response) => {
          context.commit('setDataReceiver', response.data[0])
          resolve(response)
        }).catch((err) => {
          reject(err.response.data)
        })
      })
    },
    changeProfile (context, { id, data }) {
      return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:4000/updateprofile/${id}`, data).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err.response.data)
        })
      })
    },
    changePhoto (context, { id, files }) {
      return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:4000/updateimage/${id}`, files).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err.response.data)
        })
      })
    }
  }
}

export default moduleUsers
