//BTBIメインモジュール（ここには定義とユーザ認証とルーティングのみ設定
//その他のスクリプトは切り離す

//expressの定義
var express = require('express');
var app = express();
app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

//csv出力関係の定義
const fs = require('fs');
const csv = require('csv');
const stringifySync = require("csv-stringify/lib/sync");

//model定義
var md_index = require('./views/model/mdl_index.js');
var md_Aggregate_Day1 = require('./views/model/mdl_Aggregate_Day1.js');
var md_Aggregate_Day2 = require('./views/model/mdl_Aggregate_Day2.js');
var md_Aggregate_Day3 = require('./views/model/mdl_Aggregate_Day3.js');
var md_Aggregate_Month1 = require('./views/model/mdl_Aggregate_Month1.js');
var md_Aggregate_Month2 = require('./views/model/mdl_Aggregate_Month2.js');
var md_Report_Monthly1 = require('./views/model/mdl_Report_Monthly1.js');


//passportの定義（認証関係
var passport = require('passport')
app.use(passport.initialize()) //Expressを使用している場合はInitializeが必要

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Authent = require('./Authentication.js')
var crypto = require('crypto');

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

//認証処理
passport.use(new LocalStrategy(async function(username, password, done){
    // ここで username と password を確認して結果を返す
    var passhash = crypto.createHash('sha256').update(password).digest('hex')
    console.log(await Authent.checkUser(username,passhash));
    if(await Authent.checkUser(username,passhash) == 1){
          return done(null, username);
      //↓にはPasswordチェック処理を実装してください。
    } else {
          return done(null, false, { message: 'ユーザーIDまたはパスワードが間違っています。' })
      }
    }));

function checkAuthentication(req, res, next){
    if (req.session.username!=undefined) {  // 認証済
        return next();
    }
    else {  // 認証されていない
      res.redirect('/login');  // ログイン画面に遷移
    }
}

//ここからルータとしての処理
//ログイン・ログアウト画面以外は認証チェックを挟むこと
//メイン
app.get('/', checkAuthentication,(req, res) => {
  md_index.getDashboard((dash) => {res.render('index.ejs',{dash:dash})}) ;
});

//日別路線系統別
app.get('/Aggregate_Day1', checkAuthentication,(req, res) => {
  md_Aggregate_Day1.initData((initdata) =>{res.render('Aggregate_Day1.ejs',{initdata:initdata})}) ;
});
//データ表示
app.post('/Aggregate_Day1', checkAuthentication,(req, res) => {
  var where ={s_date:req.body.s_date,
              e_date:req.body.e_date,
              data_sbt:req.body.data_sbt,
              route_name:req.body.route_name
  };
  md_Aggregate_Day1.getData(where,(initdata) =>{res.render('Aggregate_Day1.ejs',{initdata:initdata})}) ;
});
//CSV　DL
app.post('/Aggregate_Day1_csv', checkAuthentication,(req, res) => {
  var where ={s_date:req.body.s_date,
              e_date:req.body.e_date,
              data_sbt:req.body.data_sbt,
              route_name:req.body.route_name
  };

  md_Aggregate_Day1.getCSV(where,(csv_data) =>{
    const csvString = stringifySync(csv_data, {
        header: true
        ,
        quoted_string: true
      });
    const jconv = require( 'jconv' );
    const filename = '日別系統別実績';
    res.setHeader('Content-disposition', 'attachment;filename*=UTF-8\'\'' + encodeURIComponent(filename + '.csv'));
    res.setHeader('Content-Type', 'text/csv; charset=shift-jis');
    res.write(jconv.convert(csvString, 'UTF8', 'SJIS'));
    res.end();

    })
  });

