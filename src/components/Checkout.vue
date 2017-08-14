<template>
  <div class="checkout-wrap">
    <div class="order-item" v-for="order in orders" v-on:click="showId(order.id)">
    <h1>{{order.table}}号桌</h1> 
    <h1>{{order.time}}</h1>
    <div class="deal-section" v-show="order.isPaid !== '1'">
      <span>¥{{order.total}}</span>
      <label v-show="paidId==order.id">实收：</label>
      <input 
      type="text" 
      name="paid" 
      size="3" 
      v-bind:value="order.total"
      v-bind:id="'input'+order.id"
      v-show="paidId==order.id">
      <span class="deal-btn" v-bind:id="'paid'+order.id" v-on:click="checkout(order.id,$event)">结账</span>
    </div> 
    <div class="deal-section" v-show="order.isPaid == '1'">
      <span>¥{{order.paid}}</span>
      <span class="deal-btn-finished">完成</span>
    </div>
    <transition name="slideDown">
    <div v-show="selectedId==order.id">
      <table>
      <tr>
        <th>菜品</th>
        <th>单价</th>
        <th>数量</th>
        <th>总价</th>
      </tr>
      <tr v-for="detail in order.detail">
        <th>{{detail.name}}</th>
        <th>¥{{detail.price}}</th>
        <th>{{detail.quantity}}</th>
        <th>¥{{detail.price*detail.quantity}}</th>
      </tr>
      </table>
    </div>
    </transition>   
    </div>
  </div>
</template>

