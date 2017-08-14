<template>
  <div class='header'>
    <router-link to="/serving">
      <i class="fa fa-home fa-lg" aria-hidden="true"></i>
    </router-link>
    <router-link to="/manage">
    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
    </router-link>
    <img src='http://localhost/zxin1/images/xin.png'>
    <h1>知心大酒店</h1>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@media screen and (min-width: 960px){
.header {
  background-color:white;
  position: fixed;
  top: 0;
  width: 100%;
  height:50px;
  z-index:1000;
  i {
    height:50px;
    display:inline-block;
    margin:20px 0 0 20px;
    color:#ff3333;
  }
  img { 
    width:180px;
    height:50px;    
    position:absolute;
    left:50%;
    margin-left:-90px;

  }
  h1{  
    font-weight:700;
    font-size:25px;
    line-height:50px;
    float:right;
    margin-right:20px;
    color:#ff3333;
  }
}
}
@media screen and (min-width: 600px) and(max-width: 960px){
.header {
  background-color:white;
  position: fixed;
  top: 0;
  width: 100%;
  height:50px;
  z-index:1000;
  i {
    height:50px;
    display:inline-block;
    margin:20px 0 0 20px;
    color:#ff3333;
  }
  img { 
    width:180px;
    height:50px;    
    position:absolute;
    left:50%;
    margin-left:-90px;

  }
  h1{  
    font-weight:700;
    font-size:20px;
    line-height:50px;
    float:right;
    margin-right:20px;
    color:#ff3333;
  }
}
}
@media screen and (max-width: 600px){
.header {
  background-color:white;
  position: fixed;
  top: 0;
  width: 100%;
  height:30px;
  z-index:1000;
  i {
      height:30px;
      display:inline-block;
      margin:10px 0 0 20px;
      color:#ff3333;
    }
  img { 
    width:108px;
    height:30px;    
    position:absolute;
    left:50%;
    margin-left:-54px;

  }
  h1{  
    font-weight:700;
    font-size:15px;
    line-height:30px;
    float:right;
    margin-right:20px;
    color:#ff3333;
  }
}
}
</style>
