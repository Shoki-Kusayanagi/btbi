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

    result.foreach(row =>{
      var company ={id:row[0],
                    name:row[1]
      };
      companys.push(company);
    })

    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0050' AND NAME_1 IS NOT NULL ORDER BY NAME_1"

    const result2 = await conn.execute(
      strSql
    )

    var Data_sbt = [];

    result2.foreach(row =>{
      var Data_kbn ={id:row[0],
                    name:row[1]
      };
      Data_sbt.push(Data_kbn);
    })

    var strSql = "Select ROUTE_CD,ROUTE_NAME From M_ROUTE ORDER BY ROUTE_CD"

    const result3 = await conn.execute(
      strSql
    )

    var Data_sbt = [];

    result3.foreach(row =>{
      var Data_kbn ={id:row[0],
                    name:row[1]
      };
      Data_sbt.push(Data_kbn);
    })



    var Initdata= {company_cd:companys,
                   data_sbt:Data_sbt,
                   dataset:'*',
                   initial:'*'
                  };

    callback(Initdata);

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
};

exports.getData =async function (post,callback) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    //コンボボックス用データ取得
    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0010' AND NAME_1 IS NOT NULL ORDER BY NAME_1"

    const result = await conn.execute(
      strSql
    )

    var companys = [];

    result.foreach(row =>{
      var company ={id:row[0],
                    name:row[1]
      };
      companys.push(company);
    })

    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0050' AND NAME_1 IS NOT NULL ORDER BY NAME_1"

    const result2 = await conn.execute(
      strSql
    )

    var Data_sbt = [];

    result2.foreach(row =>{
      var Data_kbn ={id:row[0],
                    name:row[1]
      };
      Data_sbt.push(Data_kbn);
    })

    var strSql = "Select ROUTE_CD,ROUTE_NAME From M_ROUTE ORDER BY ROUTE_CD"

    const result3 = await conn.execute(
      strSql
    )

    var Data_sbt = [];

    result3.foreach(row =>{
      var Data_kbn ={id:row[0],
                    name:row[1]
      };
      Data_sbt.push(Data_kbn);
    })



    var Initdata= {company_cd:companys,
                   data_sbt:Data_sbt,
                   dataset:'*',
                   initial:'*'
                  };

    callback(Initdata);

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
};
