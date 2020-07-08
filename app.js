var express = require('express');
var app = express();

app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

var passport = require('passport')
app.use(passport.initialize()) //Expressを使用している場合はInitializeが必要

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session');
app.use(session({secret:'ss'}));
app.use(passport.session());

passport.serializeUser((username, done) => {
  done(null, username)
});

passport.deserializeUser((username, done) => {
  User.findById(username, (err, user) => {
    done(err, user);
  })
});

var flash = require('connect-flash');
app.use(flash());

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done){
    // ここで username と password を確認して結果を返す
    if(username == 'root' && password == 'pass'){
          console.log(username);
          return done(null, username);
      //↓にはPasswordチェック処理を実装してください。
    } else {
          console.log(password)
          return done(null, false, { message: 'ユーザーIDまたはパスワードが間違っています。' })
      }
    }));

function checkAuthentication(req, res, next){
    if (req.session.username!=undefined) {  // 認証済
        return next();
    }
    else {  // 認証されていない
      console.log('falld')
        res.redirect('/login');  // ログイン画面に遷移
    }
}

//ここからルータとしての処理
app.get('/', checkAuthentication,(req, res) => {
  console.log('OK!')
  res.render('temp.ejs');
});

app.get('/temp', (req, res) => {
  getDashboard((dash) => {res.render('temp.ejs',{dash:dash})}) ;
});

app.get('/login', (req, res) => {
  const errorMessage = req.flash('error');
  res.render('login.ejs', {
    errorMessage: errorMessage
  });
});


app.post('/logon', passport.authenticate('local',
{failureRedirect: '/login',failureFlash: true,
    badRequestMessage: '「ユーザID」と「パスワード」は必須入力です。'}),function(req, res){
        // 認証成功するとここが実行される
        req.session.username = req.user;
        res.redirect('/');
    });

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
});


//ここから関数類
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

    for(let i=0; i<=result.rows.length-1;i++){
      //オブジェクトに変数投入
      row = await result.rows[i];
      var grh =await {id: `widgetChart${i}`,
      labels: [row[1],row[2],row[3],row[4],row[5],row[6],row[7]],
      data: [row[8],row[9],row[10],row[11],row[12],row[13],row[14],],
      route_name: '',
      capcnt:row[8]};
      //レコードから生成したオブジェクトをグラフデータ配列に追加
      grh1Data.push(grh);
    }

    var label=[]
    for (i=1; i<=31; i++){
      label.push(i);
    }
    //売上実績データ取得
    const data2 = await conn.execute(
      'select * from V_ROUTE_AMOUNT_EXPANSION'
    );
    rw1= await data2.rows[0];
    rw2= await data2.rows[1];

    var grh2Data = await {id:'trafficChart',
                    label:label,
                    month:rw1[0],
                    datacash:[rw1[5],rw1[6],rw1[7],rw1[8],rw1[9],rw1[10],rw1[11],rw1[12],rw1[13],rw1[14],rw1[15],rw1[16],rw1[17],rw1[18],rw1[19],rw1[20],rw1[21],rw1[22],rw1[23],rw1[24],rw1[25],rw1[26],rw1[27],rw1[28],rw1[29],rw1[30],rw1[31],rw1[32],rw1[33],rw1[34],rw1[35]],
                    dataIC:[rw2[5],rw2[6],rw2[7],rw2[8],rw2[9],rw2[10],rw2[11],rw2[12],rw2[13],rw2[14],rw2[15],rw2[16],rw2[17],rw2[18],rw2[19],rw2[20],rw2[21],rw2[22],rw2[23],rw2[24],rw2[25],rw2[26],rw2[27],rw2[28],rw2[39],rw2[30],rw2[31],rw2[32],rw2[33],rw2[34],rw2[35]],
                    dataCashamount:rw1[4],
                    dataIcamount:rw2[4],
                    data_type_name_cash:rw1[3],
                    data_type_name_ic:rw2[3],
                  };

    //ヘッダデータ取得と戻り値用オブジェクト成型処理
    const result3 = await conn.execute(
      'select * from V_DASHBOARD'
    );
    console.log(result3.rows[0])
    console.log(result3.rows[0][0])
    var dash = await {date:result3.rows[0][0],
                  TotalProfit1:result3.rows[0][1],
                  TotalProfit2:result3.rows[0][2],
                  TotalCustomer1:result3.rows[0][3],
                  TotalCustomer2:result3.rows[0][4],
                  grh1:grh1Data,
                  grh2:grh2Data
                };


    callback(dash);
    console.log(dash)
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}

app.listen(4000);
