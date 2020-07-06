
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


    //ヘッダデータ取得と戻り値用オブジェクト成型処理
    var retdata ={date:'',
                  TotalProfit1:0,
                  TotalProfit2:0,
                  TotalCustomer1:0,
                  TotalCustomer2:0,
                  grh1:grh1Data,
                  grh2:grh2Data
                  }
    return retdata
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}
