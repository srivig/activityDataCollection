new Chartist.Pie('.ct-chart', {
  labels:['sleep','work','workout','games'],
  series: [40, 30, 10, 20]
}, {
  donut: true,
  donutWidth: 60,
  startAngle: 360,
  total: 100,
  showLabel: true,
  width: '300px',
  height: '300px'
});
