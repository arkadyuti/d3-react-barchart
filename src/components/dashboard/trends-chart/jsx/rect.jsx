import React from 'react';
import * as d3 from 'd3';
import RectPerQComponent from './rectPerQ.jsx';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {setBarData}  from '../../../../actions/barChartActions.js';

class RectComponent extends React.Component{

	 

	constructor(props){
		super(props);
		this.eachRectPerQ = this.eachRectPerQ.bind(this);

	}

	componentWillUpdate() {
		var data = this.props.newData;
		this.maxData = d3.max(data);
		var q1Data = [],q2Data=[],q3Data=[],q4Data=[],qData=[];

		for(var i=0;i<data.length;i++){
			if(i<3){
				q1Data.push(data[i]);
			}
			else if(i>=3 && i<6){
				q2Data.push(data[i]);
			}
			else if(i>=6 && i<9){
				q3Data.push(data[i]);
			}
			else{
				q4Data.push(data[i]);
			}
		}
		
		qData = [q1Data,q2Data,q3Data,q4Data];

		if(this.props.qData.length===0 || this.props.qData[0].length===0){
			this.props.setBarData(qData);
		}

		



	}

	componentDidUpdate() {
		//console.log(this.props.qData);
	}
	

	eachRectPerQ(d,i){
		return(
			<RectPerQComponent key={i} group = {i} Q = {d} /> 
		)

	}


	render(){
		
		return(
			<g>
				{this.props.Qs.map(this.eachRectPerQ)}
			</g>
			)
	}
}

function mapStateToProps(state){
	return{
		data : state.barChartReducers.responseData,
		currentYear : state.barChartReducers.currentYear,
		newData : state.barChartReducers.newData,
		colorNames : state.barChartReducers.colorNames,
		colorData : state.barChartReducers.colorData,
		Qs : state.barChartReducers.Qs,
		barHeight : state.barChartReducers.barHeight,
		barWidth : state.barChartReducers.barWidth,
		qData : state.barChartReducers.qData
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
			setBarData:setBarData
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RectComponent)

