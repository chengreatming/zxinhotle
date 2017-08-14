<template>
  <div class='serving-wrap'>
    <div class="process"><h1>服务工作流程：</br>--> 紫色背景：烹饪中</br> --> 震动状态：提醒服务员上菜</br> --> 灰色背景：完成上菜</h1></div>
    <div 
    class="order-item"
    v-for="order in orders"
    v-show="order.isServed == 1"
    >
      <h1>{{order.table}}号桌</h1>
      <ul>
        <li 
        v-for="food in order.detail" 
        v-on:click='selected(order,food)' 
        v-bind:class="{ 'animated infinite tada' : food.status==1,finshServing: food.status==2}" >
        {{food.name}}
          <span v-show="food.quantity>1">{{food.quantity}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import animate from 'animate.css'
export default {
  name: 'hello',
  data () {
    return {
      orders:[],
      apiUrl:"http://zxinhotel.applinzi.com/index.php/"
    }
  },
  created:function(){
    const _this = this
      this.$http.get(this.apiUrl+"zxin/home/get_orders",{emulateJSON: true})
      .then((responce) => {
        this.orders = responce.data;
        for(var i = 0;i < this.orders.length;i++){
          console.log(this.orders.length);
          this.orders[i].detail = eval('('+this.orders[i].detail+')'); 
        }
      },(responce) => {
      alert("获取订单失败");
      });
     //定时获取订单，自动刷新页面
    window.setInterval(function(){
    _this.$http.get(this.apiUrl+"zxin/home/get_orders",{emulateJSON: true})
      .then((responce) => {
        console.log(1);
        _this.orders = responce.data;
        for(var i = 0;i < _this.orders.length;i++){
          _this.orders[i].detail = eval('('+_this.orders[i].detail+')'); 
        }
      },(responce) => {
      alert("获取订单失败");
      });
    },3000);
  },
  methods:{
    selected:function(order,food){
      var oIndex = this.orders.indexOf(order);
      var fIndex = this.orders[oIndex].detail.indexOf(food);
      this.orders[oIndex].detail[fIndex].status = parseInt(this.orders[oIndex].detail[fIndex].status)
      var statu =this.orders[oIndex].detail[fIndex].status;
      console.log(statu);
      if(statu < 2 ){
        this.orders[oIndex].detail[fIndex].status += 1;
        //修改上菜状态
        this.$http.post(this.apiUrl+"home/modify_order",{"id":this.orders[oIndex].id,"detail":this.orders[oIndex].detail,"isServed":1 },{emulateJSON: true})
          .then((responce) => {
            console.log(responce.data);
          },(responce) => {
            console.log("修改状态失败");
          });  
      };
      //判断是否上齐
      var closeS = this.orders[oIndex].detail.length*2
      var countS = 0;
      for(var i = 0;i < this.orders[oIndex].detail.length; i++){
        this.orders[oIndex].detail[i].status = parseInt(this.orders[oIndex].detail[i].status)
        countS += this.orders[oIndex].detail[i].status;
      }
      console.log("closeS:"+closeS);
      console.log("countS="+countS);
      if(countS == closeS){
        this.$http.post(this.apiUrl+"home/modify_order",{"id":this.orders[oIndex].id,"isServed":0},{emulateJSON: true})
          .then((responce) => {
            console.log(responce.data);
          },(responce) => {
            console.log("连接失败");
          });
      }; 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@media screen and (min-width: 960px){
  $foodItemHeight:120px;
  $foodItemBorder:2px;
  .serving-wrap {
    margin-top:50px;
    width:100%;
    .order-item {
      margin-top:5px;
      height:$foodItemHeight;
      border-bottom:$foodItemBorder solid black;
      overflow:hidden;
      h1 {
        width:$foodItemHeight;
        height:$foodItemHeight - $foodItemBorder;
        line-height:$foodItemHeight - $foodItemBorder;
        float:left;
        background-color: #FF6347;
        text-align:center;
        border-radius:10px;
        font-size:30px;
        font-weight:700;
      }
      ul {
        width:100%;
        .finshServing{
          background-color:#666666!important;
        }
        li {
          color:white;
          background-color:#cc00cc;
          margin:10px 10px;
          float:left;
          height:40px;
          font-size:20px;
          line-height:40px;
          border-radius:5px;
          padding:0 5px;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
  }

}
@media screen and (min-width: 600px) and (max-width: 960px){
  $foodItemHeight:100px;
  $foodItemBorder:2px;
  .serving-wrap {
    margin-top:50px;
    width:100%;
    .order-item {
      margin-top:5px;
      height:$foodItemHeight;
      border-bottom:$foodItemBorder solid black;
      overflow:hidden;
      h1 {
        width:$foodItemHeight;
        height:$foodItemHeight - $foodItemBorder;
        line-height:$foodItemHeight - $foodItemBorder;
        float:left;
        background-color: #FF6347;
        text-align:center;
        border-radius:10px;
        font-size:30px;
        font-weight:700;
      }
      ul {
        width:100%;
        .finshServing{
          background-color:#666666!important;
        }
        li {
          color:white;
          background-color:#cc00cc;
          margin:5px 5px;
          float:left;
          height:40px;
          font-size:20px;
          line-height:40px;
          border-radius:5px;
          padding:0 5px;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
  }
  .finshServing{
    background-color:#666666;
  }
}
@media screen and (max-width: 600px){
  $foodItemHeight:80px;
  $foodItemBorder:2px;
  .serving-wrap {
    margin-top:50px;
    width:100%;
    .order-item {
      margin-top:5px;
      height:$foodItemHeight;
      border-bottom:$foodItemBorder solid black;
      overflow:hidden;
      h1 {
        width:$foodItemHeight;
        height:$foodItemHeight - $foodItemBorder;
        line-height:$foodItemHeight - $foodItemBorder;
        float:left;
        background-color: #FF6347;
        text-align:center;
        border-radius:10px;
        font-size:25px;
        font-weight:700;
      }
      ul {
        width:100%;
        .finshServing{
          background-color:#666666!important;
        }
        li {
          color:white;
          background-color:#cc00cc;
          margin:5px 5px;
          float:left;
          height:30px;
          font-size:15px;
          line-height:30px;
          border-radius:5px;
          padding:0 5px;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
  }
}
</style>
