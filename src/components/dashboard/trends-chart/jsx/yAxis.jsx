import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

class YAxisComponent extends React.Component{
	constructor(props){
		super(props);
		this.maxData = d3.max(this.props.newData);
		this.makeYaxis = this.makeYaxis.bind(this);
	}

	componentWillMount() {
		
	}	


	makeYaxis(d,i){

		var tickHeight = this.props.barHeight - this.props.barHeight*i/5;
		return (
				<g className = "tick" key={i} transform={`translate(0,${tickHeight})`}>
					<line x2="-6" y2="0"></line>
					<text dy=".32em" x="-9" y="0" styles={"textAnchor: end"}>{d}</text>
				</g>
			)
	}

	render(){
		var arr = [],i=0,ticks=0;
		var maxData = d3.max(this.props.newData);
		var divlength = maxData/5;
		while(i<=maxData){
			ticks++;			
			arr.push(i);
			i+=divlength;
		}
		
		
		var yScale = d3.scaleLinear()
					  .domain([maxData,0])
					  .range([0,(this.props.barHeight)]);
		var vAxis = d3.axisLeft()
					  .scale(yScale)
					  .ticks(4);
			

		return (
				<g transform = "translate(30,45)" >
					{arr.map(this.makeYaxis)}
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
		barWidth : state.barChartReducers.barWidth
	};
}

export default connect(mapStateToProps)(YAxisComponent);
