<template>
    <div>
        <div class="container-fluid">
            <div class="content">
                <div class="head m-3">
                    <router-link to="/login"><b-icon class="icon" icon="chevron-left" font-scale="2"/></router-link><h4 style="font-weight: bold;">Forgot Password</h4>
                </div>
                <p style="margin-left: 40px;">You'll get messages soon on your e-mail</p>
                <div class="form">
                    <form action="">
                        <p style="color: #848484;">Email</p>
                        <input type="email" placeholder="Enter your email here">
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

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
        top: 15px;
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
    .content .form form button{
        width: 100%;
        height: 50px;
        border: none;
        border-radius: 25px;
        margin-top: 20px;
        color: #FFFFFF;
        background-color: #7E98DF;
    }
</style>
