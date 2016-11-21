import * as d3 from 'd3';

var makeChart = (data1) => {
	var qData = [];
  var newData = [];
  var colorData = [];
  var currentYear = data1.current;

  for(var key in data1.yearData){
    qData.push(key);
  }
  for(var color in data1.yearData['Q1']){
    colorData.push(color);
  }
  for(var key0 in data1.yearData){
    for(var key1 in data1.yearData[key0])
      newData.push(data1.yearData[key0][key1]);
  }

  var len = newData.length,
  divof3 = len/3,
  barHeight=210,
  barWidth=800,
  count = 0,
  valuePosX,
  valuePosY;

  var xScale = d3.scaleBand()
  .domain(qData)
  .rangeRound([0,len*20+divof3*15]);

  var yScale = d3.scaleLinear()
  .domain([d3.max(newData),0])
  .range([0,barHeight]);

  var vAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(4); 

  var hAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(4);

  var tooltip = d3.select('#bar-chart')
  .append('span')
  .attr('class','tooltip')
  .style('position','absolute');

  d3.select('.legend')
  .selectAll('span')
  .attr('class','box')
  .data(colorData)
  .enter()
  .append('div')
  .attr('x',function(d,i){
    return 50*i+200;
  })
  .attr('y',30)
  .append('span')
  .attr('class','box')
  .style('background-color',function(d,i){
    if(i%3==0){
      return '#f26945';
      
    }
    else if(i%3==1){
      return '#1ec4c2';
      
    }
    else{
      return '#fdd04f';
      
    }
  });

  d3.selectAll('.legend div').data(colorData).append('span').html(function(d,i){
    return d;

  });

  var chart = d3.select('#bar-chart')
  .append('svg')
  .attr('height', '100%')
  .attr('width', '100%');


  d3.select('.year-display')
  .html(currentYear);

  var chart0 = chart;

  var addAnimation = chart.append('g')
  .selectAll( 'rect' )
  .data( newData )
  .enter()
  .append( 'rect');

  var chart1 = addAnimation;


  chart1.attr( 'x', function(d,i){
    if(i%3==0){
      count++;
      
    }
    return i*20 +15*count;
  })
  .attr( 'width', 15) 
  .attr( 'fill', function(d,i){
    if(i%3==0){
      return '#f26945';
      
    }
    else if(i%3==1){
      return '#1ec4c2';
      
    }
    else{
      return '#fdd04f';
      
    }
  })
  .attr( 'height', 0 )
  .attr( 'y', 0 )
  .on('mouseover',function(d,i){

   valuePosX = parseInt(this.getAttribute('x'));
   valuePosY = parseInt(this.getAttribute('y'));

   d3.select(this)
   .transition().duration(800)
   .style('opacity',0.5);

   tooltip.html(d)
   .transition()
   .style('left', valuePosX + 'px')
   .style('top', valuePosY + 'px');
  
   tooltip.append('span')
   .attr('class','tooltip-style');

 })
  .on('mouseout',function(d){
    tooltip.html('');

    d3.select(this)
    .transition()
    .style('opacity',1);
    
  })
  .attr('transform','translate(30,50)');
  

  addAnimation.transition()
  .delay(function(d,i){
    return i*100;
  })
  .attr('height',function(d){
    return (d/d3.max(newData)*barHeight);
  })
  .attr('y',function(d){
    return barHeight - (d/d3.max(newData)*barHeight);
  });

  var vRuler = d3.select('svg')
  .append('g')
  .attr('transform','translate(30,50)');

  var hRuler = d3.select('svg')
  .append('g')
  .attr('transform','translate(30,260)');

  var colorRuler = d3.select('svg')
  .append('g')
  .attr('transform','translate(330,25)');

  vAxis(vRuler);

  hAxis(hRuler);


  vRuler.selectAll('path')
  .style('fill','none');

  hRuler.selectAll('path')
  .style('fill','none');

};

export default makeChart;


