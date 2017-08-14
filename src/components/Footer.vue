<template>
  <div class='nav'>
    <ul>
      <router-link to="/table">
        <li v-bind:class="{'animated infinite tada' : noTable}"v-on:click="clearNoTable">选桌
          <i  class="fa fa-th-large" aria-hidden="true"></i>
          <span v-show="showTable" class="count">{{showTable}}</span>
        </li>
      </router-link>
      <router-link to="/">
        <li>点菜
          <i class="fa fa-cutlery" aria-hidden="true"></i>
        </li>
      </router-link>
       <router-link :to="{name:'bill',myOrder:{name:'a',price:38}}">
      <li v-on:click="selesct">我的菜单<i id="car" class="fa fa-shopping-cart" aria-hidden="true"></i><span v-show="showDish"  class="count">{{showDish}}</span><span class='all' v-show="total>0"></span></li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      onmsg:''
    }
  },
  props:['showDish','showTable','total','noTable'],
  methods:{
    selesct:function(){
      this.$emit('getfromchild',this.countDishes);
    },
    clearNoTable:function(){
      this.$emit('noTable',false)
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 960px){
  .nav {
    height:5%;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index:1000;
    ul{
      width:100%;
      height:100%;
    }
    li {
      color:white;
      font-weight:700;
      height:100%;
      float:left;
      line-height:100%;
      width:33%;
      display: flex;
      justify-content:center;
      align-items:Center;
      background-color:#ff3333;
    }
    .count {
      display:inline-block;
      background-color:white;
      color:orange;
      margin-left:5px;
      width:23px;
      height:23px;
      line-height:23px;
      text-align:center;
      border-radius:20px;
      font-weight:700;
      font-size:20px;
    }
  }
    .all {
      color:white;
      font-weight:700;
      font-size:20px;
    }
}
@media screen and (min-width: 600px) and (max-width: 960px){
  .nav {
    height:5%;
    width: 100%;
    position: fixed;
    z-index:1000;
    bottom: 0;
    ul{
      width:100%;
      height:100%;
    }
    li {
      color:white;
      font-weight:700;
      height:100%;
      float:left;
      line-height:100%;
      width:33%;
      display: flex;
      justify-content:center;
      align-items:Center;
      background-color:#ff3333;
    }
    .count {
      display:inline-block;
      background-color:white;
      color:orange;
      margin-left:5px;
      width:23px;
      height:23px;
      line-height:23px;
      text-align:center;
      border-radius:20px;
      font-weight:700;
      font-size:20px;
    }
  }
    .all {
      color:white;
      font-weight:700;
      font-size:20px;
    }
}
@media screen and (max-width: 600px){
  .nav {
    height:40px;
    width: 100%;
    position: fixed;
    z-index:1000;
    bottom: 0;
    ul{
      width:100%;
      height:100%;
    }
    li {
      color:white;
      font-weight:700;
      height:100%;
      float:left;
      line-height:100%;
      width:33%;
      display: flex;
      justify-content:center;
      align-items:Center;
      background-color:#ff3333;
    }
    .count {
      display:inline-block;
      background-color:white;
      color:orange;
      margin-left:5px;
      width:23px;
      height:23px;
      line-height:23px;
      text-align:center;
      border-radius:20px;
      font-weight:700;
      font-size:20px;
    }
  }
    .all {
      color:white;
      font-weight:700;
      font-size:20px;
    }
}
</style>
