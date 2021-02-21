<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-4 chat-party">
          <div class="container-fluid">
            <div class="header">
              <div class="title">
                <h3>ngeChat</h3>
              </div>
              <div class="hamburger-menu" @click="openLogout()">
                <div class="menu btn">
                  <div class="first-line"></div>
                  <div class="second-line"></div>
                  <div class="third-line"></div>
                <div class="setting" v-if="logout === true">
                <button @click="clickLogout()">Logout</button>
                </div>
                </div>
              </div>
            </div>
            <div class="main-profile" v-if="profile === false">
              <div class="profile-photo">
                <div v-if="getDataUser.length < 1">
                  wait...
                </div>
                <div v-else>
                  <img :src="serverUrl + '/image/' + getDataUser.image" @click="openProfile()">
                </div>
              </div>
              <div class="profile-information">
                <div>
                <div class="name">
                  <p>{{getDataUser.username}}</p>
                </div>
                <div class="email">
                  <p>{{getDataUser.email}}</p>
                </div>
                </div>
              </div>
              <div class="party-room-chat">
                <div class="header">
                  <b-icon class="search btn" icon="search" font-scale="1.5" style="color: #8A8A8A" />
                  <input type="text" placeholder="Type your message...">
                  <div class="plus btn"><b-icon icon="plus" font-scale="3" style="color: #7E98DF"/></div>
                </div>
                <div class="chatting-party">
                  <div v-for="(item, index) in users" :key="index" @click="getChat(item.id, item.username, item.image)"
                  class="party-room"  onclick="document.getElementById('change').click();"><a href="#chat-room" id="change" hidden/>
                    <img :src="serverUrl + '/image/' + item.image">
                    <p class="name">{{item.username}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-md-8 m-0 p-0 chat-room" id="chat-room">
          <div class="empty-chat" v-if="to === ''">
            <h5>Please select a chat to start messaging</h5>
          </div>
          <div class="chat" v-else>
            <div class="receiver-info">
              <div class="profile-photo">
                <img :src="serverUrl +'/image/' + to_image" @click="openProfileReceiver();actionGetReceiver(to_id)">
              </div>
              <div class="username">
              {{to}}
              </div>
            </div>
            <div class="chat-content" id="chat-content">
            <div v-for="(item, index) in chat" :key="index" class="display-chat">
              <div v-if="item.from_id == getDataUser.id">
                <div class="self-box text-right">
                    <img :src="serverUrl + '/image/' + getDataUser.image">
                <div>
                  {{item.message}}
                </div>
                <div><small>{{item.created_at}}</small></div>
                </div>
              </div>
              <div v-else>
                <div class="other">
                  <img :src="serverUrl + '/image/' + to_image">
                <div>
                  {{item.message}}
                </div>
                <div><small>{{item.created_at}}</small></div>
                </div>
              </div>
            </div>
            </div>
            <div class="chat-tools">
              <form action="" @submit.prevent="sendMessage()">
                <input type="text" placeholder="Type your message..." v-model="text">
                <button><b-icon class="icon" font-scale="2" icon="arrow-right"/></button>
              </form>
            </div>
            <div class="detail-receiver" v-if="profileReceiver === true">
              <div class="header">
              <b-icon class="icon" icon="x" font-scale="1.5" @click="openProfileReceiver()"/>
              </div>
              <div class="image">
                <img :src="serverUrl + '/image/' + getDataReceiver.image">
              </div>
              <div class="profile">
              <hr>
              <div class="username">
              <p>Username</p>
              <p>{{getDataReceiver.username}}</p>
              </div>
              <hr>
              <hr>
              <div class="email">
              <p>Email</p>
              <p>{{getDataReceiver.email}}</p>
              </div>
              <hr>
              </div>
              <hr>
            <div class="map">
              <p>Location</p>
              <GoogleMapMaps :center="{ lat: -6.89846733562317, lng: 107.60501039761238 }" :zoom="12" class="location">
                <GoogleMapMarker :position="{ lat: -6.89846733562317, lng: 107.60501039761238 }" :draggable="false"/>
              </GoogleMapMaps>
            </div>
            <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-profile" v-if="profile === true">
      <div class="header">
        <b-icon class="icon" icon="chevron-left" font-scale="1.5" @click="openProfile()"/>
      </div>
      <div class="edit-image">
        <img :src="serverUrl + '/image/' + getDataUser.image">
        <input @input="setImage" id="fileImage" type="file" @change="file($event)" hidden/>
        <button onclick="document.getElementById('fileImage').click();"><b-icon icon="pencil"/></button>
      </div>
      <div class="profile">
        <hr>
        <div class="username">
        <p>Username</p>
        <p>{{getDataUser.username}}</p>
        </div>
        <hr>
        <hr>
        <div class="email">
          <p>Email</p>
          <p>{{getDataUser.email}}</p>
        </div>
        <hr>
        <hr>
        <div class="map">
          <p>Location</p>
          <GoogleMapMaps :center="{ lat: -6.89846733562317, lng: 107.60501039761238 }" :zoom="12" class="location">
            <GoogleMapMarker :position="{ lat: -6.89846733562317, lng: 107.60501039761238 }" :draggable="false"/>
          </GoogleMapMaps>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  name: 'Home',
  components: {
    GoogleMapMaps: VueGoogleMaps.Map,
    GoogleMapMarker: VueGoogleMaps.Marker
  },
  data () {
    return {
      socket: io('http://localhost:4000'),
      text: '',
      content: [],
      id: localStorage.getItem('id'),
      id_room: localStorage.getItem('room'),
      to: '',
      to_id: '',
      to_image: '',
      serverUrl: process.env.VUE_APP_BACKEND,
      users: [],
      chat: [],
      profile: false,
      logout: false,
      profileReceiver: false,
      imgUrl: '',
      image: '',
      username: ''
    }
  },
  computed: {
    ...mapGetters({
      getDataUser: 'user/getDataUser',
      getRoomID: 'user/getRoomId',
      getDataReceiver: 'user/getDataReceiver'
    })
  },
  methods: {
    ...mapActions({
      setDataUser: 'user/detailUser',
      actionLogout: 'auth/logout',
      actionGetReceiver: 'user/detailUserReceiver',
      changePhoto: 'user/changePhoto'
    }),
    scrollBottom () {
      const objDiv = document.getElementById('chat-content')
      objDiv.scrollTop = objDiv.scrollHeight
    },
    joinRoom () {
      this.socket.emit('join-room', this.id_room)
    },
    getListUser () {
      this.socket.emit('get-list-user', this.id, this.id_room)
    },
    resGetListUser () {
      this.socket.on('res-get-list-user', (user) => {
        this.users = user
      })
    },
    getChat (idReceiver, username, image) {
      this.to = username
      this.to_id = idReceiver
      this.to_image = image
      this.socket.emit('get-chat', { id_from: this.id, id_to: idReceiver, room_id: this.id_room })
      this.profileReceiver = false
    },
    resGetChat () {
      this.socket.on('res-get-chat', (chat) => {
        this.chat = chat
      })
    },
    sendMessage () {
      const data = {
        from: this.id,
        to: this.to_id,
        msg: this.text
      }
      this.socket.emit('send-message', data)
      this.text = ''
      this.scrollBottom()
    },
    openProfile () {
      this.profile = !this.profile
    },
    openProfileReceiver () {
      this.profileReceiver = !this.profileReceiver
    },
    openLogout () {
      this.logout = !this.logout
    },
    clickLogout () {
      const msg = confirm('Are u sure want to logout?')
      if (msg) {
        this.actionLogout()
        this.$router.push('/login')
        alert("You're logged out")
      }
    },
    setImage (e) {
      this.image = ''
      const file = e.target.files[0]
      this.bio.imgUrl = URL.createObjectURL(file)
      this.bio.img = file
    },
    file (data) {
      const files = data.target.files[0]
      this.imgUrl = URL.createObjectURL(files)
      this.image = files
      const fd = new FormData()
      fd.append('image', this.image)
      const result = {
        id: this.id,
        files: fd
      }
      this.changePhoto(result)
    }
  },
  mounted () {
    this.setDataUser(this.id)
    this.joinRoom()
    this.getListUser()
    this.resGetListUser()
    this.resGetChat()
  },
  updated () {
    this.setDataUser(this.id)
  }
}
</script>

