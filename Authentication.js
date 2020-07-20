const oracledb = require('oracledb')
const config = {
  user: 'BTBI',
  password: 'BTBI',
  connectString: '192.168.1.212:1521/BTDB.domain'
}

exports.checkUser =async function (username,password) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    //コンボボックス用データ取得
    var strSql = `Select * From M_USER WHERE USER_ID = '${username}' AND PASSWORD ='${password}'`
    const result = await conn.execute(
      strSql
    )
    if(result.rows.length == 0){
      return 0;
    } else {
      return 1;
    }

  } catch (err) {
    console.log('Ouch!', err)
    return 999
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
};
