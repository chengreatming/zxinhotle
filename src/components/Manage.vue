<template>
  <div class="manage-wrap">
    <div class="manage-nav">
      <ul>
        <router-link to="/manage">
          <li v-bind:class="{categoryActive:category=='checkout'}" v-on:click="setCategory('checkout')">收银</li>
        </router-link>
        <li v-bind:class="{categoryActive:category=='menu'}"
        v-on:click="setCategory('menu')">
        菜单管理</li>
        <li v-bind:class="{categoryActive:category=='table'}"
        v-on:click="setCategory('table')">餐桌管理</li>
        <li v-bind:class="{categoryActive:category=='employee'}" v-on:click="setCategory('employee')">员工管理</li>
        <li v-bind:class="{categoryActive:category=='report'}" v-on:click="setCategory('report')">经营报表</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'bill',
  data () {
    return {
      category:'checkout'
    }
  },
  methods:{
  setCategory:function(food){
      this.$route.meta.requiresAuth = false;
      this.category = food;
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 960px){
.manage-wrap {
    margin-top:100px;
    .manage-nav{
      overflow:hidden;
      background-color:#666666;
      position: fixed;
      z-index:100;
      top: 50px;
      width:100%;
      ul {
        height:40px;
        .categoryActive{
          background-color:#cc3333;
        }
        li{
          color:white;
          font-size:1rem;
          font-weight:600;
          height:100%;
          width:17%;
          margin-left:2%;
          float:left;
          display: flex;
          justify-content:center;
          align-items:Center;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 600px) and (max-width: 960px){
 .manage-wrap {
    margin-top:100px;
    .manage-nav{
      overflow:hidden;
      background-color:#666666;
      position: fixed;
      z-index:100;
      top: 50px;
      width:100%;
      ul {
        height:40px;
        .categoryActive{
          background-color:#cc3333;
        }
        li{
          color:white;
          font-size:1rem;
          font-weight:600;
          height:100%;
          width:17%;
          margin-left:2%;
          float:left;
          display: flex;
          justify-content:center;
          align-items:Center;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px){
  .manage-wrap {
    margin-top:80px;
    .manage-nav{
      overflow:hidden;
      background-color:#666666;
      position: fixed;
      z-index:100;
      top: 30px;
      width:100%;
      ul {
        height:40px;
        .categoryActive{
          background-color:#cc3333;
        }
        li{
          color:white;
          font-size:14px;
          font-weight:600;
          height:100%;
          width:17%;
          margin-left:2%;
          float:left;
          display: flex;
          justify-content:center;
          align-items:Center;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
  }
}
</style>
