
export default function barChartReducers(state={
	responseData : {},
	fetching : false,
	fetched : false,
	error : null,
	newData : [],
  	colorNames : ["RED","GREEN","AT RISK"],
    colorData : ["#f26945","#1ec4c2","#fdd04f","fff","000"],
    currentYear : 0,
    Qs : ["Q1","Q2","Q3","Q4"],
    barHeight : 210,
    barWidth : 800,
    qData : []
}, action){
	switch (action.type) {
	  case 'FETCH_DATA':{
	  	let newState = Object.assign({}, state, {fetching:true});
  		return newState				
	  }
	  case 'FETCH_DATA_SUCCESS':{
		let newState = Object.assign({}, state, {fetching : false,
				fetched : true,
				responseData : action.payload,
				currentYear : action.currentYear,
				newData : action.newdata})
		return newState
	  }
	  case 'FETCH_DATA_FAILURE':{
		let newState = Object.assign({}, state, {fetching : false,
				fetched : true,
				error : action.payload})
		return newState
		}
	case 'SET_BAR_DATA':{
		let newState = Object.assign({}, state, {qData : action.qData})
		return newState;
	}
  }

  return state;
}