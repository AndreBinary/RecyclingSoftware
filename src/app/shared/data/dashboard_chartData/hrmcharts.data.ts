
export let TotalEmployeesChartData: any = {
    series: [{
        data: [98, 110, 80, 145, 105, 112, 87, 148, 102]
      }],
      chart: {
        height: 50,
        type: 'area',
        fontFamily: 'Montserrat, sans-serif',
        foreColor: '#5d6162',
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [1.5],
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.5,
          opacityTo: 0.2,
          stops: [0, 60],
          colorStops: [
            [
              {
                offset: 0,
                color: 'var(--primary01)',
                opacity: 1
              },
              {
                offset: 60,
                color: 'var(--primary01)',
                opacity: 1
              }
            ],
          ]
        },
      },
      title: {
        text: undefined,
      },
      grid: {
        borderColor: 'transparent',
      },
      xaxis: {
        crosshairs: {
          show: false,
        }
      },
      colors: ["var(--primary-color)"],
};
export let OnLeaveChartData: any = {
    series: [{
        data: [98, 110, 80, 145, 105, 112, 87, 148, 102]
      }],
      chart: {
        height: 50,
        type: 'area',
        fontFamily: 'Montserrat, sans-serif',
        foreColor: '#5d6162',
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [1.5],
      },
      title: {
        text: undefined,
      },
      grid: {
        borderColor: 'transparent',
      },
      xaxis: {
        crosshairs: {
          show: false,
        }
      },
      colors: ["rgb(215, 124, 247)"],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.5,
          opacityTo: 0.2,
          stops: [0, 60],
          colorStops: [
            [
              {
                offset: 0,
                color: 'rgba(215, 124, 247, 0.1)',
                opacity: 1
              },
              {
                offset: 60,
                color: 'rgba(215, 124, 247, 0.1)',
                opacity: 1
              }
            ],
          ]
        },
      },
}

export let NewEmployeesChartData: any = {
    series: [{
        data: [98, 110, 80, 145, 105, 112, 87, 148, 102]
      }],
      chart: {
        height: 50,
        type: 'area',
        fontFamily: 'Montserrat, sans-serif',
        foreColor: '#5d6162',
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
     
      title: {
        text: undefined,
      },
      grid: {
        borderColor: 'transparent',
      },
      xaxis: {
        crosshairs: {
          show: false,
        }
      },
      colors: ["rgb(12, 215, 177)"],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.5,
          opacityTo: 0.2,
          stops: [0, 60],
          colorStops: [
            [
              {
                offset: 0,
                color: 'rgba(12, 215, 177, 0.1)',
                opacity: 1
              },
              {
                offset: 60,
                color: 'rgba(12, 215, 177, 0.1)',
                opacity: 1
              }
            ],
          ]
        },
      },
      stroke: {
         curve: 'smooth',
        width: [1.5],
      }
}
export let ResignedEmployeesChartData: any = {
    series: [{
        data: [98, 110, 80, 145, 105, 112, 87, 148, 102]
      }],
      chart: {
        height: 50,
        type: 'area',
        fontFamily: 'Montserrat, sans-serif',
        foreColor: '#5d6162',
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [1.5],
      },
      title: {
        text: undefined,
      },
      grid: {
        borderColor: 'transparent',
      },
      xaxis: {
        crosshairs: {
          show: false,
        }
      },
      colors: ["rgb(254, 124, 88)"],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.5,
          opacityTo: 0.2,
          stops: [0, 60],
          colorStops: [
            [
              {
                offset: 0,
                color: 'rgba(254, 124, 88, 0.1)',
                opacity: 1
              },
              {
                offset: 60,
                color: 'rgba(254, 124, 88, 0.1)',
                opacity: 1
              }
            ],
          ]
        },
      },
 }
export let SubscriptionChartData: any = {
        series: [
            {
              name: "Starter",
              data: [44, 55, 41, 42, 22, 43, 21],
            },
            {
              name: "Pro",
              data: [33, 21, 32, 37, 23, 32, 47],
            },
            {
              name: "Premium",
              data: [30, 25, 36, 30, 45, 35, 64],
            },
          ],
          chart: {
            type: "bar",
            height: 345,
            fontFamily: "Montserrat, sans-serif",
            foreColor: "#d4d7d9",
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: true,
            },
          },
          grid: {
            borderColor: "#f1f1f1",
            strokeDashArray: 2,
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
            theme: "dark",
            shared: true,
            intersect: false,
          },
          colors: ["var(--primary08)", "var(--primary05)", "var(--primary02)"],
          labels: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
          ],
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 2,
            },
          },
          yaxis: {
            show: false
          },
          xaxis: {
            show: false,
      
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false
            }
          }
    }
        export let WorkingChartData: any = { 
            series: [44, 55, 67],
    chart: {
      height: 240,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
            offsetY: 0
          },
          value: {
            fontSize: '14px',
            offsetY: 5
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function () {
              return 249
            }
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    },
    grid: {
        padding: {
            bottom: -10,
            top: -10
        }
    },
    colors: ["var(--primary-color)", "rgba(215, 124, 247, 1)", "rgba(12, 215, 177, 1)"],
    labels: ['From Office', 'From Home', 'Remote'],
        }