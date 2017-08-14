<template>
  <div id="app">
    <my-header></my-header>
    <keep-alive>
      <transition name="fade">
        <router-view 
        v-on:order="getDishes"
        v-on:selecteTable="getTable" 
        v-on:noTable="remindTable"  
        v-on:plusDish="plus" 
        v-on:minusDish="minus"
        v-bind:myOrder='order' 
        v-bind:dishes='menu'
        v-bind:total='totalPrice'
        v-bind:showTable='table'
        > 
        </router-view>
      </transition>
    </keep-alive>
    <my-footer 
      v-bind:showDish='countDishes' 
      v-bind:showTable='table' 
      v-bind:total='totalPrice' 
      v-bind:noTable='noTable'
      v-on:noTable="remindTable"
      >
    </my-footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import router from './router'
/* eslint-disable no-new */
export default {
  name: 'app',
  data() {
    return {
      countDishes:Number(),
      table:'',
      //提交订单后提醒选桌
      noTable:false,
      //order为最终的订单数据
      order:[],
      //menu为系统的菜式数据，menu绑定点菜组件的dishes
      menu:[
        {id:1,name:'蒜苔牛肉',price:25,src:"http://http://zxinhotel.applinzi.com/images/蒜苔牛肉.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:2,name:'煎泥鳅',price:38,src:"http://http://zxinhotel.applinzi.com/images/煎泥鳅.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:3,name:'臭豆腐',price:10,src:"http://http://zxinhotel.applinzi.com/images/臭豆腐.png",category:'staple',quantity:1,isSelected:false,status:0},
        {id:4,name:'醴陵扣肉',price:38,src:"http://http://zxinhotel.applinzi.com/images/醴陵扣肉.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:5,name:'雪花丸子',price:30,src:"http://http://zxinhotel.applinzi.com/images/雪花丸子.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:6,name:'双色鱼头',price:38,src:"http://http://zxinhotel.applinzi.com/images/双色鱼头.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:7,name:'水煮鱼',price:45,src:"http://http://zxinhotel.applinzi.com/images/水煮鱼.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:8,name:'铁板鱿鱼',price:45,src:"http://http://zxinhotel.applinzi.com/images/铁板鱿鱼.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:9,name:'干锅香辣虾',price:45,src:"http://http://zxinhotel.applinzi.com/images/干锅香辣虾.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:10,name:'酸辣鸡杂',price:28,src:"http://http://zxinhotel.applinzi.com/images/酸辣鸡杂.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:11,name:'红烧肉',price:28,src:"http://http://zxinhotel.applinzi.com/images/红烧肉.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:12,name:'小炒肉',price:28,src:"http://http://zxinhotel.applinzi.com/images/小炒肉.png",category:'meat',quantity:1,isSelected:false,status:0},
        {id:13,name:'雪里红肉末',price:18,src:"http://http://zxinhotel.applinzi.com/images/雪里红肉末.png",category:'vegetable',quantity:1,isSelected:false,status:0},
        {id:14,name:'油麦菜',price:15,src:"http://http://zxinhotel.applinzi.com/images/油麦菜.png",category:'vegetable',quantity:1,isSelected:false,status:0},
        {id:15,name:'菜心',price:15,src:"http://http://zxinhotel.applinzi.com/images/菜心.png",category:'vegetable',quantity:1,isSelected:false,status:0},
        {id:16,name:'上汤豆苗',price:18,src:"http://http://zxinhotel.applinzi.com/images/上汤豆苗.png",category:'vegetable',quantity:1,isSelected:false,status:0},
        {id:17,name:'拍黄瓜',price:8,src:"http://http://zxinhotel.applinzi.com/images/拍黄瓜.png",category:'vegetable',quantity:1,isSelected:false,status:0},
        {id:18,name:'海带丝',price:8,src:"http://http://zxinhotel.applinzi.com/images/海带丝.png",category:'vegetable',quantity:1,isSelected:false,status:0},
        {id:19,name:'老鸭汤',price:38,src:"http://http://zxinhotel.applinzi.com/images/老鸭汤.png",category:'soup',quantity:1,isSelected:false,status:0},
        {id:20,name:'莲藕排骨汤',price:38,src:"http://http://zxinhotel.applinzi.com/images/莲藕排骨汤.png",category:'soup',quantity:1,isSelected:false,status:0},
        {id:21,name:'乌鸡汤',price:38,src:"http://http://zxinhotel.applinzi.com/images/乌鸡汤.png",category:'soup',quantity:1,isSelected:false,status:0},
        {id:22,name:'胡萝卜玉米排骨汤',price:38,src:"http://http://zxinhotel.applinzi.com/images/胡萝卜玉米排骨汤.png",category:'soup',quantity:1,isSelected:false,status:0},
        {id:23,name:'米饭（6人份）',price:8,src:"http://http://zxinhotel.applinzi.com/images/米饭（6人份）.png",category:'staple',quantity:1,isSelected:false,status:0},
        {id:24,name:'腊味饭',price:23,src:"http://http://zxinhotel.applinzi.com/images/腊味饭.png",category:'staple',quantity:1,isSelected:false,status:0}
      ]
    }
  },
  computed:{
    totalPrice:function(){
      var p = Number();
      for(var i = 0;i < this.order.length;i ++){
        p += this.order[i].price*this.order[i].quantity;
      }
      return p;
    }
  },
  /*created:function(){
    this.$http.get("http://http://zxinhotel.applinzi.com/home/getDishes",{emulateJSON:true})
    .then((responce) => {
      this.menu = responce.data;
      console.log(this.menu[0].isSelected);
    },(responce) => {
      alert("获取菜单失败")
    });
  },*/
  methods:{
    getDishes:function(selectedDish){
      if(selectedDish.isSelected == false){
        this.countDishes += 1;
        this.order.push(selectedDish);
      }else {
        for(var i = 0;i<this.order.length;i++){
          if(this.order[i].id == selectedDish.id){
            this.countDishes -= this.order[i].quantity;
            this.order.splice(i,1);
          }
        };
      }
    },
    getTable:function(selectedTable){
      this.table = selectedTable;    
    },
    plus:function(){
      this.countDishes += 1;
    },
    minus:function(dish){
      if(dish){
        //删除点菜组件中选中效果
        for(var i = 0;i<this.menu.length;i++){
          if(this.menu[i].id == dish.id){
            //this.id = this.menu[i].id
            this.menu[i].isSelected = false;
            this.countDishes -= dish.quantity;
            this.menu[i].quantity = 1;
          }
        };
        //同步订单
        //this.order = delDish;
      }else {
        this.countDishes -= 1;
      }
    },
    remindTable:function(info){
      this.noTable = info;
    }
  },
  components:{ 
    myHeader:Header,
    myFooter:Footer,
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
 </style>
