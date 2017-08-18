<template>
	<scroll class="listview" 
		:scrollY="true" 
		:data="Listview" 
		:isBindScroll="true"
		@scroll="scroll"
		ref="listview">
		<ul>
			<li class="list-group" v-for="item in Listview" ref="listGroup">
				<h2 class="list-group-title">{{item.title.slice(0,1)}}</h2>
				<ul>
					<li class="list-group-item" v-for="item in item.items" @click="selectItem(item)">
			            <img class="avatar" width="50px" v-lazy="item.image">
			            <span class="name">{{item.name}}</span>
		            </li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut">
	      <ul ref="listShortcut"  @touchstart.prevent="touchstart" @touchmove.prevent.stop="touchmove">
	        <li class="item"  v-for="(item,index) in Listview" :data-index="index" :class="{current:index==currentIndex}">
	        	{{item.title.slice(0,1)}}
	        </li>
	      </ul>
    	</div>
    	<div class="list-fixed" v-show="fixedTitle" ref="listFixed">
    		<p class="fixed-title">{{fixedTitle}}</p>
    	</div>
    	<div class="loading-container" v-show="!Listview.length">
    		<load>	
    		</load>
    	</div>
	</scroll>
</template>

<script>
  import Scroll from 'src/base/scroll/scroll.vue'
  import {getAttrbuteData} from 'common/js/dom.js'
  import Load from 'src/base/loading/loading.vue'
	
  const liHight=18
  const iftrans=30
  export default {
  	data(){
  		return {
  			currentIndex:0,
  			scollY:0,
  			differ:0
  		}
  	},
  	props:{
		Listview:{
			type:Array,
			default:null
		}		
  	},
  	created(){
  		this.touch={}
  	},
  	computed: {
		fixedTitle(){
			if(this.scollY>=0){
				return 
			}
			return this.Listview[this.currentIndex]?this.Listview[this.currentIndex].title.slice(0,1):''
		}
  	},
  	methods:{
  		touchstart(e){
  			let target =e.target
  			this.currentIndex=getAttrbuteData(target,'index')
  			this.touch.fristTouch=e.touches[0].clientY
  			this.touch.fristIndex=this.currentIndex
  			this.scrollToElement(this.$refs.listGroup[this.currentIndex],0)
  		},
  		touchmove(e){
  			let target =e.touches[0]
  			this.touch.endTouch=e.touches[0].clientY
  			this.currentIndex =this.getRangeNum(((this.touch.endTouch-this.touch.fristTouch)/liHight|0) +parseInt(this.touch.fristIndex))
  			this.scrollToElement(this.$refs.listGroup[this.currentIndex],0)
  		},
  		scrollToElement(el,time){
  			this.$refs.listview.scrollToElement(el,time)
  		},
  		getRangeNum(num){
  			let Num =parseInt(num)
  			return Num>22?22:(Num<0?0:Num)
  		},
	    scroll(pos){
	    	this.scollY=pos.y
	    },
	    getElementLeng(){
	    	let childs=this.$refs.listGroup
	    	let hight=0
	    	this.listHtight=[]
	    	let childsLen=childs.forEach(item=>{
	    		hight+=item.clientHeight
	    		this.listHtight.push(hight)
	    	})
	    	this.len=this.listHtight.length
	    },
	    selectItem(item){
	    	this.$emit('click',item)
	    }
  	},

  	watch:{
  		scollY(newY){  //newY为变化数据
  			//如果大小于0
  			if(-newY<=this.listHtight[0]){
  				this.differ=this.listHtight[0]+newY
  				this.currentIndex=0
  				return
  			}
  			//中间
  			for(let i=0;i<this.len;i++){
  				let height1=this.listHtight[i]
  				let height2=this.listHtight[i+1]
  				if(height1<=-newY&&-newY<height2){
  					this.currentIndex=i+1
  					this.differ=height2+newY
  					return 
  				}
				
  			}
  		},
  		differ(newval){
  			let transHeight=newval-iftrans>0?0:newval-iftrans
			this.$refs.listFixed.style.transform=`translate3d(0px,${transHeight}px,0px)`
  		},
  		Listview(){
  			setTimeout(()=>{
				this.getElementLeng()
			},20)
  		}
  	},
    components:{
      Scroll,
      Load
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>