<style scoped>
  /* Party chat CSS */
  .container-fluid .row .chat-party{
    width: 100%;
    height: 100vh;
    background: #FFFFFF;
    border-right: 1px solid #E5E5E5;
  }
  .container-fluid .row .chat-party .header{
    position: relative;
    display: flex;
    padding: 10px 0 10px 0;
  }
  .container-fluid .row .chat-party .header .title h3{
    color: #7E98DF;
    font-weight: bold;
  }
  .container-fluid .row .chat-party .header .hamburger-menu{
    position: absolute;
    right: 0;
  }
  .container-fluid .row .chat-party .header .hamburger-menu .menu{
    position: relative;
    width: 55px;
    height: 30px;
  }
  .container-fluid .row .chat-party .header .hamburger-menu .menu .first-line{
    border-bottom: 4px solid #7E98DF;
    border-radius: 50px;
  }
  .container-fluid .row .chat-party .header .hamburger-menu .menu .second-line{
    margin-top: 5px;
    border-bottom: 4px solid #7E98DF;
    width: 15px;
    border-radius: 50px;
  }
  .container-fluid .row .chat-party .header .hamburger-menu .menu .third-line{
    margin-top: 5px;
    border-bottom: 4px solid #7E98DF;
    border-radius: 50px;
  }
  .container-fluid .row .chat-party .main-profile .profile-photo{
    display: flex;
    justify-content: center;
  }
  .container-fluid .row .chat-party .main-profile .profile-photo img{
    margin-top: 30px;
    width: 80px;
    height: 80px;
    border-radius: 25px;
    object-fit: cover;
    cursor: pointer;
  }
  .container-fluid .row .chat-party .main-profile .profile-information{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    line-height: 1em;
  }
  .container-fluid .row .chat-party .main-profile .profile-information .name{
    display: flex;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
  }
  .container-fluid .row .chat-party .main-profile .profile-information .email{
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #848484;
  }
  .container-fluid .row .chat-party .party-room-chat .header input{
    border: none;
    outline: 0;
    background-color: #FAFAFA;
    border-radius: 25px;
    width: 90%;
    height: 50px;
    padding-left: 50px;
  }
  .container-fluid .row .chat-party .party-room-chat .header .search{
    position: absolute;
    left: 5px;
    top: 20px;
  }
  .container-fluid .row .chat-party .party-room-chat .header .plus{
    position: absolute;
    right: -35px;
    top: 5px;
  }
  .container-fluid .row .chat-party .party-room-chat .chatting-party{
    width: 100%;
    height: 45vh;
    overflow: auto;
  }
  .container-fluid .row .chat-party .party-room-chat .chatting-party .party-room{
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 60px;
    display: flex;
    margin-bottom: 20px;
  }
  .container-fluid .row .chat-party .party-room-chat .chatting-party .party-room img{
    width: 60px;
    height: 60px;
    border-radius: 15px;
  }
  .container-fluid .row .chat-party .party-room-chat .chatting-party .party-room .name{
    margin-left: 20px;
    width: 80%;
    font-weight: bold;
    font-size: 18px;
  }
  /* End of party chat CSS */

  /* Room chat CSS */
  .container-fluid .row .chat-room{
    width: 100%;
    height: 100vh;
    background: #FAFAFA;
  }
  .container-fluid .row .chat-room .empty-chat{
    width: 100%;
    height: 100vh;
    color: #848484;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container-fluid .row .chat-room .chat .receiver-info{
   background-color: #FFFFFF;
    width: 100%;
    height: 70px;
    display: flex;
  }
  .container-fluid .row .chat-room .chat .receiver-info .profile-photo{
    display: flex;
    width: 100px;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .container-fluid .row .chat-room .chat .receiver-info .profile-photo img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 15px;
  }
  .container-fluid .row .chat-room .chat .receiver-info .username{
    margin-top: 8px;
    font-size: 18px;
  }
  .container-fluid .row .chat-room .chat .chat-content{
    background-color: #FAFAFA;
    width: 100%;
    height: calc(100vh - 70px - 70px);
    overflow: auto;
    padding: 30px 20px 30px 20px;
  }
  .container-fluid .row .chat-room .chat .chat-content::-webkit-scrollbar{
     width: 5px;
  }
  .container-fluid .row .chat-room .chat .chat-content::-webkit-scrollbar-track {
  background: #e5e5e5;
  }
  .container-fluid .row .chat-room .chat .chat-content::-webkit-scrollbar-thumb {
  background-color: #5e5e5e;
  border-radius: 20px;
  }
  .container-fluid .row .chat-room .chat .chat-content .self-box{
    margin-bottom: 10px;
    margin-right: 50px;
    padding: 10px;
    width: 60%;
    background: white;
    float: right;
    position: relative;
    border-radius: 50px 15px 50px 50px;
    padding-right: 40px;
    padding-left: 20px;
  }
  .container-fluid .row .chat-room .chat .chat-content .self-box img{
    width: 50px;
    height: 50px;
    right: 10px;
    position: absolute;
    border-radius: 15px;
    transform: translateX(140%);
  }
  .container-fluid .row .chat-room .chat .chat-content .other{
    background: #7E98DF;
    color: #FFFFFF;
    margin-bottom: 10px;
    margin-left: 50px;
    padding: 10px;
    width: 60%;
    float: left;
    position: relative;
    border-radius: 50px 50px 50px 15px;
    padding-left: 40px;
    padding-right: 40px;
  }
  .container-fluid .row .chat-room .chat .chat-content .other img{
    width: 50px;
    height: 50px;
    border-radius: 15px;
    position: absolute;
    transform: translateX(-200%);
  }
  .container-fluid .row .chat-room .chat .chat-tools{
    position: absolute;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    bottom: 0;
    padding: 15px 20px 0 20px;
  }
  .container-fluid .row .chat-room .chat .chat-tools input{
    width: 100%;
    height: 40px;
    background-color: #FAFAFA;
    padding: 0 60px 0 40px;
    border-radius: 10px;
    border: none;
    outline: 0;
  }
  .container-fluid .row .chat-room .chat .chat-tools button{
    position: absolute;
    background-color: transparent;
    border: none;
    top: 20px;
    right: 30px;
    color: #7E98DF;
  }
  /* End of room chat CSS */
  .detail-receiver{
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100vh;
    background: #FFFFFF;
    z-index: 10;
    border-left: 1px solid #e5e5e5;
  }
  .detail-receiver .header .icon{
    position: absolute;
    left: 30px;
    top: 17px;
    color: #7E98DF;
    cursor: pointer;
  }
  .detail-receiver .image{
    display: flex;
    justify-content: center;
    margin-top: 75px;
    width: 100%;
    height: 110px;
    position: relative;
  }
  .detail-receiver .image img{
    width: 100px;
    height: 100px;
    border-radius: 20%;
    object-fit: cover;
  }
  .detail-receiver .profile{
    line-height: 0.8em;
  }
  .detail-receiver .profile .username{
    padding: 0 30px 0 30px;
  }
  .detail-receiver .profile .email{
    padding: 0 30px 0 30px;
  }
  .detail-receiver .map{
    padding: 0 30px 0 30px;
  }
  .detail-receiver .map .location{
    width: 100%;
    height: 180px;
  }
  .edit-profile{
    position: absolute;
    top: 0;
    width: 33.2%;
    height: 100vh;
    background: #FFFFFF;
  }
  .edit-profile .header .icon{
    position: absolute;
    left: 30px;
    top: 17px;
    color: #7E98DF;
    cursor: pointer;
  }
  .edit-profile .edit-image{
    display: flex;
    justify-content: center;
    margin-top: 75px;
    width: 100%;
    height: 110px;
    position: relative;
  }
  .edit-profile .edit-image img{
    width: 100px;
    height: 100px;
    border-radius: 20%;
    object-fit: cover;
  }
  .edit-profile .edit-image button{
    border: none;
    transform: translate(-50%, 250%);
    width: 30px;
    height: 30px;
    background-color: #7E98DF;
    color: #FFFFFF;
    border-radius: 50%;
  }
  .edit-profile .profile{
    line-height: 0.8em;
  }
  .edit-profile .profile .username{
    padding: 0 30px 0 30px;
  }
  .edit-profile .profile .email{
    padding: 0 30px 0 30px;
  }
  .edit-profile .profile .map{
    padding: 0 30px 0 30px;
  }
  .edit-profile .profile .map .location{
    width: 100%;
    height: 180px;
  }

  .setting{
    position: absolute;
    margin-top: 15px;
    right: 10%;
    background: #7E98DF;
    color: #FFFFFF;
    width: 80px;
    height: 40px;
    padding: 8px;
    border-radius: 15px;
  }
  .setting button{
    border: none;
    background-color: transparent;
    color: #FFFFFF;
  }

  @media (max-width: 768px){
    .home{
      overflow: hidden;
    }
    .container-fluid .row .chat-party{
      width: 100%;
      height: 700px;
      border: none;
    }
    .edit-profile{
      width: 100%;
      height: 400px;
      margin-bottom: 100px;
    }
    .detail-receiver .map .location{
    height: 250px;
    }
    .container-fluid .row .chat-room .chat .receiver-info{
      border-top: 1px solid #e5e5e5;
    }
    .detail-receiver{
      border-top: 1px solid #e5e5e5;
    }
  }
</style>
