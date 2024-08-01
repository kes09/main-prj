
export default{
  requests(state,_getters,_rootState,rootGetters){
    const coachId = rootGetters.userId;
    console.log(state.requests);
    return state.requests.filter(req => req.coachId === coachId);
  },
  hasRequests(_state,getters){
   return getters.requests && getters.requests.length > 0;
  }
};