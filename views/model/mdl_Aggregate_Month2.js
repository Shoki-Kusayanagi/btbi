const oracledb = require('oracledb')
const config = {
  user: 'BTBI',
  password: 'BTBI',
  connectString: '192.168.1.212:1521/BTDB.domain'
}

exports.initData =async function (callback) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    //コンボボックス用データ取得
    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0010' AND NAME_1 IS NOT NULL ORDER BY NAME_1"

    const result = await conn.execute(
      strSql
    )

    var companys = [];

    result.rows.forEach(row =>{
      var company ={id:row[0],
                    name:row[1]
      };
      companys.push(company);
    })

    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0050' AND NAME_1 IS NOT NULL ORDER BY NAME_1"

    const result2 = await conn.execute(
      strSql
    )

    var data_sbt = [];

    result2.rows.forEach(row =>{
      var data_kbn ={id:row[0],
                    name:row[1]
      };
      data_sbt.push(data_kbn);
    })

    var strSql = "Select ROUTE_CD,ROUTE_NAME From M_ROUTE ORDER BY ROUTE_CD"

    const result3 = await conn.execute(
      strSql
    )

    var route_codes = [];

    result3.rows.forEach(row =>{
      var rotute_kbn ={id:row[0],
                    name:row[1]
      };
      route_codes.push(rotute_kbn);
    });



    var initdata= {route_code:route_codes,
                   data_sbt:data_sbt,
                   dataset:'*',
                   s_date:'',
                   e_date:'',
                   initial_Datasbt:'*',
                   initial_Route:'*'
                  };

    callback(initdata);

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
};

exports.getData =async function (where,callback) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    //コンボボックス用データ取得
    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0010' AND NAME_1 IS NOT NULL ORDER BY NAME_1"

    const result = await conn.execute(
      strSql
    )

    var companys = [];

    result.rows.forEach(row =>{
      var company ={id:row[0],
                    name:row[1]
      };
      companys.push(company);
    })

    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0050' AND NAME_1 IS NOT NULL ORDER BY NAME_1"

    const result2 = await conn.execute(
      strSql
    )

    var data_sbt = [];

    result2.rows.forEach(row =>{
      var data_kbn ={id:row[0],
                    name:row[1]
      };
      data_sbt.push(data_kbn);
    })

    var strSql = "Select ROUTE_CD,ROUTE_NAME From M_ROUTE ORDER BY ROUTE_CD"

    const result3 = await conn.execute(
      strSql
    )

    var route_codes = [];

    result3.rows.forEach(row =>{
      var route_kbn ={id:row[0],
                    name:row[1]
      };
      route_codes.push(route_kbn);
    })

    //グリッド用データ取得
    var whereFlg = 0
    var strWhere = 'Where '
    var regExp = new RegExp( "-", "g" ) ;
    var s_date="*";
    var e_date="*";
    var datasbt = '*';
    var routename = '*'

    //検索対象日付
    if(where.s_date != '' && where.e_date != ''){
      whereFlg = 1;
      s_date = where.s_date;
      e_date = where.e_date;
      strWhere += `運行月 BETWEEN '${where.s_date.replace(regExp,'/')}' AND '${where.e_date.replace(regExp,'/')}' `;
    } else if (where.s_date != '' && where.e_date == '') {
      s_date = where.s_date;
      whereFlg = 1;
      strWhere += `運行月 >= '${where.s_date.replace(regExp,'/')}' `;
    } else if (where.s_date == '' && where.e_date != ''){
      e_date = where.s_date;
      whereFlg = 1;
      strWhere += `運行月 <= '${where.e_date.replace(regExp,'/')}' `;
    };
    //データタイプ
    if(where.data_sbt != '*'){
      datasbt = where.data_sbt;
      if(whereFlg == 1){
        strWhere += `AND データ種別コード = '${where.data_sbt}' `;
      } else {
        strWhere += `データ種別コード = '${where.data_sbt}' `;
      }
      whereFlg = 1;
    };
    //路線コード
    if(where.route_name != '*'){
      routename = where.route_name;
      if(whereFlg == 1){
        strWhere += `AND 路線コード = '${where.route_name}' `;
      } else {
        strWhere += `路線コード = '${where.route_name}' `;
      }
      whereFlg = 1;
    }

    if(whereFlg == 1){
      strSql = `SELECT * FROM V_AGGREGATE_MONTH2 ${strWhere}`
    } else {
      strSql = 'SELECT * FROM V_AGGREGATE_MONTH2'
    }



    const result4 = await conn.execute(
      strSql
    )


    var initdata= {route_code:route_codes,
                   data_sbt:data_sbt,
                   dataset:result4,
                   s_date:s_date,
                   e_date:e_date,
                   initial_Datasbt:datasbt,
                   initial_Route:routename
                  };

    callback(initdata);

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
};

exports.getCSV =async function (where,callback) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    //CSV用データ取得
    var whereFlg = 0
    var strWhere = 'Where '
    var regExp = new RegExp( "-", "g" ) ;
    var s_date="*";
    var e_date="*";
    var datasbt = '*';
    var routename = '*'

    //検索対象日付
    if(where.s_date != '' && where.e_date != ''){
      whereFlg = 1;
      s_date = where.s_date;
      e_date = where.e_date;
      strWhere += `運行月 BETWEEN '${where.s_date.replace(regExp,'/')}' AND '${where.e_date.replace(regExp,'/')}' `;
    } else if (where.s_date != '' && where.e_date == '') {
      s_date = where.s_date;
      whereFlg = 1;
      strWhere += `運行月 >= '${where.s_date.replace(regExp,'/')}' `;
    } else if (where.s_date == '' && where.e_date != ''){
      e_date = where.s_date;
      whereFlg = 1;
      strWhere += `運行月 <= '${where.e_date.replace(regExp,'/')}' `;
    };
    //データタイプ
    if(where.data_sbt != '*'){
      datasbt = where.data_sbt;
      if(whereFlg == 1){
        strWhere += `AND データ種別コード = '${where.data_sbt}' `;
      } else {
        strWhere += `データ種別コード = '${where.data_sbt}' `;
      }
      whereFlg = 1;
    };
    //路線コード
    if(where.route_name != '*'){
      routename = where.route_name;
      if(whereFlg == 1){
        strWhere += `AND 路線コード = '${where.route_name}' `;
      } else {
        strWhere += `路線コード = '${where.route_name}' `;
      }
      whereFlg = 1;
    }

    if(whereFlg == 1){
      strSql = `SELECT * FROM V_AGGREGATE_MONTH2 ${strWhere}`
    } else {
      strSql = 'SELECT * FROM V_AGGREGATE_MONTH2'
    }



    const result4 = await conn.execute(
      strSql
    )

    var csv_data=[];

    result4.rows.forEach(row =>{
      var csv_row={[result4.metaData[0].name]:row[0],
                   [result4.metaData[1].name]:row[1],
                   [result4.metaData[2].name]:row[2],
                   [result4.metaData[3].name]:row[3],
                   [result4.metaData[4].name]:row[4],
                   [result4.metaData[5].name]:row[5],
                   [result4.metaData[6].name]:row[6],
                   [result4.metaData[7].name]:row[7],
                   [result4.metaData[8].name]:row[8],
                   [result4.metaData[9].name]:row[9],
                   [result4.metaData[10].name]:row[10],
                   [result4.metaData[11].name]:row[11],
                   [result4.metaData[12].name]:row[12],
                   [result4.metaData[13].name]:row[13]
                  }
      csv_data.push(csv_row)
    })

    callback(csv_data);

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
};
