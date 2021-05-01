import React from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
   legend:{
     display: false,
   },
   elements:{
     point:{
       radius:0,
     },
   },
   maintainAspectRatio:false,
   tooltips:{
     mode:"index",
     intersept:false,
     callbacks:{
       label: function(tooltipItem, data){
         return numeral(tooltipItem.value).format("+0,0")
       },
     },
   },
   scales:{
     xAxes:{
       type:"time",
       time:{
         format:"MM/DD/YY",
         tooltipFormat:"ll",
       },
     },
   },
   yAxes:{

       gridLines:{
         display:false,
       },
       ticks:{
         callback:function(value, index, values){
           return numeral(value).format("0a");
         },
       },

   },
};
const buidChartData = (data, casesType='cases') => {
  let chartData = [];
  let lastDataPoint;
  for(let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x:date,
        y:data[casesType][date] - lastDataPoint
      }
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  };
  return chartData;

};


function LineGraph() {
  const [data, setData]=useState({});

  useEffect(()=>{
    const fetchData = async()=>{
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response)=> {
          return response.json();
        })
        .then((data => {
           let chartData = buildChartData(data, "cases");
           setData(chartData);

         });
    };
    fetchData();
  },[]);


  return (
    <div>
    {data?.length > 0 && (
      <Line
        options={options}
        data={{
          datasets:[{
            backgroudColor:"rgba(284, 16, 50, 0)",
            borderColor:"#cc1034",
            data:data,
          }]}}; />
    )}

    </div>
  )
}

export default LineGraph;
