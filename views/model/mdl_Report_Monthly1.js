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
    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0030' ORDER BY NAME_KEY"

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

    var initdata= {company:companys,
                   dataset:'*',
                   s_date:'',
                   e_date:'',
                   initial_company:'*'
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
    var strSql = "Select NAME_KEY,MASTER_NAME From M_CD_NAME WHERE MASTER_KBN = '0030' ORDER BY NAME_KEY"

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

    //グリッド用データ取得
    var whereFlg = 0
    var strWhere = 'Where '
    var regExp = new RegExp( "-", "g" ) ;
    var s_date="*";
    var e_date="*";

    //横展開する路線を取得
    var strSql = `Select T1.COMPANY_CD,T1.BASE_CD,T1.Route_Cd,T1.ROUTE_NAME From M_Route T1 Left Join M_Cd_Name T2 On T1.Company_Cd = T2.Name_1 And T1.Base_Cd = T2.Name_2 And T2.Master_Kbn = '0030' Where T2.Name_Key = '${where.company}'`

    const result2 = await conn.execute(
      strSql
    )


    var company_cd;
    var base_cd;
    //select分の可変長部分を作る
    var select = ''
    result2.rows.forEach(row =>{
      company_cd = row[0];
      base_cd = row[1];
      select += `, SUM(CASE when T1.路線コード = '${row[2]}' AND T1.時間帯コード = '1' then T1.大人人数 + T1.小児人数 + T1.大割人数 + T1.小割人数 else 0 end) as ${row[3]}_朝`;
      select += `, SUM(CASE when T1.路線コード = '${row[2]}' AND T1.時間帯コード = '2' then T1.大人人数 + T1.小児人数 + T1.大割人数 + T1.小割人数 else 0 end) as ${row[3]}_昼`;
      select += `, SUM(CASE when T1.路線コード = '${row[2]}' AND T1.時間帯コード = '3' then T1.大人人数 + T1.小児人数 + T1.大割人数 + T1.小割人数 else 0 end) as ${row[3]}_夜`;
    })

    strSql = `Select 運行日${select} FROM V_AGGREGATE_DAY3 T1`

    strWhere = ' Where '

    //検索対象日付
    if(where.s_date != '' && where.e_date != ''){
      whereFlg = 1;
      s_date = where.s_date;
      e_date = where.e_date;
      strWhere += `運行日 BETWEEN '${where.s_date.replace(regExp,'/')}' AND '${where.e_date.replace(regExp,'/')}' `;
    } else if (where.s_date != '' && where.e_date == '') {
      s_date = where.s_date;
      whereFlg = 1;
      strWhere += `運行日 >= '${where.s_date.replace(regExp,'/')}' `;
    } else if (where.s_date == '' && where.e_date != ''){
      e_date = where.s_date;
      whereFlg = 1;
      strWhere += `運行日 <= '${where.e_date.replace(regExp,'/')}' `;
    };
    //会社コード
    if(whereFlg == 1){
      strWhere += `AND 会社コード = '${company_cd}' `;
      strWhere += `AND 営業所コード = '${base_cd}' `;
    } else {
      strWhere += `会社コード = '${company_cd}' `;
      strWhere += `AND 営業所コード = '${base_cd}' `;
    }

    strSql += strWhere

    strSql += 'GROUP BY 運行日　ORDER BY 運行日'

    const result4 = await conn.execute(
      strSql
    )


    var initdata= {company:companys,
                   dataset:result4,
                   s_date:s_date,
                   e_date:e_date,
                   initial_company:'*'
                  };

    callback(initdata);

  } catch (err) {
    console.log('Ouch!', err + strSql)
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
    //グリッド用データ取得
    var whereFlg = 0
    var strWhere = 'Where '
    var regExp = new RegExp( "-", "g" ) ;
    var s_date="*";
    var e_date="*";

    //横展開する路線を取得
    var strSql = `Select T1.COMPANY_CD,T1.BASE_CD,T1.Route_Cd,T1.ROUTE_NAME From M_Route T1 Left Join M_Cd_Name T2 On T1.Company_Cd = T2.Name_1 And T1.Base_Cd = T2.Name_2 And T2.Master_Kbn = '0030' Where T2.Name_Key = '${where.company}'`

    const result2 = await conn.execute(
      strSql
    )


    var company_cd;
    var base_cd;
    //select分の可変長部分を作る
    var select = ''
    result2.rows.forEach(row =>{
      company_cd = row[0];
      base_cd = row[1];
      select += `, SUM(CASE when T1.路線コード = '${row[2]}' AND T1.時間帯コード = '1' then T1.大人人数 + T1.小児人数 + T1.大割人数 + T1.小割人数 else 0 end) as ${row[3]}_朝`;
      select += `, SUM(CASE when T1.路線コード = '${row[2]}' AND T1.時間帯コード = '2' then T1.大人人数 + T1.小児人数 + T1.大割人数 + T1.小割人数 else 0 end) as ${row[3]}_昼`;
      select += `, SUM(CASE when T1.路線コード = '${row[2]}' AND T1.時間帯コード = '3' then T1.大人人数 + T1.小児人数 + T1.大割人数 + T1.小割人数 else 0 end) as ${row[3]}_夜`;
    })

    strSql = `Select 運行日${select} FROM V_AGGREGATE_DAY3 T1`

    strWhere = ' Where '

    //検索対象日付
    if(where.s_date != '' && where.e_date != ''){
      whereFlg = 1;
      s_date = where.s_date;
      e_date = where.e_date;
      strWhere += `運行日 BETWEEN '${where.s_date.replace(regExp,'/')}' AND '${where.e_date.replace(regExp,'/')}' `;
    } else if (where.s_date != '' && where.e_date == '') {
      s_date = where.s_date;
      whereFlg = 1;
      strWhere += `運行日 >= '${where.s_date.replace(regExp,'/')}' `;
    } else if (where.s_date == '' && where.e_date != ''){
      e_date = where.s_date;
      whereFlg = 1;
      strWhere += `運行日 <= '${where.e_date.replace(regExp,'/')}' `;
    };
    //会社コード
    if(whereFlg == 1){
      strWhere += `AND 会社コード = '${company_cd}' `;
      strWhere += `AND 営業所コード = '${base_cd}' `;
    } else {
      strWhere += `会社コード = '${company_cd}' `;
      strWhere += `AND 営業所コード = '${base_cd}' `;
    }

    strSql += strWhere

    strSql += 'GROUP BY 運行日 ORDER BY 運行日'

    const result4 = await conn.execute(
      strSql
    )

    var csv_data=[];

    result4.rows.forEach(row =>{
      var csv_row={}
        for(i=0;i<=result4.metaData.length-1;i++){
          csv_row[result4.metaData[i].name] =row[i]
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
