<template>
  <div class="category-wrap">
    <div class="category">
      <ul>
        <li 
        class="all-category hook" 
        v-on:click="noCategory"
        v-bind:class="{categoryActive:category==''}"
        >
        全部分类
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </li>
        <li 
        v-bind:class="{categoryActive:category=='meat'}"
        v-on:click="setCategory('meat')"
        >荤菜</li>
        <li 
        v-bind:class="{categoryActive:category=='vegetable'}"
        v-on:click="setCategory('vegetable')">素菜</li>
        <li 
        v-bind:class="{categoryActive:category=='soup'}"
        v-on:click="setCategory('soup')">煲汤</li>
        <li 
        v-bind:class="{categoryActive:category=='staple'}"
        v-on:click="setCategory('staple')">
        主食
        </li>
      </ul>
    </div>
    <transition name="slideDown">
      <div class="drop-category" v-show="allCategory">
        <ul>
          <li class='hook'>宴客菜</li>
          <li class='hook'>小炒</li>
          <li class='hook'>开胃菜</li>
          <li class='hook'>下酒菜</li>
          <li class='hook'>腌制</li>
          <li v-on:click="setCategory('drink')">饮品</li>
        </ul>
      </div>
    </transition>
    <div class="food-section">
      <div class="food-item" 
        v-for="dish in dishes" 
        v-show="dish.category == category || category ==''" 
        v-on:click="selesct(dish,$event)" 
        v-bind:class="{dishSelected:dish.isSelected}"
      >
        <transition name="img">
          <img 
          class="moving-img"
          v-bind:id=dish.num
          v-bind:src="dish.src" 
          v-show="dish.isSelected_test">
        </transition>
        <img v-bind:src="dish.src">
        <h2>{{dish.name}}</h2>
        <h1>¥{{dish.price}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      category:'',
      allCategory:false
    }
  },
  props:['dishes'],
  created:function(){
    document.addEventListener('click', (e) => {
      var name = e.target.className;
        if (name.match('hook')){ 
        this.allCategory = !this.allCategory;
        }else {
          this.allCategory = false;
        }
   })
  },
  methods:{
    selesct:function(dish,e,event){ 
      //发送数据给菜单
      this.$emit('order',dish);
      var index = this.dishes.indexOf(dish)
      this.dishes[index].isSelected = !this.dishes[index].isSelected;
      var isSelected = this.dishes[index].isSelected;
    },
    setCategory:function(food){
      this.$route.meta.requiresAuth = false;
      this.category = food;
    },
    noCategory:function(){
      this.category = '';
    }
  },
}
</script>

<style lang="scss">
.slideDown-enter-active, .slideDown-leave-active {
    transition:max-height .5s ease-out;
    max-height:500px;
  }
  .slideDown-enter, .slideDown-leave-active {
    max-height:0px;
    transition: max-height 0.2s ease-in;
  }
