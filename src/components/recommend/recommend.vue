<template>
  <div class="recommend" ref="recommend">
   	<scroll class="recommend-content" :data="discList" :scrollY="true" ref="Scroll">
   		<div>
   			<div class="slider-wrapper"  v-if="recommends.length">
   			<better-scroll loop="false" :loop="true">
   				<div v-for="item in recommends">
   					<a v-bind:href="item.linkUrl">
   						<img @load=loadImage v-bind:src="item.picUrl"/>
   					</a>
   				</div>
   			</better-scroll>
   		</div>
   			<div class="recommend-list">
   			<h1 class="list-title">热门推荐歌单</h1>
   				<ul>
            <li class="item" v-for="item in discList">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname">的斯洛伐克射雕和福克斯定居合肥看似简单浩丰科技</p>
              </div>
            </li>
          </ul>
   		</div>
  	 	</div>
   	</scroll>
   	<div class="loading-container" v-if="!discList.length">
   		<loading></loading>
   	</div>
  </div>
  	
</template>

<script type="text/ecmascript-6">
	import Scroll from 'src/base/scroll/scroll.vue'
	import {getRecommend,getDiscList} from 'src/api/recommend.js' 
	import {ERR_OK} from 'src/api/config.js'
	import BetterScroll from 'src/base/silder/betterScroll.vue'
	import Loading from 'src/base/loading/loading.vue'
	
	export default {
		data(){
			return {
				recommends:[],
				discList:[]
			}
		},
		created:function(){
			this._getRecommend()
			this._getDiscList()
		},
		methods:{
			_getRecommend(){
				getRecommend().then((res)=>{
					if(res.code==ERR_OK){
						this.recommends=res.data.slider
					}
				})
			},
			_getDiscList(){
				getDiscList().then(res=>{
					if(res.code==ERR_OK){
						this.discList=res.data.list
					}
				})
			},
			loadImage(){
				if(!this.checkloaded){
					this.$refs.Scroll.refresh()
					this.checkloaded=true
				}
			}
		},
		components:{
			BetterScroll,
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
        	display:flex
        	padding: 0 20px 20px 20px
        	.icon
        		flex 0 0 60px
        		padding-right:20px
        	.text
        		display:flex
        		flex-direction:column
        		flex:1
        		justify-content:center
        		text-overflow:ellipsis
        		.name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)	
</style>