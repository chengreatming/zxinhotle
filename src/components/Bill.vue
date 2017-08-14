<template>
 <div class="bill-wrap">
    <p class="remind" v-show="myOrder==''">亲！您还未点菜呢。</p>
    <div class="pay-section" v-show="myOrder !=''">
      <h1>总价：¥{{total}}<span id="submit-btn-wrap"><a id="submit-btn" v-on:click="submitOrder">提交</a></span></h1>
    </div>
    <div class='bill-item' v-for="myDish in myOrder">
      <img v-bind:src='myDish.src'>
      <h2>{{myDish.name}}</h2>
      <div class="computed">
        <h3 class="num"><a v-on:click="minus(myDish)" src="javascript:void(0)">-</a><span>{{myDish.quantity}}</span><a v-on:click="plus(myDish)" src="javascript:void(0)">+</a></h3>
        <h3 class="total">¥{{myDish.price*myDish.quantity}}</h3>
        <h3><a class="del" v-on:click="del(myDish)">删除</a></h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bill',
  data () {
    return {
    }
  },
  //对应主组件中的order
  props:['myOrder',"total",'showTable'],
  methods:{
    plus:function(dish){
      var indexId = this.myOrder.indexOf(dish);
      this.myOrder[indexId].quantity += 1;
      this.$emit('plusDish');
    },
    minus:function(dish){
      if(dish.quantity>1){
        var indexId = this.myOrder.indexOf(dish);
        this.myOrder[indexId].quantity -= 1;
        this.$emit('minusDish');
      }
    },
    del:function(dish){
        var indexId = this.myOrder.indexOf(dish);
        this.myOrder.splice(indexId,1);
        this.$emit('minusDish',dish);

    },
    submitOrder:function(){
      if (this.showTable == '') {
        //提醒选桌
        this.$emit('noTable',true);
        document.getElementById('submit-btn').text="请选桌";
        
      }else{
      this.$http.post("http://localhost/zxin/home/addOrder",{"order":this.myOrder,"table":this.showTable,"total":this.total,"types":this.myOrder.length},{emulateJSON: true})
        .then((responce) => {
            if(responce.body.flag==1){
              document.getElementById('submit-btn-wrap').innerHTML="<i class='fa fa-check' aria-hidden='true'></i>";   
            }else{
              if(responce.body.flag==0){
                alert(上传失败);}
            }
        },(responce) => {
        alert("链接失败");
        });
      }
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 960px){
  $itemHeigh:120px;
  .bill-wrap{
    margin-top:100px;
  }
  .remind {
    font-size:5rem;
    font-weight:700;
    color:orange;
    line-height:100%;
    height:500px;
    display: flex;
    justify-content:center;
    align-items:Center;
  }
  .pay-section {
    background-color:#666666;
    position: fixed;
    height:50px;
    top: 50px;
    width:100%;
    h1 {
     line-height:50px;
     color:white;
     font-weight:700;
     font-size:25px;
     float:right;
     margin-right:5%;
     a,span{
      display:inline-block;
      margin-left:10px;
      text-align:center;
      width:100px;
      background-color:#cc3333;
      color:white;
      font-weight:700;
     }
    }
  }
  .bill-item {
    border:1px solid #ddd6d5;
    width:90%;
    height:$itemHeigh;
    margin:0 auto;
    border-radius:10px;
    * {
      display:inline-block;
    }
    img {
      width:$itemHeigh;
      height:$itemHeigh;
      border:1px solid #ddd6d5;
      border-radius:10px;
      float:left;
    }
    h2 {
      line-height:$itemHeigh;
      margin-left:20px;
    }
    .computed{
      float:right;
      height:100%;
      display: flex;
      justify-content:center;
      align-items:Center;
      .total {
        width:40px;
        font-weight:700;
      }
      h3 {
        margin:0 30px 0 50px;
        a,span {
          width:25px;
          line-height:25px;
          border:1px solid #ddd6d5;
          text-align:center;
        }
        a{cursor: pointer;}
        .del {
          width:40px;
          border:none;
          color:black;
          &:hover{color:red;}
        }
      }
    }
  }
}
@media screen and (min-width: 600px) and (max-width: 960px){
  $itemHeigh:100px;
  .bill-wrap{
    margin-top:100px;
  }
  .remind {
    font-size:3rem;
    font-weight:700;
    color:orange;
    line-height:100%;
    height:500px;
    display: flex;
    justify-content:center;
    align-items:Center;
  }
  .pay-section {
    background-color:#666666;
    position: fixed;
    height:40px;
    top: 50px;
    width:100%;
    h1 {
     line-height:40px;
     color:white;
     font-weight:700;
     font-size:25px;
     float:right;
     margin-right:5%;
     a,span{
      display:inline-block;
      margin-left:10px;
      text-align:center;
      width:100px;
      background-color:#cc3333;
      color:white;
      font-weight:700;
     }
    }
  }
  .bill-item {
    border:1px solid #ddd6d5;
    width:90%;
    height:$itemHeigh;
    margin:0 auto;
    border-radius:10px;
    * {
      display:inline-block;
    }
    img {
      width:$itemHeigh;
      height:$itemHeigh;
      border:1px solid #ddd6d5;
      border-radius:10px;
      float:left;
    }
    h2 {
      line-height:$itemHeigh;
      margin-left:20px;
    }
    .computed{
      float:right;
      height:100%;
      display: flex;
      justify-content:center;
      align-items:Center;
      .total {
        width:20px;
        font-weight:700;
      }
      h3 {
        margin:0 20px 0 15px;
        a,span {
          width:25px;
          line-height:25px;
          border:1px solid #ddd6d5;
          text-align:center;
        }
        a{cursor: pointer;}
        .del {
          width:40px;
          border:none;
          color:black;
          &:hover{color:red;}
        }
      }
    }
  }
}
@media screen and (max-width: 600px){
  $itemHeigh:50px;
  .bill-wrap{
    margin-top:75px;
  }
  .remind {
    font-size:2rem;
    font-weight:700;
    color:orange;
    line-height:100%;
    height:500px;
    display: flex;
    justify-content:center;
    align-items:Center;
  }
  .pay-section {
    background-color:#666666;
    position: fixed;
    height:40px;
    top: 30px;
    width:100%;
    h1 {
     line-height:40px;
     color:white;
     font-weight:700;
     font-size:18px;
     float:right;
     margin-right:5%;
     a,span{
      display:inline-block;
      margin-left:10px;
      text-align:center;
      width:100px;
      background-color:#cc3333;
      color:white;
      font-weight:700;
     }
    }
  }
  .bill-item {
    border:1px solid #ddd6d5;
    width:96%;
    height:$itemHeigh;
    margin:0 auto;
    font-size:15px;
    border-radius:10px;
    * {
      display:inline-block;
    }
    img {
      width:$itemHeigh;
      height:$itemHeigh;
      border:1px solid #ddd6d5;
      border-radius:10px;
      float:left;
    }
    h2 {
      line-height:$itemHeigh;
      margin-left:10px;
    }
    .computed{
      float:right;
      height:100%;
      width:50%;
      display: flex;
      justify-content:right;
      align-items:Center;
      text-align:right;
      .total {
        width:25%;
        font-weight:700;
        text-align:center;
      }
      h3 {
        width:25%;
        text-align:center;
        .del {
          width:100%;
          border:none;
          color:black;
          &:hover{color:red;}
        }
      }
      .num {
        width:50%;
        a,span {
          width:20px;
          line-height:20px;
          border:1px solid #ddd6d5;
          text-align:center;
        }
        a{cursor: pointer;}  
      }
    }
  }
}
</style>
