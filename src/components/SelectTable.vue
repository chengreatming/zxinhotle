<template>
  <div class="table-wrap">
    <div class='table-nav'>
      <div class='logo'>
      <span class='free'>空闲</span>
      <span class='busy'>用餐中</span>
      </div>
    </div>
    <div class="table-section">
      <div 
      class="table" 
      v-for="table in tables" 
      v-bind:class="{selected:activeid == table.id,busy:!table.isFree}" v-on:click="selesct(table)">
        <span>{{table.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table',
  data () {
    return {
      tables:[
        {id:1,name:'1',isFree:true},
        {id:2,name:'2',isFree:true},
        {id:3,name:'3',isFree:true},
        {id:4,name:'4',isFree:true},
        {id:5,name:'5',isFree:false},
        {id:6,name:'6',isFree:true},
        {id:7,name:'7',isFree:true},
        {id:8,name:'8',isFree:false},
        {id:9,name:'9',isFree:true},
        {id:10,name:'10',isFree:true},
        {id:11,name:'百合',isFree:true},
        {id:12,name:'玫瑰',isFree:true},
      ],
      activeid:-1
    }
  },
  methods:{
    selesct:function(table){
      if (table.isFree == true ) {
      this.activeid = table.id;
      this.$emit('selecteTable',table.id)
      }else {
      this.$emit('selecteTable','')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@media screen and (min-width: 960px){
  $tableSize:150px;
  $navLogo:50px;
  .table-wrap {
    margin-top:100px;
    width:100%;
      .table-nav{
        overflow:hidden;
        position: fixed;
        top: 55px;
        height:$navLogo;
        width:100%;
        text-align:center;
        .logo{
          span{
            color:white;
            line-height:50px;
            display:inline-block;
            float:left;
            height:$navLogo;
            width:$navLogo;
            background-color:#666666;
            border-radius:$navLogo/2;
            margin:0 20px 0 10px;
          }
          .free {
            background-color:#f25454;
          }
        }
      }
      .table-section{
        margin:0 auto;
        width:90%;
        column-count:6;column-gap:10px;
        -moz-column-count:6;-moz-column-gap:10px;
        -webkit-column-count:6;-webkit-column-gap:10px;
        -o-column-count:6;-o-column-gap:10px;
        .table {
          width:$tableSize;
          height:$tableSize;
          border-radius:$tableSize/10;
          margin:20px 20px 0 20px;
          background-color:#f25454;
          display: flex;
          justify-content:center;
          align-items:Center;
          float:left;
          -webkit-column-break-before: avoid;
          -webkit-column-break-after: avoid;
          -webkit-column-break-inside: avoid;
          page-break-before: avoid;
          page-break-after: avoid;
          page-break-inside: avoid;
          break-before: avoid;
          break-after: avoid;
          break-inside: avoid;
          &:hover {opacity:0.7;}
          span {
            font-size:3rem;
            color:white;
          }
          }
          .selected {
            background-color:#8f3636;
          }
          .busy{
            background-color:#666666;
          }
        }
      }
  }
@media screen and (min-width: 600px) and (max-width: 960px) {
  $tableSize:120px;
  $navLogo:50px;
  .table-wrap {
    margin-top:100px;
      .table-nav{
        overflow:hidden;
        position: fixed;
        top: 55px;
        height:$navLogo;
        width:100%;
        text-align:center;
        .logo{
          span{
            color:white;
            line-height:50px;
            display:inline-block;
            float:left;
            height:$navLogo;
            width:$navLogo;
            background-color:#666666;
            border-radius:$navLogo/2;
            margin:0 20px 0 10px;
          }
          .free {
            background-color:#f25454;
          }
        }
      }
      .table-section{
        margin:0 auto;
        width:90%;
        column-count:4;
        column-gap:8px;
        -moz-column-count:4;-moz-column-gap:8px;
        -webkit-column-count:4;-webkit-column-gap:8px;
        -o-column-count:4;-o-column-gap:8px;
        .table {
          width:$tableSize;
          height:$tableSize;
          border-radius:$tableSize/10;
          margin:20px 20px 0 20px;
          background-color:#f25454;
          display: flex;
          justify-content:center;
          align-items:Center;
          -webkit-column-break-before: avoid;
          -webkit-column-break-after: avoid;
          -webkit-column-break-inside: avoid;
          page-break-before: avoid;
          page-break-after: avoid;
          page-break-inside: avoid;
          break-before: avoid;
          break-after: avoid;
          break-inside: avoid;
          &:hover {opacity:0.7;}
          span {
            font-size:3rem;
            color:white;
          }
          }
          .selected {
            background-color:#8f3636;
          }
          .busy{
            background-color:#666666;
          }
        }
      }
  }
@media screen and (max-width: 600px) {
 $tableSize:100px;
  $navLogo:50px;
  .table-wrap {
    margin-top:80px;
      .table-nav{
        overflow:hidden;
        position: fixed;
        top: 35px;
        height:$navLogo;
        width:100%;
        text-align:center;
        .logo{
          span{
            color:white;
            line-height:50px;
            display:inline-block;
            float:left;
            height:$navLogo;
            width:$navLogo;
            background-color:#666666;
            border-radius:$navLogo/2;
            margin:0 20px 0 10px;
          }
          .free {
            background-color:#f25454;
          }
        }
      }
      .table-section{
        width:90%;
        margin:100px auto;
        column-count:3;column-gap:5px;
        -moz-column-count:3;-moz-column-gap:5px;
        -webkit-column-count:3;-webkit-column-gap:5px;
        -o-column-count:3;-o-column-gap:5px;
        .table {
          width:$tableSize;
          height:$tableSize;
          border-radius:$tableSize/10;
          margin-top:10px;
          background-color:#f25454;
          display: flex;
          justify-content:center;
          align-items:Center;
          -webkit-column-break-before: avoid;
          -webkit-column-break-after: avoid;
          -webkit-column-break-inside: avoid;
          page-break-before: avoid;
          page-break-after: avoid;
          page-break-inside: avoid;
          break-before: avoid;
          break-after: avoid;
          break-inside: avoid;
          &:hover {opacity:0.7;}
          span {
            font-size:25px;
            color:white;
          }
          }
          .selected {
            background-color:#8f3636;
          }
          .busy{
            background-color:#666666;
          }
      }
      }
  }
</style>
