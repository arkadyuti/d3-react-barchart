import React from 'react';

import BarChartComponent from "./BarChart.jsx";
import SkillChartComponent from "./SkillChart.jsx";
import DonutChartComponent from "./DonutChart.jsx";
import {getInitialData}  from '../../../../actions/barChartActions.js';
import './bootstrap.scss';


class LayoutComponent extends React.Component {

	componentWillMount() {
	}


   render() {

      return (
      	<section className="charts-container">
      	<div>
			<div className="growth-chart col-sm-6">
				<div className="chart-name">GROWTH</div>
				<div className="chart-wrapper">
						{<BarChartComponent />}
				</div>
			</div>
			<div className="skill-based-chart col-sm-6">
				<div className="chart-name">Skill Based Chart for Projects</div>
				<div className="chart-wrapper">
					{<SkillChartComponent />}
				</div>
			</div>
			</div>
			<div className="status-chart col-sm-12">
				<div className="chart-name">Status</div>
				<div className="chart-wrapper">
					{<DonutChartComponent />}
				</div>
			</div>
			<div className="clear-both"></div>
		</section>
      );
   }
}

export default LayoutComponent;


