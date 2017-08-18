import * as types from './mutation-types.js'

export  const selectPlay=function({commit,state},{list,index}){
	commit(types.SET_SINGERId,list)
}