<script>
import VueResource from'Vue-resource'
export default {
  name: 'checkout',
  data () {
    return {
      orders:[],
      selectedId:-1,
      checkoutId:-1,
      paidId:-1,
      apiUrl:"http://zxinhotel.applinzi.com/index.php/"
    }
  },
  created:function(){
      const _this = this
      _this.$http.get(this.apiUrl+"home/get_orders",{emulateJSON: true})
      .then((responce) => {
        _this.orders = responce.data;
        for(var i = 0;i < _this.orders.length;i++){
          _this.orders[i].detail = eval('('+_this.orders[i].detail+')'); 
        }
      },(responce) => {
      alert("获取订单失败");
      });
    //定时获取订单，自动刷新页面

    window.setInterval(function(){
    _this.$http.get(this.apiUrl+"home/get_orders",{emulateJSON: true})
      .then((responce) => {
        _this.orders = responce.data;
        for(var i = 0;i < _this.orders.length;i++){
          _this.orders[i].detail = eval('('+_this.orders[i].detail+')'); 
        }
      },(responce) => {
      alert("获取订单失败");
      });
    },10000);
  },
  methods:{
    showId:function(id){
      if(this.selectedId == id){
        this.selectedId =-1;
      }else{
        this.selectedId = id
      }
    },
    checkout:function(id,e){
      //阻止事件冒泡
      e.cancelBubble = true;
      var a = document.getElementsByClassName('deal-btn')
      if (document.getElementById('paid'+id).innerText=="结账") {
        //展开效果
        this.paidId = id;
        for(var i = 0; i < a.length;i ++){
          a[i].innerText="结账";
        };
        document.getElementById('paid'+id).innerText="提交";
      }else{
        //上传结账信息到服务器
        var paid = document.getElementById('input'+id).value;
        this.$http.post(this.apiUrl+"home/modify_order",{"id":id,"isPaid":1,"paid":paid},{emulateJSON: true})
          .then((responce) => {
            document.getElementById('paid'+id).innerHTML="<i class='fa fa-check' aria-hidden='true'></i>";
          },(responce) => {
            console.log("连接失败");
          });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@media screen and (min-width: 960px){
.checkout-wrap {
  margin-top:100px;
  .checkout{
    position:absolute;
    top:100px;
    width:100%;
    color:white;
  }
  .order-item {
    border:1px solid #ddd6d5;
    width:90%;
    margin:0 auto;
    line-height:50px;
    margin-bottom:5px;
    border-radius:5px;
    font-size:25px;
    h1 {
      display:inline-block;
      margin:0 50px;
    }
    .deal-section {
      float:right;
      max-width:600px;
      span {
        font-weight:700;
        color:orange;
        width:70px;
      }
      .deal-btn {
        background-color:#ff3333;
        display:inline-block;
        border-radius:5px;
        width:60px;
        text-align:center;
        color:white;
      }
      .deal-btn-finished {
        background-color:green;
        display:inline-block;
        border-radius:5px;
        width:60px;
        text-align:center;
        color:white;
      }
      input {
        border-radius:3px;
      }
    }
    div {
      overflow:hidden;
      table {
        width:100%;
        font-size:20px;
        border-top:1px solid #ddd6d5;
        background-color:white;
        th {
          width:25%;
          font-weight:500;
        }
      }
    }
  }
}
  .slideDown-enter-active, .slideDown-leave-active {
    transition:all .5s ease-out;
    max-height:500px;
    
  }
  .slideDown-enter, .slideDown-leave-active {
    max-height:0px;
    transition: all 0.3s ease-in;
  }

}
@media screen and (min-width: 600px) and (max-width: 960px){
.checkout-wrap {
  margin-top:100px;
  .order-item {
    border:1px solid #ddd6d5;
    width:90%;
    margin:0 auto;
    line-height:45px;
    margin-bottom:5px;
    border-radius:5px;
    font-size:20px;
    h1 {
      display:inline-block;
      margin:0 15px;
    }
    .deal-section {
      float:right;
      max-width:600px;
      span {
        font-weight:700;
        color:orange;
        width:70px;
      }
      .deal-btn {
        background-color:#ff3333;
        display:inline-block;
        border-radius:5px;
        width:45px;
        text-align:center;
        color:white;
      }
      .deal-btn-finished {
        background-color:green;
        display:inline-block;
        border-radius:5px;
        width:45px;
        text-align:center;
        color:white;
      }
      input {
        border-radius:3px;
      }
    }
    div {
      overflow:hidden;
      table {
        width:100%;
        font-size:20px;
        border-top:1px solid #ddd6d5;
        th {
          width:25%;
          font-weight:500;
        }
      }
    }
  }
}
  .slideDown-enter-active, .slideDown-leave-active {
    transition:max-height .5s ease-out;
    max-height:500px;
  }
  .slideDown-enter, .slideDown-leave-active {
    max-height:0px;
    transition: max-height 0.2s ease-in;
  }
}
@media screen and (max-width: 600px){
.checkout-wrap {
  margin-top:100px;
  .order-item {
    border:1px solid #ddd6d5;
    width:90%;
    margin:0 auto;
    line-height:40px;
    margin-bottom:5px;
    border-radius:5px;
    font-size:16px;
    h1 {
      display:inline-block;
      margin:0 10px;
    }
    .deal-section {
      float:right;
      max-width:600px;
      font-size:15px;
      span {
        font-weight:700;
        color:orange;
        width:70px;
      }
      .deal-btn {
        background-color:#ff3333;
        display:inline-block;
        border-radius:5px;
        width:45px;
        text-align:center;
        color:white;
      }
      .deal-btn-finished {
        background-color:green;
        display:inline-block;
        border-radius:5px;
        width:45px;
        text-align:center;
        color:white;
      }
      input {
        border-radius:3px;
      }
    }
    div {
      overflow:hidden;
      table {
        width:100%;
        font-size:16px;
        border-top:1px solid #ddd6d5;
        th {
          width:25%;
          font-weight:500;
        }
      }
    }
  }
}
  .slideDown-enter-active, .slideDown-leave-active {
    transition:max-height .5s ease-out;
    max-height:500px;
  }
  .slideDown-enter, .slideDown-leave-active {
    max-height:0px;
    transition: max-height .1s ease-in;
  }
}
</style>


