<template>
	<transition  name="slide">
		<music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {mapGetters} from 'vuex'

  export default {
  	created(){
   		this._getDetail()
   	},
  	computed:{
		title() {
	        return this.getSingerListId.name
	      },
	      bgImage() {
	        return this.getSingerListId.image
	      },
   		...mapGetters([
   			'getSingerListId'
   		])
   	},
   	data() {
      return {
        songs: []
      }
    },
     created() {
      this._getDetail()
    },
   	methods:{
   		 _getDetail() {
	        if (!this.getSingerListId.id) {
	          this.$router.push('/singer')
	          return
	        }
	        getSingerDetail(this.getSingerListId.id).then((res) => {
	          if (res.code === ERR_OK) {
	            this.songs = this._normalizeSongs(res.data.list)
	          }
	        })
	      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
          	console.log(createSong(musicData))
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
   	},
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.detail
		background :#222
		position:fixed
		top:0
		left:0
		bottom:0
		right:0
		z-index: 99
		transform: translate(0%)
		transition:transform 0.4s
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s
	
	.slide-enter,.slide-leave-to
		transform:translate3d(100%,0,0)
</style>