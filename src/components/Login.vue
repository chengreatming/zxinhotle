<template>
  <div class='login-wrap'>
    <form>
      <label>账号:</label>
      <input v-model="user" size="15" type="text" name="user"><br/><br/>
      <label>密码:</label>
      <input v-model="password" size="15" type="password" name="password"><br/><span v-show = "!result">*密码错误</span><br/>
      <input v-on:click="verificate" type="button" name="" class="submit-btn" value="登陆">
    </form>
    </div>
</template>

<script>
import VueResource from'Vue-resource'
export default {
  name: 'hello',
  data () {
    return {
      user:'',
      password:'',
      result:true,
      apiUrl: 'http://localhost/zxin/home/login'
    }
  },
  methods:{
    verificate:function(){
      this.$http.post(this.apiUrl,{"manager":this.user,"password":this.password},{emulateJSON: true})
      .then((responce) => {
        console.log(responce.data);
          if(responce.body.flag==1){
            this.$router.push({path:'/serving'});
          }else{
            if(responce.body.flag==0){
              this.result = false;}
          }
      });
    }/*
    verificate:function(){
      if(this.user == '123' && this.password == '123'){
        this.$route.meta.requiresAuth = true;
        this.result = true;
        this.$router.push({path:'/serving'})
      }else {
        this.result = false;
      }
    }*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@media screen and (min-width: 960px){
  $inputWidth:600px;
  .login-wrap {
    margin-top:50px;
    width:100%;
    position:relative;
    form {
      width:$inputWidth;
      height:300px;
      position:absolute;
      left:50%;
      margin:$inputWidth/8 0 0 $inputWidth/(-2);
      font-size:40px;
      span {
        font-size:20px;
        color:red;
      }
      .submit-btn {
        margin-right:460px;
        font-size:40px;
     }
    }
  }
}
@media screen and (min-width: 600px) and (max-width: 960px){
  $inputWidth:600px;
  .login-wrap {
    margin-top:50px;
    width:100%;
    position:relative;
    form {
      width:$inputWidth;
      height:300px;
      position:absolute;
      left:50%;
      margin:$inputWidth/5 0 0 $inputWidth/(-2);
      font-size:30px;
      text-align:center;
      span {
        font-size:20px;
        color:red;
      }
      .submit-btn {
        margin-right:260px;
        font-size:30px;
     }
    }
  }
}
@media screen and (max-width: 600px){
  $inputWidth:500px;
  .login-wrap {
    margin-top:50px;
    width:100%;
    position:relative;
    form {
      width:$inputWidth;
      height:300px;
      position:absolute;
      left:50%;
      margin:$inputWidth/3 0 0 $inputWidth/(-2);
      font-size:25px;
      text-align:center;
      span {
        font-size:20px;
        color:red;
      }
      .submit-btn {
        margin-right:200px;
        font-size:25px;
      }
    }
  }
}
</style>

