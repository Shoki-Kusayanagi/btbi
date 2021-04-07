const oracledb = require('oracledb')
const config = {
  user: 'BTBI',
  password: 'BTBI',
  connectString: '192.168.1.212:1521/BTDB.domain'
}


exports.getDashboard = async function (callback) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    var strSql = ""

    var grh1Data =[];
    //乗降グラフデータ取得
    //平和交通分データ作成

    const result = await conn.execute(
      `select * from V_ROUTE_CNT_EXPANSION WHERE COMPANY_CD = '0004'`
    )
    var grh1Data =[];

    for(let i=0; i<=result.rows.length-1;i++){
      //オブジェクトに変数投入
      row = await result.rows[i];
      var grh =await {id: `widgetChart${i}`,
      labels: [row[8],row[7],row[6],row[5],row[4],row[3],row[2]],
      data: [row[15],row[14],row[13],row[12],row[11],row[10],row[9]],
      route_name: row[1],
      capcnt:row[9]};
      //レコードから生成したオブジェクトをグラフデータ配列に追加
      grh1Data.push(grh);
    }

    var label=[]
    for (i=1; i<=31; i++){
      label.push(i);
    }
    //売上実績データ取得
    const data2 = await conn.execute(
      `select * from V_ROUTE_AMOUNT_EXPANSION WHERE COMPANY_CD = '0004'`
    );
    rw1= await data2.rows[0];
    rw2= await data2.rows[1];

    var grh2Data = await {id:'trafficChart',
                    label:label,
                    month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                    datacash:[rw1[5],rw1[6],rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35]],
                    dataIC:[rw2[5],rw2[6],rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35]],
                    dataCashamount:rw1[4],
                    dataIcamount:rw2[4],
                    data_type_name_cash:rw1[3],
                    data_type_name_ic:rw2[3],
                    ic_hiritsu:Math.round((rw2[4] /(rw1[4]+rw2[4]))*100),
                    Cash_hiritsu:Math.round((rw1[4] /(rw1[4]+rw2[4]))*100),
                  };

    const result4 = await conn.execute(
      `select * from V_ROUTE_AMOUNT WHERE COMPANY_CD = '0004'`
    )
    var grh3Data =[];

    for(let i=0; i<=result4.rows.length-1;i++){
      //オブジェクトに変数投入
      row = await result4.rows[i];
      var grh =await {id: `amountChart${i}`,
      labels: [row[8],row[7],row[6],row[5],row[4],row[3],row[2]],
      data: [row[15],row[14],row[13],row[12],row[11],row[10],row[9]],
      route_name: row[1],
      capcnt:row[9]};
      //レコードから生成したオブジェクトをグラフデータ配列に追加
      grh3Data.push(grh);
    }

    //あすか交通用データ取得
    const resultA = await conn.execute(
      `select * from V_ROUTE_CNT_EXPANSION WHERE COMPANY_CD = '0003'`
    )
    var grh4Data =[];

    for(let i=0; i<=resultA.rows.length-1;i++){
      //オブジェクトに変数投入
      row = await resultA.rows[i];
      var grh =await {id: `as_widgetChart${i}`,
      labels: [row[8],row[7],row[6],row[5],row[4],row[3],row[2]],
      data: [row[15],row[14],row[13],row[12],row[11],row[10],row[9]],
      route_name: row[1],
      capcnt:row[9]};
      //レコードから生成したオブジェクトをグラフデータ配列に追加
      grh4Data.push(grh);
    }

    var labelA=[]
    for (i=1; i<=31; i++){
      labelA.push(i);
    }
    //売上実績データ取得
    const dataA2 = await conn.execute(
      `select * from V_ROUTE_AMOUNT_EXPANSION WHERE COMPANY_CD = '0003'`
    );
    rw1= await dataA2.rows[0];
    rw2= await dataA2.rows[1];

    var grh5Data = await {id:'trafficChart2',
                    label:labelA,
                    month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                    datacash:[rw1[5],rw1[6],rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35]],
                    dataIC:[rw2[5],rw2[6],rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35]],
                    dataCashamount:rw1[4],
                    dataIcamount:rw2[4],
                    data_type_name_cash:rw1[3],
                    data_type_name_ic:rw2[3],
                    ic_hiritsu:Math.round((rw2[4] /(rw1[4]+rw2[4]))*100),
                    Cash_hiritsu:Math.round((rw1[4] /(rw1[4]+rw2[4]))*100),
                  };

    const resultA4 = await conn.execute(
      `select * from V_ROUTE_AMOUNT WHERE COMPANY_CD = '0003'`
    )
    var grh6Data =[];

    for(let i=0; i<=resultA4.rows.length-1;i++){
      //オブジェクトに変数投入
      row = await resultA4.rows[i];
      var grh =await {id: `as_amountChart${i}`,
      labels: [row[8],row[7],row[6],row[5],row[4],row[3],row[2]],
      data: [row[15],row[14],row[13],row[12],row[11],row[10],row[9]],
      route_name: row[1],
      capcnt:row[9]};
      //レコードから生成したオブジェクトをグラフデータ配列に追加
      grh6Data.push(grh);
    }

    //成空平和
    const TYO_NRT_H = await conn.execute(
      `select * from V_ROUTE_COMPANY_CNT_EXP_HB WHERE COMPANY_CD = '0004' AND ROUTE_CD = '10000001' ORDER BY LINE_SBT`
    );
    rw1= await TYO_NRT_H.rows[0];
    rw2= await TYO_NRT_H.rows[1];

    var grh7Data = await {id:'trafficChart',
                    label:label,
                    month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                    dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                    dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                    dataNoboriCnt:rw1[6],
                    dataKudariCnt:rw2[6],
                    data_type_name_Nobori:rw1[5],
                    data_type_name_Kudari:rw2[5],
                    Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                    Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                  };


      //成空あすか
      const TYO_NRT_A = await conn.execute(
        `select * from V_ROUTE_COMPANY_CNT_EXP_HB WHERE COMPANY_CD = '0003' AND ROUTE_CD = '10000001' ORDER BY LINE_SBT`
      );
      rw1= await TYO_NRT_A.rows[0];
      rw2= await TYO_NRT_A.rows[1];

      var grh8Data = await {id:'trafficChart',
                      label:label,
                      month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                      dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                      dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                      dataNoboriCnt:rw1[6],
                      dataKudariCnt:rw2[6],
                      data_type_name_Nobori:rw1[5],
                      data_type_name_Kudari:rw2[5],
                      Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                      Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                    };


      //成空西岬
      const TYO_NRT_N = await conn.execute(
        `select * from V_ROUTE_COMPANY_CNT_EXP_HB WHERE COMPANY_CD = '0002' AND ROUTE_CD = '10000001' ORDER BY LINE_SBT`
      );
      rw1= await TYO_NRT_N.rows[0];
      rw2= await TYO_NRT_N.rows[1];

      var grh9Data = await {id:'trafficChart',
                      label:label,
                      month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                      dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                      dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                      dataNoboriCnt:rw1[6],
                      dataKudariCnt:rw2[6],
                      data_type_name_Nobori:rw1[5],
                      data_type_name_Kudari:rw2[5],
                      Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                      Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                    };
        //ベイ平和
        const BAY_H = await conn.execute(
          `select * from V_ROUTE_COMPANY_CNT_EXP_HB WHERE COMPANY_CD = '0004' AND ROUTE_CD = '10000003' ORDER BY LINE_SBT`
        );
        rw1= await BAY_H.rows[0];
        rw2= await BAY_H.rows[1];

        var grh10Data = await {id:'trafficChart',
                        label:label,
                        month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                        dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                        dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                        dataNoboriCnt:rw1[6],
                        dataKudariCnt:rw2[6],
                        data_type_name_Nobori:rw1[5],
                        data_type_name_Kudari:rw2[5],
                        Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                        Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                      };

        //ベイあすか
        const BAY_A = await conn.execute(
          `select * from V_ROUTE_COMPANY_CNT_EXP_HB WHERE COMPANY_CD = '0003' AND ROUTE_CD = '10000003' ORDER BY LINE_SBT`
        );
        rw1= await BAY_A.rows[0];
        rw2= await BAY_A.rows[1];

        var grh11Data = await {id:'trafficChart',
                        label:label,
                        month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                        dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                        dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                        dataNoboriCnt:rw1[6],
                        dataKudariCnt:rw2[6],
                        data_type_name_Kudari:rw1[5],
                        data_type_name_Kudari:rw2[5],
                        Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                        Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                      };

          //ちはら平和
          const CHIHARA_H = await conn.execute(
            `select * from V_ROUTE_COMPANY_CNT_EXP_HB WHERE COMPANY_CD = '0004' AND ROUTE_CD = '10000002' ORDER BY LINE_SBT`
          );
          rw1= await CHIHARA_H.rows[0];
          rw2= await CHIHARA_H.rows[1];

          var grh12Data = await {id:'trafficChart',
                          label:label,
                          month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                          dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                          dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                          dataNoboriCnt:rw1[6],
                          dataKudariCnt:rw2[6],
                          data_type_name_Nobori:rw1[5],
                          data_type_name_Kudari:rw2[5],
                          Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                          Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                        };

          //ちはら西岬
          const CHIHARA_N = await conn.execute(
            `select * from V_ROUTE_COMPANY_CNT_EXP_HB WHERE COMPANY_CD = '0004' AND ROUTE_CD = '10000002' ORDER BY LINE_SBT`
          );
          rw1= await CHIHARA_N.rows[0];
          rw2= await CHIHARA_N.rows[1];

          var grh13Data = await {id:'trafficChart',
                          label:label,
                          month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                          dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                          dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                          dataNoboriCnt:rw1[6],
                          dataKudariCnt:rw2[6],
                          data_type_name_Kudari:rw1[5],
                          data_type_name_Kudari:rw2[5],
                          Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                          Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                        };

      //成空全社
      const TYO_NRT = await conn.execute(
        `select * from V_ROUTE_CNT_EXP_HB WHERE ROUTE_CD = '10000001' ORDER BY LINE_SBT`
      );
      rw1= await TYO_NRT.rows[0];
      rw2= await TYO_NRT.rows[1];

      var grh14Data = await {id:'trafficChart',
                      label:label,
                      month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                      dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                      dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                      dataNoboriCnt:rw1[6],
                      dataKudariCnt:rw2[6],
                      data_type_name_Nobori:rw1[5],
                      data_type_name_Kudari:rw2[5],
                      Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                      Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                    };

      //ベイ全社
      const BAY = await conn.execute(
        `select * from V_ROUTE_CNT_EXP_HB WHERE ROUTE_CD = '10000003' ORDER BY LINE_SBT`
      );
      rw1= await BAY.rows[0];
      rw2= await BAY.rows[1];

      var grh15Data = await {id:'trafficChart',
                      label:label,
                      month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                      dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                      dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                      dataNoboriCnt:rw1[6],
                      dataKudariCnt:rw2[6],
                      data_type_name_Nobori:rw1[5],
                      data_type_name_Kudari:rw2[5],
                      Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                      Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                    };

      //ちはら全社
      const BAY_Z = await conn.execute(
        `select * from V_ROUTE_CNT_EXP_HB WHERE ROUTE_CD = '10000002' ORDER BY LINE_SBT`
      );
      rw1= await BAY_Z.rows[0];
      rw2= await BAY_Z.rows[1];

      var grh16Data = await {id:'trafficChart',
                      label:label,
                      month:rw1[0].substring(0,4) + '/' + rw1[0].substring(4) ,
                      dataNobori:[rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35],rw1[36],rw1[37]],
                      dataKudari:[rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[29],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35],rw2[36],rw2[37]],
                      dataNoboriCnt:rw1[6],
                      dataKudariCnt:rw2[6],
                      data_type_name_Nobori:rw1[5],
                      data_type_name_Kudari:rw2[5],
                      Nobori_hiritsu:Math.round((rw2[6] /(rw1[6]+rw2[6]))*100),
                      Kudari_hiritsu:Math.round((rw1[6] /(rw1[6]+rw2[6]))*100),
                    };

    //乗降一覧テーブル取得(平和空港)
    const TYO_NRT_H_T = await conn.execute(
      `select * from V_ROUTE_BIN_COMPANY_EXP WHERE COMPANY_CD = '0004' AND ROUTE_CD = '10000001' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(平和ベイ)
    const BAY_H_T = await conn.execute(
      `select * from V_ROUTE_BIN_COMPANY_EXP WHERE COMPANY_CD = '0004' AND ROUTE_CD = '10000003' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(平和ちはら)
    const CHIHARA_H_T = await conn.execute(
      `select * from V_ROUTE_BIN_COMPANY_EXP WHERE COMPANY_CD = '0004' AND ROUTE_CD = '10000002' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(あすか空港)
    const TYO_NRT_A_T = await conn.execute(
      `select * from V_ROUTE_BIN_COMPANY_EXP WHERE COMPANY_CD = '0003' AND ROUTE_CD = '10000001' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(あすかベイ)
    const BAY_A_T = await conn.execute(
      `select * from V_ROUTE_BIN_COMPANY_EXP WHERE COMPANY_CD = '0003' AND ROUTE_CD = '10000003' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(西岬空港)
    const TYO_NRT_N_T = await conn.execute(
      `select * from V_ROUTE_BIN_COMPANY_EXP WHERE COMPANY_CD = '0002' AND ROUTE_CD = '10000001' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(西岬ちはら)
    const CHIHARA_N_T = await conn.execute(
      `select * from V_ROUTE_BIN_COMPANY_EXP WHERE COMPANY_CD = '0002' AND ROUTE_CD = '10000002' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(平和空港)
    const TYO_NRT_T = await conn.execute(
      `select * from V_ROUTE_BIN_EXP WHERE ROUTE_CD = '10000001' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(平和ベイ)
    const BAY_T = await conn.execute(
      `select * from V_ROUTE_BIN_EXP WHERE ROUTE_CD = '10000003' ORDER BY LINE_SBT`
    );

    //乗降一覧テーブル取得(平和ちはら)
    const CHIHARA_T = await conn.execute(
      `select * from V_ROUTE_BIN_EXP WHERE ROUTE_CD = '10000002' ORDER BY LINE_SBT`
    );

    //ヘッダデータ取得と戻り値用オブジェクト成型処理
    const result3 = await conn.execute(
      'select * from V_DASHBOARD'
    );
    var dash = await {date:result3.rows[0][0],
                  TotalProfit1:result3.rows[0][1],
                  TotalProfit2:result3.rows[0][2],
                  TotalCustomer1:result3.rows[0][3],
                  TotalCustomer2:result3.rows[0][4],
                  TYO_NRT_H_T:TYO_NRT_H_T,
                  BAY_H_T:BAY_H_T,
                  CHIHARA_H_T:CHIHARA_H_T,
                  TYO_NRT_A_T:TYO_NRT_A_T,
                  BAY_A_T:BAY_A_T,
                  TYO_NRT_N_T:TYO_NRT_N_T,
                  CHIHARA_N_T:CHIHARA_N_T,
                  TYO_NRT_T:TYO_NRT_T,
                  BAY_T:BAY_T,
                  CHIHARA_T:CHIHARA_T,
                  grh1:grh1Data,
                  grh2:grh2Data,
                  grh3:grh3Data,
                  grh4:grh4Data,
                  grh5:grh5Data,
                  grh6:grh6Data,
                  grh7:grh7Data,
                  grh8:grh8Data,
                  grh9:grh9Data,
                  grh10:grh10Data,
                  grh11:grh11Data,
                  grh12:grh12Data,
                  grh13:grh13Data,
                  grh14:grh14Data,
                  grh15:grh15Data,
                  grh16:grh16Data
                };

    callback(dash);

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
};
