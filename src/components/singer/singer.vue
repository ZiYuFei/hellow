<template>
	<div class="singer">
		<list-view :Listview="singers" @click="slectid">
		</list-view>
		 <router-view></router-view>
	</div>
	
</template>

<script>
	import { getSingerList} from 'src/api/singer.js'
	import ListView from 'src/base/listview/listview.vue'
	import {mapMutations} from 'vuex'
	
	const HOT_LEN= 9
	const HOT_NAME="热门"
	export default {
	  data() {
	    return {
	      singers: []
	    }
	  },
	  created() {
	    this._getSingerList()
	  },
	  methods: {
	    _getSingerList() {
	      getSingerList().then( res => {
	      this.singers=this._getdataList(res.data.list)
	      } )
	    },
	    _getdataList(res){
	    	let allData={}
	    	let hot={
	    		title:HOT_NAME,
	    		items:[]
	    	}
	    	
	    	res.forEach((item,index)=>{
	    		if(index < HOT_LEN){
	    			hot.items.push({
	    				name:item.Fsinger_name,
	    				id:item.Fsinger_mid,
	    				image:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
	    			})
	    		}
	    		const key = item.Findex
	    		if(!allData[key]){
	    			allData[key]={
	    				title:key,
	    				items:[],
	    			}
	    		}
	    		allData[key].items.push({
	    				name:item.Fsinger_name,
	    				id:item.Fsinger_mid,
	    				image:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
	    			})
	    	})
			//进一步过滤掉非字母
			let otherList=[]
			Object.keys(allData).forEach((item,index)=>{
				if(/[a-zA-Z]/.test(item)){
					otherList.push(allData[item])
				}
			})
			otherList.sort((num1,num2)=>{
				return num1.title.charCodeAt(0)-num2.title.charCodeAt(0)
			})
			let hotArr=[]
			hotArr.push(hot)
			return hotArr.concat(otherList)
	    },
	    slectid(item){
	    	this.$router.push({
	    		path:`/singer/${item.id}`
	    	})
	    	this.setId(item)
	    },
	    ...mapMutations({
	    	setId:'SET_SINGERId'
	    })
	  },
	  components:{
	  	ListView
	  }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer
		position:fixed
		top:88px
		bottom:0
		width:100%
	
</style>