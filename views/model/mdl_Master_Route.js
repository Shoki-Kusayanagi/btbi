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

    var strSql = "Select NAME_KEY,MASTER_NAME,NAME_1 From M_CD_NAME WHERE MASTER_KBN = '0020' AND NAME_2 = '1' ORDER BY NAME_KEY"

    const result2 = await conn.execute(
      strSql
    )

    var base_cd = [];

    result2.rows.forEach(row =>{
      var data_kbn ={id:row[0],
                    name:row[1],
                    data_val:row[2]
      };
      base_cd.push(data_kbn);
    })


    var initdata= {company:companys,
                   base_cd:base_cd,
                   dataset:'*',
                   initial_company:'*',
                   initial_base:'*',
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

    var strSql = "Select NAME_KEY,MASTER_NAME,NAME_1 From M_CD_NAME WHERE MASTER_KBN = '0020' AND NAME_2 = '1' ORDER BY NAME_KEY"

    const result2 = await conn.execute(
      strSql
    )

    var base_cd = [];

    result2.rows.forEach(row =>{
      var data_kbn ={id:row[0],
                    name:row[1],
                    data_val:row[2]
      };
      base_cd.push(data_kbn);
    })

    //グリッド用データ取得
    var whereFlg = 0
    var strWhere = 'Where '
    var regExp = new RegExp( "-", "g" ) ;
    var s_date="*";
    var e_date="*";
    var company = '*';
    var base_name = '*'

    //データタイプ
    if(where.company != '*'){
      company = where.company;
      if(whereFlg == 1){
        strWhere += `AND COMPANY_CD = '${where.company}' `;
      } else {
        strWhere += `COMPANY_CD = '${where.company}' `;
      }
      whereFlg = 1;
    };
    //路線コード
    if(where.base_name != '*') {
      if(where.base_name != undefined){
        base_name = where.base_name;
        if(whereFlg == 1){
          strWhere += `AND BASE_CD = '${where.base_name}' `;
        } else {
          strWhere += `BASE_CD = '${where.base_name}' `;
        }
        whereFlg = 1;
      }


    }

    if(whereFlg == 1){
      strSql = `SELECT * FROM V_ROUTE ${strWhere}`
    } else {
      strSql = 'SELECT * FROM V_ROUTE'
    }

    const result4 = await conn.execute(
      strSql
    )


    var initdata= {company:companys,
                   base_cd:base_cd,
                   dataset:result4,
                   initial_company:company,
                   initial_base:base_name,
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

exports.modData =async function (where,callback) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    var strWhere = 'Where '



    callback();


  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
};
