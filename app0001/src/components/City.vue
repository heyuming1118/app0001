<template>
<div>
  <div id="city-list">
    <div class="city-hot">
      <h4 class="bg-color">热门城市</h4>
      <ul class="clearfix">
        <li class="bg-color font-color" v-for='item in hotList' :key="item.id">{{item.nm}}</li>
      </ul>
    </div>
    <div class="city-sort" ref="city_sort">
      <div v-for="item in cityList" :key="item.index">
        <h4 class="bg-color">{{item.index}}</h4>
        <ul class="clearfix bg-ul-color">
          <li class="bg-color font-color font-li-color"  v-for="itemList in item.list" :key="itemList.id">{{itemList.nm}}</li>
        </ul>
      </div>
      
    </div>
  </div>
  <div class="index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}} </li>
      </ul>
    </div>
</div>  
</template>
<script>


export default {
  name:"ctiy",
  data(){
    return {
      cityList:[],
      hotList:[]
    }
  },
  mounted(){
    this.axios.get('/api/cityList').then((res)=>{
      var msg = res.data.msg;
      if(msg === 'ok'){
        var cities = res.data.data.cities;
        //[{index:'A',list:[{nm:'阿城',id:23}]}]
        var {cityList,hotList}=this.fromaCityList(cities)
        this.cityList = cityList;
        this.hotList = hotList;
        console.log(hotList)
      }
    })
  },
  methods:{
    fromaCityList(cities){
      var cityList = [];
      var  hotList = [];
      for(var i=0;i<cities.length;i++){
        if(cities[i].isHot===1){
          hotList.push(cities[i]);
        }
      }
      // console.log(hotList)
      for (var i=0;i<cities.length;i++){
        var firstLetter = cities[i].py.substring(0,1).toUpperCase();
        if(toCom(firstLetter)){
          cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
          // console.log(cityList)
        }else{
          for(var j = 0;j<cityList.length;j++){
            if(cityList[j].index === firstLetter){
              cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
            }
          }
        }
      };
      cityList.sort((n1,n2)=>{
        if(n1.index > n2.index){
          return 1
        }else if(n1.index < n2.index){
          return -1
        }
      })
    function toCom(firstLetter){
      for(var i = 0;i<cityList.length;i++){
        if(cityList[i].index === firstLetter){
          return false
        }
      }
      return true;
    };
    // console.log(hotList)
    return {cityList,hotList}
    },
   handleToIndex(index){
      var h4 = this.$refs.city_sort.getElementsByTagName("h4");
      this.$refs.city_sort.parentNode.scrollTop = h4[index].offsetTop;
      console.log( this.$refs.city_sort)
      console.log(h4[index].offsetTop)
   }
  }
}
</script>
<style scoped>
#city-list{
  position: relative;
  top: 20px;
}
.city-hot{
  height: 150px;
  border-bottom:0.5px solid #cc0099;
  background-image: url("../../public/image/4.jpg");
  background-size: cover;
}
.bg-color{
  background-color: cadetblue;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color:#fee;
  
}
.clearfix{display: flex; flex-wrap: wrap; justify-content: space-around;}
.font-color{
  margin-top: 2px;
  width: 80px;
  background:rgba(0,0,0,0);
  border:1px solid rgb(247, 151, 8);
  color:#ddd;
}  
.font-color:hover{background:rgba(247, 151, 8, 0.4) ;}
.font-li-color{color:#000;}
.bg-ul-color{background:rgba(201, 197, 212,0.3);border-radius: 5px;}
.index{position: fixed;top: 15%; right: 0;}
</style>