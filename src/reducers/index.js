import { combineReducers } from 'redux';
import counter from './counter';
import barChartReducers from './barChart';

const rootReducer = combineReducers({
  barChartReducers
});

export default rootReducer;
