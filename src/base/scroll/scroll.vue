<template>
  <div class="scroll" ref="scroll">
	   	<slot></slot>
  </div>
</template>

<script>
	import BSCroll from 'better-scroll'
	
	export default {
		props:{
			scrollX:{
				type:Boolean,
				default:false
			},
			scrollY:{
				type:Boolean,
				default:false
			},
			data:{
				type:Array,
				default:null
			},
			isBindScroll:{
				type:Boolean,
				default:false
			},
			probeType:{
				type:Number,
				default:3
			}
			
		},
		mounted(){
			setTimeout(()=>{
				this.initSlider()
			},20)
		},
		methods:{
			initSlider(){
				if(!this.$refs.scroll){
					return
				}
				this.scroll =new BSCroll(this.$refs.scroll,{
				scrollX: this.scrollX,
				scrollY: this.scrollY,
				probeType:this.probeType,
				click:true
				})
				
				if(this.isBindScroll){
					let _this=this
					this.scroll.on('scroll',(pos)=>{
						_this.$emit('scroll',pos)
					})
				}
			},
			refresh(){
				this.scroll&&this.scroll.refresh()
			},
			scrollToElement(el,time){
				this.scroll&&this.scroll.scrollToElement(el,time)
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this.refresh()
				},20)
			}
		}
	}
</script>

<style>
</style>