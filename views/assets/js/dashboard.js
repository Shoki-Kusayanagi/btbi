( function ( $ ) {
    "use strict";


// const brandPrimary = '#20a8d8'
const brandSuccess = '#4dbd74'
const brandInfo = '#63c2de'
const brandDanger = '#f86c6b'

function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  return result
}

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

    var elements = 27
    var data1 = []
    var data2 = []
    var data3 = []

    for (var i = 0; i <= elements; i++) {
      data1.push(random(50, 200))
      data2.push(random(80, 100))
      data3.push(65)
    }


    //Traffic Chart
    var ctx = document.getElementById( "trafficChart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh2.label,
            datasets: [
            {
              label: grh2.data_type_name_cash,
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh2.datacash
          },
          {
              label: grh2.data_type_name_ic,
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh2.dataIC
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(1600000 / 5),
                        max: 1600000
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );

    //Traffic Chart
    var ctx = document.getElementById( "trafficChart2" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh5.label,
            datasets: [
            {
              label: grh5.data_type_name_cash,
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh5.datacash
          },
          {
              label: grh5.data_type_name_ic,
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh5.dataIC
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(300000 / 5),
                        max: 300000
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );


    //Traffic Chart
    var ctx = document.getElementById( "trafficChart_TYO_NRT_H" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh7.label,
            datasets: [
            {
              label: grh7.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh7.dataKudari
          },
          {
              label: grh7.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh7.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(200 / 5),
                        max: 200
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );

    var ctx = document.getElementById( "trafficChart_BAY_H" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh10.label,
            datasets: [
            {
              label: grh10.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh10.dataKudari
          },
          {
              label: grh10.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh10.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(80 / 5),
                        max: 80
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );


    var ctx = document.getElementById( "trafficChart_CHIHARA_H" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh12.label,
            datasets: [
            {
              label: grh12.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh12.dataKudari
          },
          {
              label: grh12.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh12.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(80 / 5),
                        max: 80
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );

    var ctx = document.getElementById( "trafficChart_TYO_NRT_A" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh8.label,
            datasets: [
            {
              label: grh8.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh8.dataKudari
          },
          {
              label: grh8.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh8.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(100 / 5),
                        max: 100
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );

    var ctx = document.getElementById( "trafficChart_BAY_A" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh11.label,
            datasets: [
            {
              label: grh11.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh11.dataKudari
          },
          {
              label: grh11.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh11.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(100 / 5),
                        max: 100
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );

    var ctx = document.getElementById( "trafficChart_TYO_NRT_N" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh9.label,
            datasets: [
            {
              label: grh9.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh9.dataKudari
          },
          {
              label: grh9.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh9.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(80 / 5),
                        max: 80
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );

    var ctx = document.getElementById( "trafficChart_CHIHARA_N" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh13.label,
            datasets: [
            {
              label: grh13.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh13.dataKudari
          },
          {
              label: grh13.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh13.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(80 / 5),
                        max: 80
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );

    //Traffic Chart
    var ctx = document.getElementById( "trafficChart_TYO_NRT" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh14.label,
            datasets: [
            {
              label: grh14.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh14.dataKudari
          },
          {
              label: grh14.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh14.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(400 / 5),
                        max: 400
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );

    var ctx = document.getElementById( "trafficChart_BAY" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh15.label,
            datasets: [
            {
              label: grh15.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh15.dataKudari
          },
          {
              label: grh15.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh15.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(150 / 5),
                        max: 150
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );


    var ctx = document.getElementById( "trafficChart_CHIHARA" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: grh16.label,
            datasets: [
            {
              label: grh16.data_type_name_Kudari,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh16.dataKudari
          },
          {
              label: grh16.data_type_name_Nobori,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: grh16.dataNobori
          }
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(150 / 5),
                        max: 150
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );




} )( jQuery );