@media screen and (min-width: 960px){
  .category-wrap {
    margin-top:100px;
    .category {
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
    .drop-category {
      position:absolute;
      z-index:1000;
      left:3%;
      width:12%;
      height:30%;
      ul {
        height:100%;
        width:100%;
        li {
          color:white;
          font-size:1rem;
          font-weight:600;
          height:20%;
          width:100%;
          display: flex;
          justify-content:center;
          align-items:Center;
          background-color:#666666;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
    .food-section{
      width:100%;
      margin-bottom:45px;
      margin-top:1rem;
      .food-item{
        margin-top:.3rem;
        border:1px solid #EAEAEA;
        border-radius:2%;
        overflow:hidden;
        text-align:center;
        -webkit-column-break-before: avoid;
        -webkit-column-break-after: avoid;
        -webkit-column-break-inside: avoid;
        transition: all 0.20s ease-in-out;
        -webkit-transition: all 0.20s ease-in-out;
        -moz-transition: all 0.20s ease-in-out;
        outline: none;
        position:relative;
        z-index:1;
        .moving-img {
          width:50px;
          height:50px;
          border-radius:50px;
          position:absolute;
          left:40%;
          top:30%;
          z-index:1;
        }
        &:hover{
          border:1px solid #35a5e5;
          box-shadow: 0 0 5px rgba(81, 203, 238, 1);
          -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
          -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
        }
        h1  {
          font-weight:700;
          font-size:1.5rem;
          color:orange;
        }
        h2{
          font-weight:700;
          font-size:1rem;
        }
      }
    }
  }
  .dishSelected,.cSelected {
    background-color:#ff6666;
   }
  .food-section{
    -moz-column-count:4;-moz-column-gap:10px;-moz-column-rule:10px solid white;  
      -webkit-column-count:4;-webkit-column-gap:10px;-webkit-column-rule:0px solid white;   
      -o-column-count:4;-o-column-gap:10px;-o-column-rule:10px solid white;
  }
  .category {
      overflow:hidden;
      ul {
        height:20px;}
  }
}
@media screen and (min-width: 600px) and (max-width: 960px){
  .category-wrap {
    margin-top:100px;
    .category {
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
    .drop-category {
      position:absolute;
      z-index:1000;
      left:3%;
      width:12%;
      height:30%;
      ul {
        height:100%;
        width:100%;
        li {
          color:white;
          font-size:1rem;
          font-weight:600;
          height:20%;
          width:100%;
          display: flex;
          justify-content:center;
          align-items:Center;
          background-color:#666666;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
    .food-section{
      width:100%;
      margin-bottom:45px;
      margin-top:1rem;
      .food-item{
        margin-top:.3rem;
        border:1px solid #EAEAEA;
        border-radius:2%;
        overflow:hidden;
        text-align:center;
        -webkit-column-break-before: avoid;
        -webkit-column-break-after: avoid;
        -webkit-column-break-inside: avoid;
        transition: all 0.20s ease-in-out;
        -webkit-transition: all 0.20s ease-in-out;
        -moz-transition: all 0.20s ease-in-out;
        outline: none;
        position:relative;
        z-index:1;
        .moving-img {
          width:50px;
          height:50px;
          border-radius:50px;
          position:absolute;
          left:50%;
          top:30%;
          z-index:1;
        }
        &:hover{
          border:1px solid #35a5e5;
          box-shadow: 0 0 5px rgba(81, 203, 238, 1);
          -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
          -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
        }
        h1  {
          font-weight:700;
          font-size:20px;
          color:orange;
          line-height:22px;

        }
        h2{
          font-weight:700;
          font-size:16px;
          line-height:20px;
        }
      }
    }
  }
  .dishSelected,.cSelected {
    background-color:#ff6666;
   }
  .food-section{
    -moz-column-count:3;-moz-column-gap:5px;-moz-column-rule:5px solid white;  
      -webkit-column-count:3;-webkit-column-gap:5px;-webkit-column-rule:0px solid white;   
      -o-column-count:3;-o-column-gap:5px;-o-column-rule:5px solid white;
  }
}
@media screen and (max-width: 600px){
  .category-wrap {
    margin-top:75px;
    .category {
      overflow:hidden;
      background-color:#666666;
      position: fixed;
      top: 30px;
      width:100%;
      z-index:1000;
      ul {
        height:40px;
        .categoryActive{
          background-color:#cc3333;
        }
        li{
          color:white;
          font-size:15px;
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
    .drop-category {
      position:absolute;
      left:3%;
      width:12%;
      height:30%;
      z-index:1000;
      ul {
        height:100%;
        width:100%;
        li {
          color:white;
          font-size:10px;
          font-weight:600;
          height:20%;
          width:100%;
          display: flex;
          justify-content:center;
          align-items:Center;
          background-color:#666666;
          &:hover{
            background-color:#cc3333;
          }
        }
      }
    }
    .food-section{
      width:100%;
      margin-bottom:45px;
      margin-top:1rem;
      .food-item{
        margin-top:.3rem;
        border:1px solid #EAEAEA;
        border-radius:2%;
        overflow:hidden;
        text-align:center;
        -webkit-column-break-before: avoid;
        -webkit-column-break-after: avoid;
        -webkit-column-break-inside: avoid;
        transition: all 0.20s ease-in-out;
        -webkit-transition: all 0.20s ease-in-out;
        -moz-transition: all 0.20s ease-in-out;
        outline: none;
        position:relative;
        z-index:1;
        .moving-img {
          width:40px;
          height:40px;
          border-radius:40px;
          position:absolute;
          left:40%;
          top:30%;
          z-index:1;
        }        
        &:hover{
          border:1px solid #35a5e5;
          box-shadow: 0 0 5px rgba(81, 203, 238, 1);
          -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
          -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
        }
        h1  {
          font-weight:700;
          font-size:20px;
          color:orange;
          line-height:20px;
        }
        h2{
          font-weight:700;
          font-size:15px;
          line-height:15px;
        }
      }
    }
  }
  .dishSelected,.cSelected {
    background-color:#ff6666;
   }
  .food-section{
    -moz-column-count:3;-moz-column-gap:5px;-moz-column-rule:5px solid white;  
      -webkit-column-count:3;-webkit-column-gap:5px;-webkit-column-rule:0px solid white;   
      -o-column-count:3;-o-column-gap:5px;-o-column-rule:5px solid white;
  }
}
</style>