//日別路線別実績
app.get('/Aggregate_Day2', checkAuthentication,(req, res) => {
  md_Aggregate_Day2.initData((initdata) =>{res.render('Aggregate_Day2.ejs',{initdata:initdata})}) ;
});
//データ表示
app.post('/Aggregate_Day2', checkAuthentication,(req, res) => {
  var where ={s_date:req.body.s_date,
              e_date:req.body.e_date,
              data_sbt:req.body.data_sbt,
              route_name:req.body.route_name
  };
  md_Aggregate_Day2.getData(where,(initdata) =>{res.render('Aggregate_Day2.ejs',{initdata:initdata})}) ;
});
//CSV　DL
app.post('/Aggregate_Day2_csv', checkAuthentication,(req, res) => {
  var where ={s_date:req.body.s_date,
              e_date:req.body.e_date,
              data_sbt:req.body.data_sbt,
              route_name:req.body.route_name
  };

  md_Aggregate_Day2.getCSV(where,(csv_data) =>{
    const csvString = stringifySync(csv_data, {
        header: true
        ,
        quoted_string: true
      });
    const jconv = require( 'jconv' );
    const filename = '日別路線別実績';
    res.setHeader('Content-disposition', 'attachment;filename*=UTF-8\'\'' + encodeURIComponent( filename + '.csv' ) );
    res.setHeader('Content-Type', 'text/csv; charset=shift-jis');
    res.write( jconv.convert( csvString, 'UTF8', 'SJIS' ) );
    res.end();

    })
  });

  //日別路線別実績
  app.get('/Aggregate_Day3', checkAuthentication,(req, res) => {
    md_Aggregate_Day3.initData((initdata) =>{res.render('Aggregate_Day3.ejs',{initdata:initdata})}) ;
  });
  //データ表示
  app.post('/Aggregate_Day3', checkAuthentication,(req, res) => {
    var where ={s_date:req.body.s_date,
                e_date:req.body.e_date,
                data_sbt:req.body.data_sbt,
                route_name:req.body.route_name
    };
    md_Aggregate_Day3.getData(where,(initdata) =>{res.render('Aggregate_Day3.ejs',{initdata:initdata})}) ;
  });
  //CSV　DL
  app.post('/Aggregate_Day3_csv', checkAuthentication,(req, res) => {
    var where ={s_date:req.body.s_date,
                e_date:req.body.e_date,
                data_sbt:req.body.data_sbt,
                route_name:req.body.route_name
    };

    md_Aggregate_Day3.getCSV(where,(csv_data) =>{
      const csvString = stringifySync(csv_data, {
          header: true
          ,
          quoted_string: true
        });
      const jconv = require( 'jconv' );
      const filename = '日別路線時間帯別実績';
      res.setHeader('Content-disposition', 'attachment;filename*=UTF-8\'\'' + encodeURIComponent( filename + '.csv' ) );
      res.setHeader('Content-Type', 'text/csv; charset=shift-jis');
      res.write( jconv.convert( csvString, 'UTF8', 'SJIS' ) );
      res.end();

      })
    });

    //時帯別情報
    app.get('/Report_Monthly1', checkAuthentication,(req, res) => {
      md_Report_Monthly1.initData((initdata) =>{res.render('Report_Monthly1.ejs',{initdata:initdata})}) ;
    });
    //データ表示
    app.post('/Report_Monthly1', checkAuthentication,(req, res) => {
      var where ={s_date:req.body.s_date,
                  e_date:req.body.e_date,
                  company:req.body.company
      };
      md_Report_Monthly1.getData(where,(initdata) =>{res.render('Report_Monthly1.ejs',{initdata:initdata})}) ;
    });
    //CSV　DL
    app.post('/Report_Monthly1_csv', checkAuthentication,(req, res) => {
      var where ={s_date:req.body.s_date,
                  e_date:req.body.e_date,
                  company:req.body.company
      };

      md_Report_Monthly1.getCSV(where,(csv_data) =>{
        const csvString = stringifySync(csv_data, {
            header: true
            ,
            quoted_string: true
          });
        const jconv = require( 'jconv' );
        const filename = '日別時間帯別データ';
        res.setHeader('Content-disposition', 'attachment;filename*=UTF-8\'\'' + encodeURIComponent( filename + '.csv' ) );
        res.setHeader('Content-Type', 'text/csv; charset=shift-jis');
        res.write( jconv.convert( csvString, 'UTF8', 'SJIS' ) );
        res.end();

        })
      });



      //月別路線系統別
      app.get('/Aggregate_Month1', checkAuthentication,(req, res) => {
        md_Aggregate_Month1.initData((initdata) =>{res.render('Aggregate_Month1.ejs',{initdata:initdata})}) ;
      });
      //データ表示
      app.post('/Aggregate_Month1', checkAuthentication,(req, res) => {
        var where ={s_date:req.body.s_date,
                    e_date:req.body.e_date,
                    data_sbt:req.body.data_sbt,
                    route_name:req.body.route_name
        };
        md_Aggregate_Month1.getData(where,(initdata) =>{res.render('Aggregate_Month1.ejs',{initdata:initdata})}) ;
      });
      //CSV　DL
      app.post('/Aggregate_Month1_csv', checkAuthentication,(req, res) => {
        var where ={s_date:req.body.s_date,
                    e_date:req.body.e_date,
                    data_sbt:req.body.data_sbt,
                    route_name:req.body.route_name
        };

        md_Aggregate_Month1.getCSV(where,(csv_data) =>{
          const csvString = stringifySync(csv_data, {
              header: true
              ,
              quoted_string: true
            });
          const jconv = require( 'jconv' );
          const filename = '月別系統別実績';
          res.setHeader('Content-disposition', 'attachment;filename*=UTF-8\'\'' + encodeURIComponent( filename + '.csv' ) );
          res.setHeader('Content-Type', 'text/csv; charset=shift-jis');
          res.write( jconv.convert( csvString, 'UTF8', 'SJIS' ) );
          res.end();

          })
        });

      //月別路線別実績
      app.get('/Aggregate_Month2', checkAuthentication,(req, res) => {
        md_Aggregate_Month2.initData((initdata) =>{res.render('Aggregate_Month2.ejs',{initdata:initdata})}) ;
      });
      //データ表示
      app.post('/Aggregate_Month2', checkAuthentication,(req, res) => {
        var where ={s_date:req.body.s_date,
                    e_date:req.body.e_date,
                    data_sbt:req.body.data_sbt,
                    route_name:req.body.route_name
        };
        md_Aggregate_Month2.getData(where,(initdata) =>{res.render('Aggregate_Month2.ejs',{initdata:initdata})}) ;
      });
      //CSV　DL
      app.post('/Aggregate_Month2_csv', checkAuthentication,(req, res) => {
        var where ={s_date:req.body.s_date,
                    e_date:req.body.e_date,
                    data_sbt:req.body.data_sbt,
                    route_name:req.body.route_name
        };

        md_Aggregate_Month2.getCSV(where,(csv_data) =>{
          const csvString = stringifySync(csv_data, {
              header: true
              ,
              quoted_string: true
            });
          const jconv = require( 'jconv' );
          const filename = '月別路線別実績';
          res.setHeader('Content-disposition', 'attachment;filename*=UTF-8\'\'' + encodeURIComponent( filename + '.csv' ) );
          res.setHeader('Content-Type', 'text/csv; charset=shift-jis');
          res.write( jconv.convert( csvString, 'UTF8', 'SJIS' ) );
          res.end();

          })
        });



//ログイン画面
app.get('/login', (req, res) => {
  const errorMessage = req.flash('error');
  res.render('login.ejs', {
    errorMessage: errorMessage
  });
});

//ログイン処理
app.post('/login', passport.authenticate('local',
{failureRedirect: '/login',failureFlash: true,
    badRequestMessage: '「ユーザID」と「パスワード」は必須入力です。'}),function(req, res){
        // 認証成功するとここが実行される
        req.session.username = req.user;
        res.redirect('/');
    });

//ログアウト処理
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
});

app.listen(4000);
