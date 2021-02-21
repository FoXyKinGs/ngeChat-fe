<template>
    <div>
        <div class="container-fluid">
            <div class="content">
                <div class="head m-3">
                    <router-link to="/login"><b-icon class="icon" icon="chevron-left" font-scale="1.5"/></router-link><h4 style="font-weight: bold;">Register</h4>
                </div>
                <p style="margin-left: 40px;">Let's create your account!</p>
                <div class="form">
                    <form action="" @submit.prevent="register()">
                        <p style="color: #848484;">Name</p>
                        <input type="text" placeholder="Enter your name here" v-model="dataUser.username">
                        <p class="mt-3" style="color: #848484;">Email</p>
                        <input type="email" placeholder="Enter your email here" v-model="dataUser.email">
                        <p class="mt-3" style="color: #848484;">Password</p>
                        <input type="password" id="password" autocomplete="on" placeholder="Enter your password here" v-model="dataUser.password"><img class="btn eye" id="eye" src="../assets/icon/visibility.png" @click="seePassword()"/>
                        <button>Register</button>
                    </form>
                    <div class="alternate">
                        <h6><span>Register with</span></h6>
                    </div>
                    <div class="alternate">
                    <button><b-icon icon="google"/>  Google</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      dataUser: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionRegister: 'register/registerAccount'
    }),
    seePassword () {
      const x = document.getElementById('password')
      const y = document.getElementById('eye')
      if (x.type === 'password') {
        x.type = 'text'
        y.src = 'data:image/png;base64,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'
      } else {
        x.type = 'password'
        y.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB4wAAAeMBqFO+JAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANtSURBVHic7Zo9Sx1BGIWf2QgSO00CV0ghxiYEiRC1CFYRDGqhFlYi+AOsbGxEUtjfVvwVCWgRIalCwI8IIYQUIdpElHzYKEjU+KbYNVzXO3t3Z3YddffAcGG5c97znpmdmZ0ZJSLkGZ5rAa5RGOBagGsUBrgW4BqFAa4FuEZhgGsBrlF3GUGUUq3AU+A+cAe4W/EL8Av4XfH7HXgvIpuZa8tiKayUageeAT1BKRlS7QLvgvJWRD6lo7ACIpJKAW4DE8AKIBmVlSDG7dR0p5B4C1AG9jJMPFz2gpgtzgwIWvwFcHiJiYfLYaDBuEeYJj8CbDlMPFy2gJHMDQAagcUrkLCuLAKNSXKKPQsopR4Br4AHsSro8RNYA3bwR3nwZ4lmoAu4Z8n/DRgSkc+x/h2z5YeBfcxb5gB/0OoBvIg4XvCfclDHNN4+MJzKKwBMA6eGQk6AeaBkMM6UgronhrFPgWkrA4BJi1bYA3pNR+cKDb3YTbGTRgYAYxYt/xVos02+QktbwGnaE8YSGQAMAMcWLZ9a8iETTHvCMTBQjffCLKCUegh8wF/oJMVf4LmIvNH9QSlVDzwGOoMCsB6UjyLyJ6JuL/AauGWg7RB4IiJfzj0NuVwHrGL+vs3XaMV+YDui/jbQX4Nj3kLfKlCnfQWAGQvyAzSjPdAALCTgWgAaNFwl7KbImaoGAB3AkQVxOaLVkiT/34QIvrKFziOg45wBgAI2LEgF6Ino9qacVV8H/MWSjdYNzvZCAsIhS8IfVFnhAfVEv/O1yjZQX4XXC2LaaB6qNMBm4BNgSdNS3Za8AnRruJcseVdFBE8p1Yf/EWKDHc3zTs3zJNBx6GLGRZdSqs/DH/ltsat5nqUBuphJMJP7bXEPmEuBR7fru54Ct47DdKe5EnOeiCzjb1DYoFnzPEsDdDHjYk1ElotpsFgIFUvh4mMo15/DxYaIxuVBbt6W2GBV3oiA49ycTdFxLXeNwFOGQc96wlXYFp+K5I8hYNYiuMuDEQFma8aJKWYUu6nnso/GDoDROLklORxtB14CrbEq6JH14egm/rlgvOs0CbtlE1f/eLwpUU6GA1M+L0iETMjvFZmQES3k8ZKUpkdMcM2uyeX+omQmBlwIkrerstcJxba4awGuURjgWoBrFAa4FuAahQGuBbhG7g34B1iQhADFiQjAAAAAAElFTkSuQmCC'
      }
    },
    register () {
      if (!this.dataUser.username || !this.dataUser.email || !this.dataUser.password) {
        alert('All data must be filled')
      } else {
        this.actionRegister(this.dataUser).then((response) => {
          alert('Account registered')
          this.$router.push('/login')
        }).catch((err) => {
          alert(err)
        })
      }
    }
  }
}
</script>

<style scoped>
    .container-fluid{
        width: 100%;
        height: 100vh;
        background: #E5E5E5;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content{
        position: relative;
        background: #FFFFFF;
        width: 450px;
        height: 550px;
        border-radius: 15px;
        box-shadow: 0 10px 10px 10px rgba(0,0,0,0.1);
    }
    .content .head{
        display: flex;
        justify-content: center;
        color: #7E98DF;
    }
    .content .head .icon{
        position: absolute;
        left: 30px;
        top: 17px;
    }
    .content .form{
        width: 100%;
        line-height: 1;
    }
    .content .form form{
        padding: 20px 40px 20px 40px;
    }
    .content .form form input{
        margin-top: -10px;
        width: 100%;
        height: 40px;
        outline: 0;
        border-width: 0 0 1px;
        border-color: #000000;
        transition: 1s;
        font-weight: bold;
    }
    .content .form form input:focus{
        border-color: #5eff00;
    }
    .content .form form .eye{
        position: relative;
        float: right;
        transform: translate(20% ,-90%);
        width: 45px;
        height: 35px;
    }
    .content .form form button{
        width: 100%;
        height: 50px;
        border: none;
        border-radius: 25px;
        margin-top: -20px;
        color: #FFFFFF;
        background-color: #7E98DF;
    }
    .content .alternate{
        display: flex;
        justify-content: center;
    }
    .content .alternate h6{
        width: 80%;
        text-align: center;
        border-bottom: 1px solid #848484;
        line-height: 0.1em;
        margin: 10px 0 10px;
        color: #848484;
    }
    .content .alternate h6 span{
        background:#fff;
        padding:0 10px;
    }
    .content .alternate button{
        margin-top: 20px;
        width: 80%;
        height: 50px;
        color: #7E98DF;
        border: 1px solid #7E98DF;
        background-color: #FFFFFF;
        border-radius: 25px;
    }
</style>
