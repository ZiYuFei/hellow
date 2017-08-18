<template>
  <div class="slider" ref="slider">
  		<div class="slider-group" ref="sliderGroup">
		   	<slot></slot>
  		</div>
  		<div class="dots">
  			<span class="dot" v-for="(item,index) in dots" :class="{active:index===currentIndex}" ></span>
  		</div>
  </div>
</template>

<script>
		import {addClass} from  'common/js/dom.js'
		import BSCroll from 'better-scroll'
	
	export default {
		data(){
			return {
				dots:[],
				currentIndex:0
			}
		},
		props:{
			loop:{
				type:Boolean,
				default:true
			},
			autoPlay:{
				type:Boolean,
				default:true
			},
			interval:{
				type:Number,
				default:4000
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.setGroupWidth()
				this.initDots()
				this.initSlider()
				
				if(this.autoPlay){
					this.play()
				}
				window.addEventListener('resize',()=>{
					if(!this.scroll){
						return 
					}
					this.setGroupWidth(true)
					this.scroll.refresh()
				})
			})
		},
		methods:{
			setGroupWidth(isSize){
				let GroupWidth=0
				let sliderWidth= this.$refs.slider.clientWidth   //每个li的宽度
				this.childrens=this.$refs.sliderGroup.children
				for(let i =0,len=this.childrens.length;i<len;i++){
						let children=this.childrens[i]
						addClass(children,'item')
						children.style.width=sliderWidth+'px'
						GroupWidth+=sliderWidth
				}
				if(this.loop&&!isSize){
					GroupWidth+=sliderWidth*2   //无缝轮播多2个图的宽度
				}
				this.$refs.sliderGroup.style.width=GroupWidth+'px'
			},
			initSlider(){
				this.scroll =new BSCroll(this.$refs.slider,{
					scrollX: true,
					scrollY:false,
					momentum:false,
					snapLoop:this.loop,
					snapThreshold:0.3,
					snapSpeed:400,
					snap:true,
					click:true
				})
				this.scroll.on('scrollEnd',()=>{
					this.currentIndex=(this.loop?this.scroll.getCurrentPage().pageX-1:this.scroll.getCurrentPage().pageX)
					clearTimeout(this.timer)
					if(this.autoPlay){
						this.play()
					}
				})
			},
			initDots(){
				this.dots=new Array(this.childrens.length)
			},
			play(){
				let pageIndex=this.currentIndex+1
				if(this.loop){
					pageIndex+=1
				}
				this.timer=setTimeout(()=>{
					this.scroll.goToPage(pageIndex,0,400)
				},this.interval)
			}
		},
		destoryed(){
			clearTimeout(this.timer) //清除定时器
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.slider
		overflow:hidden
		position:relative
		.slider-group
			height:100%
			.item
				float:left
				a
					width:100%
				img
					width:100%
		.dots
			position:absolute
			right:0
			left:0
			bottom:12px
			font-size:0
			text-align:center
			.dot
				display:inline-block
				width: 8px
				height:8px
				display:inline-block
				background:red
				border-radius:50%
				margin: 0px 4px;
				&.active
					width:20px
					background:#fff
					border-radius:5px
</style>