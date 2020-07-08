
const oracledb = require('oracledb')
const config = {
  user: 'BTBI',
  password: 'BTBI',
  connectString: '192.168.1.212:1521/BTDB.domain'
}


async function getDashboard(callback) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    var strSql = ""

    var grh1Data =[];
    //乗降グラフデータ取得
    const result = await conn.execute(
      'select * from V_ROUTE_CNT_EXPANSION'
    )
    var grh1Data =[];

    for(let i=0; i<=result.length;i++){
      //オブジェクトに変数投入
      row = result[i];
      var dash ={id: `widgetChart${i}`,
      labels: [row.day1,row.day2,row.day3,row.day4,row.day5,row.day6,row.day7],
      data: [row.DAY1_COUNT,row.DAY2_COUNT,row.DAY3_COUNT,row.DAY4_COUNT,row.DAY5_COUNT,row.DAY6_COUNT,row.DAY7_COUNT,],
      route_name: row.ROUTE_NAME,
      capcnt:row.DAY1_COUNT};
      //レコードから生成したオブジェクトをグラフデータ配列に追加
      grh1Data.push(dash);
    }
    //売上実績データ取得
    const result2 = await conn.execute(
      'select * from V_ROUTE_AMOUNT_EXPANSION'
    )
    var label=[]
    for (i=1; i<=31; i++){
      label.push(i);
    }

    var grh2Data = {id:'trafficChart',
                    label:label,
                    month:result2[0].T_MONTH,
                    datacash:[result2[0].day01,result2[0].day02,result2[0].day03,result2[0].day04,result2[0].day05,result2[0].day06,result2[0].day07,result2[0].day08,result2[0].day09,result2[0].day10,result2[0].day11,result2[0].day12,result2[0].day13,result2[0].day14,result2[0].day15,result2[0].day16,result2[0].day17,result2[0].day18,result2[0].day19,result2[0].day20,result2[0].day21,result2[0].day22,result2[0].day23,result2[0].day24,result2[0].day25,result2[0].day26,result2[0].day26,result2[0].day27,result2[0].day28,result2[0].day29,result2[0].day30,result2[0].day31],
                    dataIC:[result2[1].day01,result2[1].day02,result2[1].day03,result2[1].day04,result2[1].day05,result2[1].day06,result2[1].day07,result2[1].day08,result2[1].day09,result2[1].day10,result2[1].day11,result2[1].day12,result2[1].day13,result2[1].day14,result2[1].day15,result2[1].day16,result2[1].day17,result2[1].day18,result2[1].day19,result2[1].day20,result2[1].day21,result2[1].day22,result2[1].day23,result2[1].day24,result2[1].day25,result2[1].day26,result2[1].day26,result2[1].day27,result2[1].day28,result2[1].day29,result2[1].day30,result2[1].day31],
                    dataCashamount:result2[0].AMOUNT,
                    dataIcamount:result2[1].AMOUNT,
                    data_type_name_cash:result2[0].DATA_TYPE_NAME,
                    data_type_name_ic:result2[1].DATA_TYPE_NAME,
                  }

    //ヘッダデータ取得と戻り値用オブジェクト成型処理
    const result3 = await conn.execute(
      'select * from V_DASHBOARD'
    );

    var dash ={date:result3[0].T_DATE,
                  TotalProfit1:result3[0].TotalProfit1,
                  TotalProfit2:result3[0].TotalProfit2,
                  TotalCustomer1:result3[0].TotalCustomer1,
                  TotalCustomer2:result3[0].TotalCustomer2,
                  grh1:grh1Data,
                  grh2:grh2Data
                };

    callback(dash);

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}
