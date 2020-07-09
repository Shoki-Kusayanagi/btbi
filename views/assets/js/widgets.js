( function ( $ ) {
    "use strict";


    // Counter Number
    $('.count').each(function () {
        console.log('test')
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    grh1.forEach(item => {
      var ctx = document.getElementById( item.id );
      ctx.height = 150;
      var myChart = new Chart( ctx, {
          type: 'line',
          data: {
              labels: item.labels,
              type: 'line',
              datasets: [ {
                  data: item.data,
                  label: '乗車人数',
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255,255,255,.55)',
              }, ]
          },
          options: {

              maintainAspectRatio: false,
              legend: {
                  display: false
              },
              responsive: true,
              scales: {
                  xAxes: [ {
                      gridLines: {
                          color: 'transparent',
                          zeroLineColor: 'transparent'
                      },
                      ticks: {
                          fontSize: 2,
                          fontColor: 'transparent'
                      }
                  } ],
                  yAxes: [ {
                      display:false,
                      ticks: {
                          display: false,
                      }
                  } ]
              },
              title: {
                  display: false,
              },
              elements: {
                  line: {
                      borderWidth: 1
                  },
                  point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4
                  }
              }
          }
      });
    });


} )( jQuery );
