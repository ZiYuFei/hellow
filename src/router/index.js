import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank.vue'
import Recommend from 'components/recommend/recommend.vue'
import Search from 'components/search/search.vue'
import Singer from 'components/singer/singer.vue'
import SingerDetail from 'components/singer-detail/singer-detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
    	path: '/rank',
    	name: 'rank',
    	component: Rank
    },
    {
    	path: '/recommend',
    	name: 'recommend',
    	component: Recommend
    },
    {
    	path: '/search',
    	name: 'search',
    	component: Search
    },
    {
    	path: '/singer',
    	name: 'singer',
    	component: Singer,
    	children:[
    	{
    		path:':id',
    		component:SingerDetail
    	}]
    }
  ]
})
