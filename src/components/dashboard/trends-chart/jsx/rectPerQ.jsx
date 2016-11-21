import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class RectPerQComponent extends React.Component{

	constructor(props){
		super(props);
		this.eachRect = this.eachRect.bind(this);
		this.showToolTip = this.showToolTip.bind(this);
		this.hideToolTip = this.hideToolTip.bind(this);
		this.width = 15;
		this.getX = 0;
		this.getY = 0;
		this.dValue = 0;
		this.i = 0;
		this.disp = "none";
		
	}


	showToolTip(e){
		e.preventDefault();
		
		var valuePosX,valuePosY,dvalue,group;
		group = this.group*50; 
		valuePosX = parseInt(e.target.getAttribute("x"));
		valuePosY = parseInt(e.target.getAttribute("y"));
		dvalue = e.target.getAttribute("d"); 
		
		this.getX = valuePosX;
		this.getY = valuePosY;
		this.dValue = dvalue;
		this.i = group;
		this.disp = "inline-block";
		

	}

	hideToolTip(e){
		e.preventDefault();
		this.width = 15;
		this.getX = 0;
		this.getY = 0;
		this.dValue = 0;
		this.i = 0;
		this.disp = "none";
	}

	eachRect(d,i){
		var barHeight=this.props.barHeight;
		var coor = parseInt((this.props.group)*20+50);
		var maxData = d3.max(this.props.newData);
		var height = d/(maxData)*barHeight;
		var y = barHeight - height;
		//console.log('d -> ',d)

		this.group = this.props.group;
		return(
			<rect key={i} x={coor+i*15} width={this.width} fill={this.props.colorData[i]} y={y} height={height} onMouseOver={this.showToolTip} onMouseOut={this.hideToolTip} d={d}>
			</rect> 
			)
	}



	render(){
		if(this.props.qData.length===0 || this.props.qData[0].length===0){
			return null
		}

		var xcoorOfGroup = (this.props.group)*50;
		var grp = this.props.group;
		var xcoorOfTooltip = (this.getX)+(this.i);
		var xRect = xcoorOfTooltip+15;
		var yRect = (this.getY)+50;
		var points = ""+xRect+" "+yRect+","+(xRect+10)+" "+yRect+","+xRect+" "+(yRect+10)+"";
		console.log('qdata new -> ',this.props.qData[grp]);
		var mapping = this.props.qData[grp];
		
		return(
			<g>
				<g transform={`translate(${xcoorOfGroup},50)`} >
					{mapping.map(this.eachRect)}
					
				</g>
				<rect  width={25} height={20}  x = {xcoorOfTooltip} y = {this.getY+30} fill="black" style={{display : this.disp}} />
				<text   x = {xcoorOfTooltip+12} y = {this.getY+45} fill="white" style={{display : this.disp}} alignmentBaseline="middle" textAnchor="middle" >{this.dValue}</text>
				<polygon points={points} style={{display : this.disp}} fill="black" />
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

export default connect(mapStateToProps)(RectPerQComponent);
