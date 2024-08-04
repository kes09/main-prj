export default{
  async contactCoach(context,payload){
    const newRequests = {
      userEmail:payload.email,
      message:payload.message
    };
    const response = await fetch(
      `https://test-project-3b7ac-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,{
      method:'POST',
      body: JSON.stringify(newRequests)
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request');
      throw error;
    }

    newRequests.id = responseData.name;
    newRequests.coachId = payload.coachId;

    context.commit('addRequests',newRequests);
  },
  async fetchRequests(context){
    const coachId= context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://test-project-3b7ac-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+
       token
      );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch request');
      throw error;
    }
    const requests =[];

    for (const key in responseData) {
      const request = {
        id:key,
        coachId:coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }
    context.commit('setRequests',requests);
  }
};