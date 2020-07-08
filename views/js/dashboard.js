
const oracledb = require('oracledb')
const config = {
  user: 'BTBI',
  password: 'BTBI',
  connectString: '192.168.1.212:1521/BTDB.domain'
}


module.exports = async function getDashbord () {
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
    for i=1; i<=31; i++){
      label.push(i);
    }

    var grh2Data = {id:'trafficChart',
                    label:label,
                    month:result2[0].T_MONTH,
                    datacash:[result2[0].01,result2[0].02,result2[0].03,result2[0].04,result2[0].05,result2[0].06,result2[0].07,result2[0].08,result2[0].09,result2[0].10,result2[0].11,result2[0].12,result2[0].13,result2[0].14,result2[0].15,result2[0].16,result2[0].17,result2[0].18,result2[0].19,result2[0].20,result2[0].21,result2[0].22,result2[0].23,result2[0].24,result2[0].25,result2[0].26,result2[0].26,result2[0].27,result2[0].28,result2[0].29,result2[0].30,result2[0].31],
                    dataIC:[result2[1].01,result2[1].02,result2[1].03,result2[1].04,result2[1].05,result2[1].06,result2[1].07,result2[1].08,result2[1].09,result2[1].10,result2[1].11,result2[1].12,result2[1].13,result2[1].14,result2[1].15,result2[1].16,result2[1].17,result2[1].18,result2[1].19,result2[1].20,result2[1].21,result2[1].22,result2[1].23,result2[1].24,result2[1].25,result2[1].26,result2[1].26,result2[1].27,result2[1].28,result2[1].29,result2[1].30,result2[1].31],
                    dataCashamount:[result2[0].AMOUNT,
                    dataIcamount:[result2[1].AMOUNT,
                    data_type_name_cash:[result2[0].DATA_TYPE_NAME,
                    data_type_name_ic:[result2[1].DATA_TYPE_NAME,
                  }

    //ヘッダデータ取得と戻り値用オブジェクト成型処理
    const result3 = await conn.execute(
      'select * from V_ROUTE_AMOUNT_EXPANSION'
    )

    var retdata ={date:'',
                  TotalProfit1:0,
                  TotalProfit2:0,
                  TotalCustomer1:0,
                  TotalCustomer2:0,
                  grh1:grh1Data,
                  grh2:grh2Data
                  }
    return retdata;

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}
