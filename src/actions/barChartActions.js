import axios from 'axios';

export function getInitialData(){
  
  return function(dispatch){
    axios.get("http://localhost:3000/trends/2015")
      .then(
        (response)=>{

          var newdata = [];
          var data1,currentYear;
          data1 = response.data;
          currentYear = data1.current;
          for(var key in data1.yearData){
            for(var key1 in data1.yearData[key])
              newdata.push(data1.yearData[key][key1]);
          }

        dispatch({type:"FETCH_DATA_SUCCESS",
         payload : response.data,
        currentYear : currentYear,
        newdata : newdata})
      })
      .catch((err)=>{
        dispatch({type:"FETCH_DATA_FAILURE", payload: err})
      })
      
  }
}

export function setBarData(qData){
  return {type : 'SET_BAR_DATA',
               qData : qData}    
}