import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import RectComponent from './rect.jsx';
import LegendComponent from './legend.jsx';
import YAxisComponent from './yAxis.jsx';
import XAxisComponent from './xAxis.jsx';
import {getInitialData}  from '../../../../actions/barChartActions.js';



class BarChartComponent extends React.Component {
	
	
	componentWillMount() {
		//make the axios call
		this.props.getInitialData();
		
	}
		

	componentDidMount() {

		}	
			
	changeData(e){
		e.preventDefault();

	}
	
	
	
	render() {

		return (
			 <div id="bar-chart">

			 	<input type="button" className="year-btn" value="<" onClick={(this.changeData).bind(this)} />
				<span className="year-display">{this.props.currentYear}</span>
			 	<LegendComponent colorNames = {this.props.colorNames} colorData = {this.props.colorData} />
				 <svg height="100%" width="100%">
				 <RectComponent barHeight={this.props.barHeight} barWidth={this.props.barWidth} Qs={this.props.Qs} newData={this.props.newData} colorData = {this.props.colorData} />
				 
				 <YAxisComponent barHeight={this.props.barHeight} barWidth={this.props.barWidth} newData={this.props.newData}  Qs={this.props.Qs}/>
			
				 
				 <XAxisComponent barHeight={this.props.barHeight} barWidth={this.props.barWidth} newData={this.props.newData} Qs={this.props.Qs}/>
				 
				 </svg>
			</div>
			);

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
		barWidth : state.barChartReducers.barWidth
	};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
			getInitialData:getInitialData
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BarChartComponent)
