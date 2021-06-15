import Highcharts from "highcharts";

const HighChart = ({id, title, yAxis,xAxis, data}) => {
    Highcharts.chart(id, {

        title: {
            text: title
        },
        //
        // subtitle: {
        //     text: 'Doanh thu từng quý'
        // },

        yAxis: {

            title: {
                text: yAxis
            }
        },

        xAxis: {
            // accessibility: {
            //
            //     rangeDescription: xAxis
            // },
            categories:xAxis
        },

        legend: {
            layout: 'vertical',
            // align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                // enableMouseTracking: false
            },
            series: {
                label: {
                    connectorAllowed: false
                },
                // pointStart: 1
            }
        },

        // series: [{
        //     name: 'Installation',
        //     data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        // }],
        series: data,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}
export default HighChart